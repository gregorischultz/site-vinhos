import type { Metadata } from "next";
import { PageLegale } from "@/components/PageLegale";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Carafe",
  description: "Comment nous traitons vos données personnelles.",
};

export default function Confidentialite() {
  return (
    <PageLegale titre="Politique de confidentialité">
      <p>
        Cette politique explique quelles données sont traitées lorsque vous
        consultez Carafe, conformément au Règlement général sur la protection des
        données (RGPD).
      </p>

      <h2>Données collectées</h2>
      <p>
        Le site est un guide éditorial : il ne propose ni compte, ni formulaire
        de connexion, ni newsletter. Aucune donnée personnelle n&apos;est
        collectée à des fins commerciales.
      </p>
      <p>
        Deux cookies techniques peuvent être déposés : l&apos;un mémorise votre
        confirmation de majorité, l&apos;autre votre choix concernant les
        cookies. Ils ne contiennent aucune donnée identifiante.
      </p>

      <h2>Mesure d&apos;audience et publicité</h2>
      <p>
        [À COMPLÉTER lorsque GA4 / une régie publicitaire seront activés :
        finalités, base légale, durée de conservation, destinataires. Aucun
        traceur de mesure ou de publicité n&apos;est déposé sans consentement,
        via une CMP certifiée et le Consent Mode v2.]
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification et
        d&apos;effacement. Pour l&apos;exercer : [À COMPLÉTER : adresse e-mail].
        Vous pouvez saisir la CNIL en cas de difficulté.
      </p>

      <p className="font-donnees text-sm text-encre-doux">
        ⚠️ Modèle à compléter et à faire valider avant mise en ligne.
      </p>
    </PageLegale>
  );
}
