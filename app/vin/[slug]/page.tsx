import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { chargerVinsPublies } from "@/lib/contenu";
import { vinClasseParSlug } from "@/lib/classement";
import { libelleType } from "@/lib/libelles";
import { mdxComposants } from "@/lib/mdx-composants";
import { FilDAriane } from "@/components/FilDAriane";
import { Etoiles } from "@/components/Etoiles";
import { Badge } from "@/components/Badge";
import { Tableau } from "@/components/Tableau";
import { BlocSanitaire } from "@/components/BlocSanitaire";
import { BoutonOffre } from "@/components/BoutonOffre";
import { offresVisibles } from "@/lib/offres";
import paysData from "@/data/pays.json";

type Params = { slug: string };
const pays = paysData as Record<string, { libelle_fr: string }>;

export function generateStaticParams(): Params[] {
  return chargerVinsPublies().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vin = vinClasseParSlug(slug);
  if (!vin) return {};
  return {
    title: `${vin.nom} — Carafe`,
    description: vin.resume,
    alternates: { canonical: `/vin/${vin.slug}` },
  };
}

export default async function FicheVin({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const vin = vinClasseParSlug(slug);
  if (!vin) notFound();

  const paysLibelle = pays[vin.pays]?.libelle_fr ?? vin.pays;
  const offres = offresVisibles(vin.slug, vin.offres);

  const ficheTechnique: [string, string | number][] = [
    ["Type", libelleType(vin.type)],
    ["Cépages", vin.cepages.join(", ")],
    ["Appellation", vin.appellation],
    ["Région", `${vin.region} · ${paysLibelle}`],
    ["Millésime", vin.millesime],
    ["Degré", `${vin.degre.toFixed(1).replace(".", ",")} % vol`],
    ["Prix de référence", `${vin.prix_reference_eur.toFixed(2).replace(".", ",")} €`],
    ["Service", vin.temperature_service],
    ["Garde", vin.garde],
    ["Carafage", vin.carafage ? "Recommandé" : "Non nécessaire"],
  ];

  const degustation: [string, number][] = [
    ["Corps", vin.degustation.corps],
    ["Acidité", vin.degustation.acidite],
    ...(vin.degustation.tanins !== null
      ? ([["Tanins", vin.degustation.tanins]] as [string, number][])
      : []),
    ["Sucrosité", vin.degustation.sucrosite],
  ];

  return (
    <main className="contenu py-10">
      <FilDAriane
        miettes={[
          { libelle: "Accueil", href: "/" },
          { libelle: libelleType(vin.type), href: `/vins/${vin.type}` },
          { libelle: vin.nom },
        ]}
      />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Badge>{libelleType(vin.type)}</Badge>
        <Badge ton="lie">{paysLibelle}</Badge>
      </div>
      <h1 className="mt-4 text-4xl">{vin.nom}</h1>
      <p className="mt-2 font-donnees text-encre-doux">{vin.producteur}</p>
      <p className="mt-4 max-w-[68ch] text-lg text-encre-doux">{vin.resume}</p>

      {/* ── ZONE 1 : NOTRE CLASSEMENT (éditorial, aucun lien commercial) ── */}
      <section className="mt-8 rounded-carafe border border-trait bg-craie p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="font-donnees text-xs uppercase tracking-wide text-sauge">
              Notre classement
            </p>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-3xl">
                <Etoiles note={vin.etoiles} />
              </span>
              <span className="font-donnees text-lg text-encre">
                {vin.note_qualite.toFixed(1).replace(".", ",")}/20
              </span>
            </div>
          </div>
          <Link
            href="/methode"
            className="font-corps text-sm text-lie underline hover:text-lie-clair"
          >
            Comment nous notons →
          </Link>
        </div>
      </section>

      <div className="mt-10 grid gap-10 md:grid-cols-[2fr_1fr]">
        <div>
          <MDXRemote source={vin.corps} components={mdxComposants} />
        </div>
        <aside className="space-y-8">
          <div>
            <h2 className="mb-3 text-xl">Fiche technique</h2>
            <Tableau
              entetes={["", ""]}
              lignes={ficheTechnique.map(([k, v]) => [k, v])}
            />
          </div>
          <div>
            <h2 className="mb-3 text-xl">Dégustation</h2>
            <Tableau
              entetes={["Critère", "/5"]}
              lignes={degustation.map(([k, v]) => [k, v])}
            />
            <p className="mt-2 font-donnees text-xs text-encre-doux">
              Arômes : {vin.aromes.join(", ")}.
            </p>
          </div>
        </aside>
      </div>

      {/* ── ZONE 2 : OÙ ACHETER (commerce, séparé du classement) ── */}
      <section className="mt-12 rounded-carafe border border-trait bg-sable p-6">
        <h2 className="text-xl">Où acheter</h2>
        <div className="mt-3">
          <BlocSanitaire />
        </div>
        {offres.length === 0 ? (
          <p className="mt-4 text-encre-doux">
            Aucune offre vérifiée pour le moment. Nous n&apos;affichons un lien
            que lorsqu&apos;il a été contrôlé.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {offres.map((offre, i) => (
              <li
                key={offre.id}
                className="flex items-center justify-between gap-4 border-t border-trait pt-3"
              >
                <span className="font-donnees text-encre">
                  {offre.nomMarchand}
                </span>
                <BoutonOffre
                  id={offre.id}
                  marchand={offre.marchand}
                  prix={offre.prix_eur}
                  position={i + 1}
                />
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 font-donnees text-xs text-encre-doux">
          Certains liens sont affiliés : un achat peut nous rémunérer, sans
          surcoût pour vous. Cela n&apos;influence pas notre classement.
        </p>
      </section>
    </main>
  );
}
