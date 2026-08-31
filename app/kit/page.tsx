import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { BlocSanitaire } from "@/components/BlocSanitaire";
import { Bouton } from "@/components/Bouton";
import { Carte } from "@/components/Carte";
import { FilDAriane } from "@/components/FilDAriane";
import { Tableau } from "@/components/Tableau";

export const metadata: Metadata = {
  title: "Kit — Carafe",
  description: "Système de design : couleurs, typographie, composants.",
};

const couleurs = [
  ["--craie", "#FAF7F2"],
  ["--papier", "#FFFFFF"],
  ["--encre", "#1C1917"],
  ["--encre-doux", "#6B625B"],
  ["--trait", "#E5DED3"],
  ["--lie", "#6E1E28"],
  ["--lie-clair", "#8F3341"],
  ["--sauge", "#4A5D4E"],
  ["--sable", "#F0E9DE"],
];

const echelle: [string, string][] = [
  ["text-xs", "0.75rem"],
  ["text-sm", "0.875rem"],
  ["text-base", "1rem"],
  ["text-lg", "1.125rem"],
  ["text-xl", "1.375rem"],
  ["text-2xl", "1.75rem"],
  ["text-3xl", "2.25rem"],
  ["text-4xl", "3rem"],
];

function Section({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-trait py-12">
      <h2 className="mb-6 text-2xl text-lie">{titre}</h2>
      {children}
    </section>
  );
}

export default function KitPage() {
  return (
    <main className="contenu py-12">
      <FilDAriane miettes={[{ libelle: "Accueil", href: "/" }, { libelle: "Kit" }]} />

      <h1 className="mt-6 text-4xl">Système de design</h1>
      <p className="mt-3 max-w-[68ch] text-encre-doux">
        Les briques visuelles de Carafe. Système fermé : ni couleur ni police en
        dehors de cette page.
      </p>

      <Section titre="Couleurs">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {couleurs.map(([nom, hex]) => (
            <div key={nom} className="rounded-carafe border border-trait">
              <div
                className="h-20 rounded-t-carafe border-b border-trait"
                style={{ backgroundColor: hex }}
              />
              <div className="p-3 font-donnees text-xs">
                <div className="text-encre">{nom}</div>
                <div className="text-encre-doux">{hex}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section titre="Typographie">
        <div className="space-y-4">
          <p className="font-titres text-4xl">Fraunces — titres</p>
          <p className="font-corps text-lg">
            Public Sans — corps de texte. La bonne bouteille, sans se tromper.
          </p>
          <p className="font-donnees text-base">
            JetBrains Mono — données · 12,50 € · 15,5/20
          </p>
        </div>
        <div className="mt-8 max-w-md">
          <Tableau
            entetes={["Classe", "Taille"]}
            lignes={echelle.map(([classe, taille]) => [classe, taille])}
          />
        </div>
      </Section>

      <Section titre="Boutons">
        <div className="flex flex-wrap gap-4">
          <Bouton variante="primaire">Voir le classement</Bouton>
          <Bouton variante="secondaire">Notre méthode</Bouton>
        </div>
      </Section>

      <Section titre="Badges">
        <div className="flex flex-wrap gap-3">
          <Badge>Rouge sec</Badge>
          <Badge ton="lie">★★★★★</Badge>
          <Badge>Accord fromage</Badge>
        </div>
      </Section>

      <Section titre="Cartes">
        <div className="grid gap-4 md:grid-cols-2">
          <Carte>
            <h3 className="text-xl">Carte sur papier</h3>
            <p className="mt-2 text-encre-doux">
              Fond blanc, bordure 1px, aucune ombre.
            </p>
          </Carte>
          <Carte ton="sable">
            <h3 className="text-xl">Carte sur sable</h3>
            <p className="mt-2 text-encre-doux">
              Fond alterné pour la zone « Où acheter ».
            </p>
          </Carte>
        </div>
      </Section>

      <Section titre="Tableau de données">
        <Tableau
          entetes={["Cépage", "Corps", "Acidité", "Prix"]}
          lignes={[
            ["Gamay", 3, 4, "9,00 €"],
            ["Syrah", 4, 3, "14,50 €"],
            ["Chardonnay", 3, 4, "12,00 €"],
          ]}
        />
      </Section>

      <Section titre="Bloc sanitaire (loi Évin)">
        <Carte ton="sable">
          <BlocSanitaire />
        </Carte>
      </Section>
    </main>
  );
}
