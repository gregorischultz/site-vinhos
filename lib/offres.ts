import { z } from "zod";
import marchandsData from "@/data/marchands.json";
import { chargerVinsPublies } from "./contenu";
import type { Vin } from "./schema";

/*
  Afiliação (secção 10). Uma oferta só é mostrada se estiver disponível E
  verificada há menos de 90 dias. Todos os cliques passam por /go/[id].
*/

const MarchandSchema = z.object({
  nom: z.string().min(1),
  pays: z.string().min(1),
  programme: z.string().min(1),
  format_lien: z.string().min(1),
  texte_divulgation: z.string().min(1),
  actif: z.boolean(),
});

export const MARCHANDS = z
  .record(z.string(), MarchandSchema)
  .parse(marchandsData);

const JOURS_VALIDITE = 90;

/** id opaco d'une offre, utilisé dans /go/[id]. */
export function idOffre(slugVin: string, marchand: string): string {
  return `${slugVin}--${marchand}`;
}

type OffreVin = Vin["offres"][number];

/** Offres visibles d'un vin : disponibles, marchand actif, vérifiées < 90 jours. */
export function offresVisibles(
  slugVin: string,
  offres: OffreVin[],
): (OffreVin & { id: string; nomMarchand: string })[] {
  const maintenant = Date.now();
  return offres
    .filter((o) => {
      const marchand = MARCHANDS[o.marchand];
      if (!marchand || !marchand.actif) return false;
      if (!o.disponible) return false;
      const age =
        (maintenant - new Date(o.date_verification).getTime()) /
        (1000 * 60 * 60 * 24);
      return age <= JOURS_VALIDITE;
    })
    .map((o) => ({
      ...o,
      id: idOffre(slugVin, o.marchand),
      nomMarchand: MARCHANDS[o.marchand].nom,
    }));
}

/** Résout un id d'offre vers son URL affiliée (pour la redirection /go/[id]). */
export function trouverOffreParId(
  id: string,
): { url: string; marchand: string; vin: string } | null {
  for (const vin of chargerVinsPublies()) {
    for (const offre of vin.offres) {
      if (idOffre(vin.slug, offre.marchand) === id) {
        return { url: offre.url_affiliee, marchand: offre.marchand, vin: vin.slug };
      }
    }
  }
  return null;
}
