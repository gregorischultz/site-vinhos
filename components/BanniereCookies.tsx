"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const COOKIE = "carafe_consentement";
const EVENEMENT_OUVRIR = "carafe:ouvrir-preferences-cookies";

/**
 * Rouvre le bandeau de consentement pour permettre de changer de choix.
 * Utilisé par le lien « Gérer mes cookies » du pied de page (RGPD : retirer
 * son consentement doit être aussi simple que de le donner).
 */
export function ouvrirPreferencesCookies() {
  window.dispatchEvent(new Event(EVENEMENT_OUVRIR));
}

/**
 * BanniereCookies — bandeau de consentement minimal.
 *
 * ⚠️ PLACEHOLDER : avant de diffuser la moindre publicité ou analytics,
 * remplacer par une CMP certifiée Google (Axeptio, Cookiebot…) branchée sur
 * le Consent Mode v2. Ce bandeau se contente d'enregistrer un choix technique.
 */
export function BanniereCookies() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const repondu = document.cookie
      .split("; ")
      .some((c) => c.startsWith(`${COOKIE}=`));
    if (!repondu) setVisible(true);

    // Rouvrir le bandeau depuis « Gérer mes cookies »
    const ouvrir = () => setVisible(true);
    window.addEventListener(EVENEMENT_OUVRIR, ouvrir);
    return () => window.removeEventListener(EVENEMENT_OUVRIR, ouvrir);
  }, []);

  if (!visible) return null;

  function repondre(valeur: "accepte" | "refuse") {
    document.cookie = `${COOKIE}=${valeur}; path=/; max-age=${60 * 60 * 24 * 180}; SameSite=Lax`;
    setVisible(false);
    // Quand GA4/AdSense seront branchés : mettre à jour Consent Mode ici
    // (gtag('consent','update', { analytics_storage: valeur === 'accepte' ? 'granted' : 'denied' }))
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-trait bg-papier">
      <div className="contenu flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[70ch] text-sm text-encre-doux">
          Nous utilisons des cookies techniques nécessaires au fonctionnement du
          site. Aucun cookie de mesure ou de publicité n&apos;est déposé sans
          votre accord.{" "}
          <Link href="/cookies" className="text-lie underline">
            En savoir plus
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          {/* Les deux boutons ont un poids visuel identique (CNIL : refus aussi
              simple et aussi visible que l'acceptation). Ne pas mettre l'un en
              plein et l'autre en contour. */}
          <button
            type="button"
            onClick={() => repondre("refuse")}
            className="rounded-carafe border border-trait px-4 py-2 font-corps text-sm text-encre hover:border-lie"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => repondre("accepte")}
            className="rounded-carafe border border-trait px-4 py-2 font-corps text-sm text-encre hover:border-lie"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
