import type { Metadata } from "next";
import { PageLegale } from "@/components/PageLegale";

export const metadata: Metadata = {
  title: "Divulgation d'affiliation — Carafe",
  description:
    "Comment Carafe se rémunère et pourquoi cela n'influence pas nos notes.",
};

export default function DivulgationAffiliation() {
  return (
    <PageLegale titre="Divulgation d'affiliation">
      <p>
        Carafe peut proposer des liens vers des marchands. Lorsque vous achetez
        via l&apos;un de ces liens, nous pouvons percevoir une commission, sans
        aucun surcoût pour vous.
      </p>

      <h2>Une séparation stricte</h2>
      <p>
        Notre classement est éditorial. Il est calculé à partir de la qualité et
        du prix, jamais à partir des commissions. Techniquement, la fonction qui
        calcule nos notes n&apos;a pas accès aux liens marchands : un test
        automatisé le vérifie à chaque mise en production.
      </p>

      <h2>Où apparaissent les liens</h2>
      <p>
        Les liens d&apos;achat sont regroupés dans un bloc « Où acheter »,
        visuellement distinct du classement, sur les fiches concernées. La
        mention sanitaire y figure systématiquement.
      </p>

      <p className="font-donnees text-sm text-encre-doux">
        ⚠️ Les conditions des programmes d&apos;affiliation (Amazon Partenaires,
        réseaux français) concernant l&apos;alcool doivent être vérifiées avant
        activation.
      </p>
    </PageLegale>
  );
}
