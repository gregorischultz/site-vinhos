"use client";

import { ouvrirPreferencesCookies } from "@/components/BanniereCookies";

/**
 * Lien permanent « Gérer mes cookies » (CNIL, art. 7 RGPD).
 * Rouvre le bandeau de consentement pour changer de choix à tout moment.
 * Rendu comme les autres liens du pied de page.
 */
export function LienGererCookies() {
  return (
    <button
      type="button"
      onClick={ouvrirPreferencesCookies}
      className="font-corps text-sm text-encre-doux hover:text-lie"
    >
      Gérer mes cookies
    </button>
  );
}
