import type { VinPourClassement } from "./schema";

/*
  Rapport qualité-prix (secção 7). Determinístico, explicado em /methode.

  IMPORTANTE: o parâmetro é VinPourClassement = Omit<Vin, "offres">.
  Dentro desta função, o campo `offres` (comissão, marchand, url afiliada)
  simplesmente NÃO EXISTE — o TypeScript recusa lê-lo. A separação entre o
  classement editorial e o comércio não é uma promessa, é impossível de violar.
*/

// Pesos — escolha editorial assumida, declarada em /methode.
export const POIDS_QUALITE = 0.6;
export const POIDS_PRIX = 0.4;

/** Score de qualidade 0..1 a partir da nota /20. Abaixo de 10/20 fica negativo (excluído a montante). */
export function scoreQualite(noteQualite: number): number {
  return (noteQualite - 10) / 10;
}

/** Score de preço 0..1: >0.5 quando o vinho é mais barato que a mediana do seu tipo. */
export function scorePrix(prixReference: number, medianePrixType: number): number {
  const ratio = medianePrixType / prixReference;
  return Math.min(ratio, 2) / 2;
}

/** QPR final 0..1. */
export function calculerQPR(
  vin: VinPourClassement,
  medianePrixType: number,
): number {
  const sq = scoreQualite(vin.note_qualite);
  const sp = scorePrix(vin.prix_reference_eur, medianePrixType);
  return POIDS_QUALITE * sq + POIDS_PRIX * sp;
}

/** Converte o QPR em número de estrelas (0..5). */
export function etoiles(qpr: number): number {
  if (qpr >= 0.8) return 5;
  if (qpr >= 0.65) return 4;
  if (qpr >= 0.5) return 3;
  if (qpr >= 0.35) return 2;
  return 1;
}
