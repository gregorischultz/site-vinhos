import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { ALIMENTS } from "./accords";

/*
  IA d'intention (secção 9). Rôle unique : transformer du texte libre en JSON
  structuré. Elle ne connaît pas les vins et ne génère aucune recommandation.
  Sécurité :
   - ne peut renvoyer que des clés d'accord existantes (validé par Zod) ;
   - clé API uniquement côté serveur ;
   - toute erreur / absence de clé -> null (fallback silencieux vers Fuse.js).
*/

const clesAliments = Object.keys(ALIMENTS) as [string, ...string[]];

export const IntentionSchema = z.object({
  intention: z.enum(["accord", "type", "recherche"]),
  aliments: z.array(z.enum(clesAliments)).default([]),
  budget_max_eur: z.number().positive().nullable().default(null),
  confiance: z.number().min(0).max(1),
});
export type Intention = z.infer<typeof IntentionSchema>;

export async function interpreter(texte: string): Promise<Intention | null> {
  const cle = process.env.ANTHROPIC_API_KEY;
  if (!cle) return null; // pas de clé -> fallback silencieux

  const client = new Anthropic({ apiKey: cle });

  try {
    const reponse = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      temperature: 0,
      tools: [
        {
          name: "classer_intention",
          description:
            "Classe la demande d'un utilisateur cherchant un vin. Ne renvoie que des clés d'accord existantes.",
          input_schema: {
            type: "object",
            properties: {
              intention: {
                type: "string",
                enum: ["accord", "type", "recherche"],
              },
              aliments: {
                type: "array",
                items: { type: "string", enum: clesAliments },
              },
              budget_max_eur: { type: ["number", "null"] },
              confiance: { type: "number", minimum: 0, maximum: 1 },
            },
            required: ["intention", "confiance"],
          },
        },
      ],
      tool_choice: { type: "tool", name: "classer_intention" },
      messages: [
        {
          role: "user",
          content: `Classe cette demande d'un amateur de vin : « ${texte} ». Si elle décrit un plat, renvoie l'intention "accord" avec la ou les clés d'accord correspondantes.`,
        },
      ],
    });

    const bloc = reponse.content.find((c) => c.type === "tool_use");
    if (!bloc || bloc.type !== "tool_use") return null;

    const valide = IntentionSchema.safeParse(bloc.input);
    return valide.success ? valide.data : null;
  } catch {
    return null; // timeout, quota, erreur réseau -> fallback
  }
}
