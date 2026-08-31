"use client";

type Gtag = (
  command: "event",
  name: string,
  params: Record<string, unknown>,
) => void;

/**
 * BoutonOffre — lien d'achat affilié. Envoie l'évènement GA4 `clic_affilie`
 * (si GA4 est présent) puis laisse la navigation vers /go/[id] se faire.
 * rel="sponsored nofollow noopener" et mention « Lien affilié » : exigés pour
 * les liens affiliés (art. L121-3 Code de la consommation).
 */
export function BoutonOffre({
  id,
  marchand,
  prix,
  position,
}: {
  id: string;
  marchand: string;
  prix: number;
  position: number;
}) {
  function clic() {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    gtag?.("event", "clic_affilie", { id, marchand, position });
  }

  return (
    <a
      href={`/go/${id}`}
      onClick={clic}
      rel="sponsored nofollow noopener"
      target="_blank"
      className="inline-flex items-center gap-2 rounded-carafe bg-lie px-4 py-2 font-corps text-sm text-craie hover:bg-lie-clair"
    >
      Voir l&apos;offre — {prix.toFixed(2).replace(".", ",")} €
      <span className="text-xs uppercase tracking-wide opacity-80">
        Lien affilié
      </span>
    </a>
  );
}
