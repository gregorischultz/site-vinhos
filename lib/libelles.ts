import { TypeVin } from "./schema";

/** Rótulos em francês para os tipos de vinho (enum -> texto legível). */
export const LIBELLES_TYPE: Record<string, string> = {
  "rouge-sec": "Rouge sec",
  "rouge-moelleux": "Rouge moelleux",
  "blanc-sec": "Blanc sec",
  "blanc-moelleux": "Blanc moelleux",
  rose: "Rosé",
  effervescent: "Effervescent",
  champagne: "Champagne",
  "vin-doux-naturel": "Vin doux naturel",
  "vin-fortifie": "Vin fortifié",
};

/** Todos os slugs de tipo válidos (para generateStaticParams). */
export const TYPES_VIN = TypeVin.options;

export function libelleType(type: string): string {
  return LIBELLES_TYPE[type] ?? type;
}
