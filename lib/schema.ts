import { z } from "zod";

/*
  Schema de uma ficha de vinho (secção 6 do prompt).
  O Zod (biblioteca que valida a forma dos dados em tempo de execução) rejeita
  qualquer ficha que não cumpra exatamente esta estrutura. É isto que faz o
  build FALHAR quando uma ficha está incompleta ou errada.
*/

// Enums fechados — qualquer outro valor é rejeitado
export const TypeVin = z.enum([
  "rouge-sec",
  "rouge-moelleux",
  "blanc-sec",
  "blanc-moelleux",
  "rose",
  "effervescent",
  "champagne",
  "vin-doux-naturel",
  "vin-fortifie",
]);
export type TypeVin = z.infer<typeof TypeVin>;

export const Statut = z.enum(["brouillon", "relu", "publie"]);

const note1a5 = z.number().int().min(1).max(5);

const Degustation = z.object({
  corps: note1a5,
  acidite: note1a5,
  tanins: note1a5.nullable(), // null nos brancos
  sucrosite: note1a5,
});

// Uma data no formato AAAA-MM-JJ
const dateIso = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "date attendue au format AAAA-MM-JJ");

const Offre = z.object({
  marchand: z.string().min(1),
  url_affiliee: z.url(),
  prix_eur: z.number().positive(),
  date_verification: dateIso,
  disponible: z.boolean(),
});

export const VinSchema = z
  .object({
    slug: z.string().min(1),
    nom: z.string().min(1),
    producteur: z.string().min(1),
    pays: z.string().min(1), // slug, validado contra data/pays.json no loader
    region: z.string().min(1),
    appellation: z.string().min(1),
    type: TypeVin,
    cepages: z.array(z.string().min(1)).min(1),
    millesime: z.number().int().min(1900).max(2100),
    degre: z.number().min(0).max(25),
    prix_reference_eur: z.number().positive(),
    date_prix: dateIso,

    note_qualite: z.number().min(0).max(20),
    degustation: Degustation,
    aromes: z.array(z.string().min(1)).min(1),
    temperature_service: z.string().min(1),
    garde: z.string().min(1),
    carafage: z.boolean(),

    accords: z.array(z.string().min(1)),

    resume: z.string().min(1),
    auteur: z.string().min(1),
    date_publication: dateIso,
    date_revision: dateIso,
    statut: Statut,

    offres: z.array(Offre).default([]),
  })
  // Regra de domínio: os brancos e efervescentes não têm taninos; os tintos têm.
  .superRefine((vin, ctx) => {
    const sansTanins = ["blanc-sec", "blanc-moelleux", "effervescent", "champagne"];
    if (sansTanins.includes(vin.type) && vin.degustation.tanins !== null) {
      ctx.addIssue({
        code: "custom",
        path: ["degustation", "tanins"],
        message: `tanins doit être null pour un vin de type ${vin.type}`,
      });
    }
    if (vin.type.startsWith("rouge") && vin.degustation.tanins === null) {
      ctx.addIssue({
        code: "custom",
        path: ["degustation", "tanins"],
        message: "tanins ne peut pas être null pour un vin rouge",
      });
    }
  });

export type Vin = z.infer<typeof VinSchema>;

// Vista do vinho SEM as ofertas — usada no cálculo do classement (secção 7).
// O TypeScript torna impossível que 'offres' entre no cálculo do QPR.
export type VinPourClassement = Omit<Vin, "offres">;
