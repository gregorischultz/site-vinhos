/**
 * Garde-fou de comparaison — loi Évin / Code de la consommation, art. L122-3.
 *
 * « Pour les produits bénéficiant d'une AOP ou d'une IGP, la comparaison n'est
 *   autorisée qu'entre produits bénéficiant chacun de la même appellation. »
 *
 * À appeler AVANT de rendre tout comparateur côte à côte (fiches mises en
 * balance). Si un jour une route /comparatifs est créée, elle DOIT passer par
 * cette fonction : comparer des appellations différentes lève une erreur au
 * build, avant toute mise en ligne.
 *
 * Ne s'applique pas au classement éditorial par type (art. L3323-3-1 et
 * séparation éditoriale) : c'est une question distincte, à trancher avec un
 * juriste (voir regrasLegais.md, sections 4 et 12).
 */
export function assertComparable(vins: { appellation: string }[]): void {
  const appellations = new Set(vins.map((v) => v.appellation));
  if (appellations.size > 1) {
    throw new Error(
      `Comparaison illicite (art. L122-3) : ${[...appellations].join(", ")}`,
    );
  }
}
