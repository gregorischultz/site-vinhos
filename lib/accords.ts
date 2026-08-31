import { z } from "zod";
import alimentsData from "@/data/aliments.json";
import { TypeVin } from "./schema";
import { tousLesVinsClasses, type VinClasse } from "./classement";

/*
  Motor de acordos (secção 8). Regras, não IA.
  alimento → critérios → filtro sobre o corpus → ordenação por QPR → top 5.
  O texto de explicação vem do JSON, nunca é gerado.
*/

const CriteresSchema = z.object({
  acidite_min: z.number().int().min(1).max(5).optional(),
  acidite_max: z.number().int().min(1).max(5).optional(),
  tanins_min: z.number().int().min(1).max(5).optional(),
  tanins_max: z.number().int().min(1).max(5).optional(),
  sucrosite_min: z.number().int().min(1).max(5).optional(),
  corps: z.array(z.number().int().min(1).max(5)).optional(),
  types_recommandes: z.array(TypeVin).optional(),
  types_exclus: z.array(TypeVin).optional(),
});

const AlimentSchema = z.object({
  libelle_fr: z.string().min(1),
  synonymes: z.array(z.string()),
  criteres: CriteresSchema,
  explication_fr: z.string().min(1),
  page: z.string().startsWith("/accords/"),
});

const AlimentsSchema = z.record(z.string(), AlimentSchema);

// Valida data/aliments.json no arranque — falha o build se estiver malformado.
export const ALIMENTS = AlimentsSchema.parse(alimentsData);
export type Aliment = z.infer<typeof AlimentSchema>;
type Criteres = z.infer<typeof CriteresSchema>;

/** Lista de todos os alimentos, com o seu slug. */
export function listeAliments() {
  return Object.entries(ALIMENTS).map(([slug, a]) => ({ slug, ...a }));
}

/** true se o vinho satisfaz todos os critérios do alimento. */
function correspond(vin: VinClasse, c: Criteres): boolean {
  if (c.types_exclus?.includes(vin.type)) return false;
  if (c.types_recommandes && !c.types_recommandes.includes(vin.type)) return false;

  const tanins = vin.degustation.tanins ?? 0;
  if (c.acidite_min != null && vin.degustation.acidite < c.acidite_min) return false;
  if (c.acidite_max != null && vin.degustation.acidite > c.acidite_max) return false;
  if (c.tanins_min != null && tanins < c.tanins_min) return false;
  if (c.tanins_max != null && tanins > c.tanins_max) return false;
  if (c.corps && !c.corps.includes(vin.degustation.corps)) return false;
  if (c.sucrosite_min != null && vin.degustation.sucrosite < c.sucrosite_min)
    return false;

  return true;
}

export type ResultatAccord = {
  slug: string;
  aliment: Aliment;
  vins: VinClasse[];
};

/** Top 5 vinhos para um alimento, já ordenados por QPR. null se o slug não existir. */
export function accordsPour(slug: string): ResultatAccord | null {
  const aliment = ALIMENTS[slug];
  if (!aliment) return null;
  const vins = tousLesVinsClasses()
    .filter((v) => correspond(v, aliment.criteres))
    .slice(0, 5);
  return { slug, aliment, vins };
}
