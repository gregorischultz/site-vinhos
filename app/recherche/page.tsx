import type { Metadata } from "next";
import { construireIndex } from "@/lib/recherche";
import { RechercheClient } from "@/components/RechercheClient";
import { FilDAriane } from "@/components/FilDAriane";

export const metadata: Metadata = {
  title: "Recherche — Carafe",
  description: "Cherchez un vin, un cépage, un plat ou un type de vin.",
};

// Page 100 % statique : l'index est généré au build, la requête est lue côté client.
export default function PageRecherche() {
  const index = construireIndex();

  return (
    <main className="contenu py-10">
      <FilDAriane
        miettes={[{ libelle: "Accueil", href: "/" }, { libelle: "Recherche" }]}
      />
      <h1 className="mt-6 text-4xl">Recherche</h1>
      <p className="mt-3 max-w-[68ch] text-encre-doux">
        Tapez un plat, un cépage ou un type. La recherche est instantanée et
        fonctionne sans serveur.
      </p>
      <div className="mt-6 max-w-2xl">
        <RechercheClient index={index} />
      </div>
    </main>
  );
}
