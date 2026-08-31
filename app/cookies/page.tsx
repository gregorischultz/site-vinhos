import type { Metadata } from "next";
import { PageLegale } from "@/components/PageLegale";
import { Tableau } from "@/components/Tableau";

export const metadata: Metadata = {
  title: "Cookies — Carafe",
  description: "Les cookies utilisés par le site et comment les gérer.",
};

export default function Cookies() {
  return (
    <PageLegale titre="Gestion des cookies">
      <p>
        Un cookie est un petit fichier déposé sur votre appareil. Carafe
        n&apos;utilise, à ce jour, que des cookies techniques indispensables.
      </p>

      <div className="not-prose my-6">
        <Tableau
          entetes={["Cookie", "Rôle", "Durée"]}
          lignes={[
            ["carafe_majeur", "Mémorise la confirmation de majorité", "1 an"],
            ["carafe_consentement", "Mémorise votre choix cookies", "6 mois"],
          ]}
        />
      </div>

      <h2>Cookies de mesure et de publicité</h2>
      <p>
        Ils ne sont pas actifs à ce stade. Lorsqu&apos;ils le seront, ils ne
        seront déposés qu&apos;après votre consentement explicite, recueilli via
        une CMP (plateforme de gestion du consentement) certifiée par Google et
        connectée au Consent Mode v2.
      </p>

      <h2>Gérer vos cookies</h2>
      <p>
        Vous pouvez à tout moment supprimer les cookies depuis les réglages de
        votre navigateur. La suppression du cookie de majorité réaffichera
        l&apos;écran 18+.
      </p>

      <p className="font-donnees text-sm text-encre-doux">
        ⚠️ Ce bandeau de consentement est provisoire : il doit être remplacé par
        une CMP certifiée avant toute diffusion publicitaire.
      </p>
    </PageLegale>
  );
}
