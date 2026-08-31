import { chargerVinsPublies, type FicheVin } from "./contenu";
import { calculerQPR, etoiles } from "./qualite-prix";

export type VinClasse = FicheVin & { qpr: number; etoiles: number };

function mediane(nombres: number[]): number {
  const tri = [...nombres].sort((a, b) => a - b);
  const milieu = Math.floor(tri.length / 2);
  return tri.length % 2
    ? tri[milieu]
    : (tri[milieu - 1] + tri[milieu]) / 2;
}

/** Mediana de preço por tipo, calculada sobre todo o corpus (secção 7). */
export function medianesParType(vins: FicheVin[]): Map<string, number> {
  const parType = new Map<string, number[]>();
  for (const v of vins) {
    const liste = parType.get(v.type) ?? [];
    liste.push(v.prix_reference_eur);
    parType.set(v.type, liste);
  }
  const resultat = new Map<string, number>();
  for (const [type, prix] of parType) resultat.set(type, mediane(prix));
  return resultat;
}

/** Classifica uma lista de vinhos por QPR (exclui < 10/20). */
export function classer(vins: FicheVin[]): VinClasse[] {
  const medianes = medianesParType(vins);
  return vins
    .filter((v) => v.note_qualite >= 10)
    .map((v) => {
      const med = medianes.get(v.type) ?? v.prix_reference_eur;
      const qpr = calculerQPR(v, med); // 'v' tem offres, mas calculerQPR não as vê
      return { ...v, qpr, etoiles: etoiles(qpr) };
    })
    .sort((a, b) => b.qpr - a.qpr);
}

/** Todos os vinhos publicados, já classificados. */
export function tousLesVinsClasses(): VinClasse[] {
  return classer(chargerVinsPublies());
}

export function vinClasseParSlug(slug: string): VinClasse | undefined {
  return tousLesVinsClasses().find((v) => v.slug === slug);
}
