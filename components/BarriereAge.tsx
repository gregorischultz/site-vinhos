"use client";

import { useEffect, useState } from "react";

const COOKIE = "carafe_majeur";

/**
 * BarriereAge — écran 18+ à la première visite. Aucune donnée collectée :
 * un simple cookie technique mémorise le choix pour un an.
 * L'overlay est client-only : le contenu reste dans le HTML pour le SEO.
 */
export function BarriereAge() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const confirme = document.cookie
      .split("; ")
      .some((c) => c === `${COOKIE}=1`);
    if (!confirme) setVisible(true);
  }, []);

  if (!visible) return null;

  function confirmer() {
    document.cookie = `${COOKIE}=1; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    setVisible(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-encre/80 p-6">
      <div className="max-w-md rounded-carafe border border-trait bg-papier p-8 text-center">
        <p className="font-titres text-2xl text-lie">Carafe</p>
        <h2 className="mt-4 text-xl">Avez-vous 18 ans ou plus ?</h2>
        <p className="mt-3 text-sm text-encre-doux">
          Ce site présente des vins. Sa consultation est réservée aux personnes
          majeures.
        </p>
        <p className="mt-4 font-donnees text-xs uppercase tracking-wide text-encre-doux">
          L&apos;abus d&apos;alcool est dangereux pour la santé, à consommer avec
          modération.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={confirmer}
            className="rounded-carafe bg-lie px-6 py-3 font-corps text-craie hover:bg-lie-clair"
          >
            J&apos;ai 18 ans ou plus
          </button>
          <a
            href="https://www.google.com"
            className="rounded-carafe border border-trait px-6 py-3 font-corps text-encre-doux hover:border-lie"
          >
            Quitter
          </a>
        </div>
      </div>
    </div>
  );
}
