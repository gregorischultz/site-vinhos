import type { Metadata } from "next";
import Link from "next/link";
import { listeAliments } from "@/lib/accords";
import { FilDAriane } from "@/components/FilDAriane";
import { Carte } from "@/components/Carte";

export const metadata: Metadata = {
  title: "Accords mets & vins — Carafe",
  description:
    "Quel vin pour quel plat ? Nos accords, une réponse claire plutôt qu'une liste.",
};

export default function IndexAccords() {
  const aliments = listeAliments();
  return (
    <main className="contenu py-10">
      <FilDAriane
        miettes={[{ libelle: "Accueil", href: "/" }, { libelle: "Accords" }]}
      />
      <h1 className="mt-6 text-4xl">Accords mets &amp; vins</h1>
      <p className="mt-3 max-w-[68ch] text-lg text-encre-doux">
        Partez du plat. Nous donnons une réponse — pas deux cents références.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {aliments.map((a) => (
          <Link key={a.slug} href={`/accords/${a.slug}`} className="block">
            <Carte>
              <h2 className="text-xl text-encre">{a.libelle_fr}</h2>
              <p className="mt-2 text-sm text-encre-doux">{a.explication_fr}</p>
            </Carte>
          </Link>
        ))}
      </div>
    </main>
  );
}
