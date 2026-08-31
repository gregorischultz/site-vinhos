import type { Metadata } from "next";
import { FilDAriane } from "@/components/FilDAriane";
import { Carte } from "@/components/Carte";
import { Tableau } from "@/components/Tableau";
import { POIDS_PRIX, POIDS_QUALITE } from "@/lib/qualite-prix";

export const metadata: Metadata = {
  title: "Notre méthode — Carafe",
  description:
    "Comment nous notons les vins : rapport qualité-prix, barème et transparence.",
};

export default function Methode() {
  return (
    <main className="contenu py-10">
      <FilDAriane
        miettes={[{ libelle: "Accueil", href: "/" }, { libelle: "Méthode" }]}
      />
      <h1 className="mt-6 text-4xl">Comment nous notons</h1>
      <p className="mt-4 max-w-[68ch] text-lg text-encre-doux">
        Chaque fiche est écrite et notée à la main. La note de qualité est
        attribuée par un humain, jamais par une machine. Le rapport qualité-prix
        (QPR), lui, est calculé de façon déterministe : la même fiche donne
        toujours le même résultat.
      </p>

      <h2 className="mt-10 text-2xl text-lie">Le rapport qualité-prix</h2>
      <p className="mt-4 max-w-[68ch] leading-7">
        Le QPR combine deux choses : la qualité intrinsèque du vin (notre note
        sur 20) et son prix comparé à la médiane des vins du même type dans notre
        sélection. Un vin meilleur que la moyenne et moins cher que ses pairs
        monte ; l&apos;inverse descend.
      </p>

      <Carte ton="sable">
        <pre className="overflow-x-auto font-donnees text-sm text-encre">
          {`score_qualite = (note_qualite - 10) / 10        → 0 à 1
ratio_prix    = mediane_prix_du_type / prix        → >1 si moins cher
score_prix    = min(ratio_prix, 2) / 2             → plafonné, 0 à 1

QPR = ${POIDS_QUALITE} × score_qualite + ${POIDS_PRIX} × score_prix`}
        </pre>
      </Carte>

      <p className="mt-4 max-w-[68ch] leading-7 text-encre-doux">
        Les poids {POIDS_QUALITE} / {POIDS_PRIX} sont un choix éditorial assumé,
        pas une vérité. Les modifier est une décision consciente, datée et
        documentée.
      </p>

      <h2 className="mt-10 text-2xl text-lie">Le barème en étoiles</h2>
      <div className="mt-4 max-w-md">
        <Tableau
          entetes={["QPR", "Étoiles"]}
          lignes={[
            ["≥ 0,80", "★★★★★"],
            ["≥ 0,65", "★★★★"],
            ["≥ 0,50", "★★★"],
            ["≥ 0,35", "★★"],
            ["< 0,35", "★"],
          ]}
        />
      </div>

      <h2 className="mt-10 text-2xl text-lie">Notre garantie d&apos;indépendance</h2>
      <p className="mt-4 max-w-[68ch] leading-7">
        Le calcul du classement ne connaît pas les liens d&apos;achat. Ce
        n&apos;est pas une promesse : dans notre code, la fonction qui calcule le
        QPR n&apos;a techniquement pas accès aux offres commerciales. Un test
        automatisé le vérifie à chaque build.
      </p>
    </main>
  );
}
