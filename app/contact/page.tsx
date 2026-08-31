import type { Metadata } from "next";
import { PageLegale } from "@/components/PageLegale";

export const metadata: Metadata = {
  title: "Contact — Carafe",
  description: "Contacter l'équipe éditoriale de Carafe.",
};

export default function Contact() {
  return (
    <PageLegale titre="Contact">
      <p>
        Une question, une erreur repérée sur une fiche, une suggestion de vin à
        goûter ? Écrivez-nous.
      </p>
      <p>
        Courriel : [À COMPLÉTER : adresse e-mail de contact].
      </p>
      <p>
        Nous lisons tout, mais ne pouvons pas garantir une réponse à chaque
        message. Les demandes concernant vos données personnelles sont traitées
        selon notre{" "}
        <a href="/politique-de-confidentialite">
          politique de confidentialité
        </a>
        .
      </p>
    </PageLegale>
  );
}
