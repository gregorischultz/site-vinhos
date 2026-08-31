import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { VinSchema, type Vin } from "./schema";
import paysData from "@/data/pays.json";

const DOSSIER_VINS = path.join(process.cwd(), "content/vins");
const PAYS_VALIDES = new Set(Object.keys(paysData));

export type FicheVin = Vin & {
  /** corps de la fiche en MDX (texte après le frontmatter) */
  corps: string;
};

/**
 * Lê e valida uma única ficha. Lança um Error legível se algo estiver mal —
 * é isto que faz o build parar com uma mensagem clara.
 */
function chargerFiche(fichier: string): FicheVin {
  const chemin = path.join(DOSSIER_VINS, fichier);
  const brut = fs.readFileSync(chemin, "utf8");
  const { data, content } = matter(brut);

  const res = VinSchema.safeParse(data);
  if (!res.success) {
    const details = res.error.issues
      .map((i) => `    · ${i.path.join(".") || "(racine)"} : ${i.message}`)
      .join("\n");
    throw new Error(
      `\n❌ Fiche invalide : content/vins/${fichier}\n${details}\n`,
    );
  }
  const vin = res.data;

  // Coerências que o schema sozinho não vê:
  const slugAttendu = fichier.replace(/\.mdx$/, "");
  if (vin.slug !== slugAttendu) {
    throw new Error(
      `\n❌ content/vins/${fichier} : slug "${vin.slug}" ne correspond pas au nom de fichier "${slugAttendu}".\n`,
    );
  }
  if (!PAYS_VALIDES.has(vin.pays)) {
    throw new Error(
      `\n❌ content/vins/${fichier} : pays "${vin.pays}" absent de data/pays.json.\n`,
    );
  }

  return { ...vin, corps: content.trim() };
}

/** Carrega toutes les fiches, triées par slug. */
export function chargerTousLesVins(): FicheVin[] {
  if (!fs.existsSync(DOSSIER_VINS)) return [];
  return fs
    .readdirSync(DOSSIER_VINS)
    .filter((f) => f.endsWith(".mdx"))
    .map(chargerFiche)
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

/** Uniquement les fiches publiées — pour l'affichage public. */
export function chargerVinsPublies(): FicheVin[] {
  return chargerTousLesVins().filter((v) => v.statut === "publie");
}
