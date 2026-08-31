import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ALIMENTS, accordsPour } from "@/lib/accords";
import { FilDAriane } from "@/components/FilDAriane";
import { Carte } from "@/components/Carte";
import { Etoiles } from "@/components/Etoiles";
import { DonneesStructurees } from "@/components/DonneesStructurees";
import { libelleType } from "@/lib/libelles";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return Object.keys(ALIMENTS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resultat = accordsPour(slug);
  if (!resultat) return {};
  const { aliment, vins } = resultat;
  return {
    title: `Quel vin pour ${aliment.libelle_fr.toLowerCase()} ? — Carafe`,
    description: aliment.explication_fr,
    alternates: { canonical: `/accords/${slug}` },
    // secção 11 : une page d'accord avec moins de 3 vins éligibles reste noindex
    robots: vins.length < 3 ? { index: false, follow: true } : undefined,
  };
}

export default async function PageAccord({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const resultat = accordsPour(slug);
  if (!resultat) notFound();

  const { aliment, vins } = resultat;

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel vin pour ${aliment.libelle_fr.toLowerCase()} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            vins.length > 0
              ? `${aliment.explication_fr} Notre sélection : ${vins
                  .map((v) => v.nom)
                  .join(", ")}.`
              : aliment.explication_fr,
        },
      },
    ],
  };

  return (
    <main className="contenu py-10">
      {vins.length > 0 && <DonneesStructurees data={faq} />}
      <FilDAriane
        miettes={[
          { libelle: "Accueil", href: "/" },
          { libelle: "Accords", href: "/accords" },
          { libelle: aliment.libelle_fr },
        ]}
      />
      <h1 className="mt-6 text-4xl">
        Quel vin pour {aliment.libelle_fr.toLowerCase()} ?
      </h1>
      <p className="mt-4 max-w-[68ch] text-lg text-encre-doux">
        {aliment.explication_fr}
      </p>

      {vins.length === 0 ? (
        <Carte ton="sable">
          <p className="text-encre">
            Nous n&apos;avons pas encore de vin qui réponde à ce critère dans
            notre sélection. Plutôt que d&apos;inventer une recommandation, nous
            préférons le dire — revenez bientôt.
          </p>
          <p className="mt-3">
            <Link href="/accords" className="text-lie underline">
              Voir les autres accords
            </Link>
          </p>
        </Carte>
      ) : (
        <ol className="mt-8 space-y-4">
          {vins.map((vin, i) => (
            <li key={vin.slug}>
              <Link href={`/vin/${vin.slug}`} className="block">
                <Carte>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="font-donnees text-encre-doux">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="text-xl text-encre">{vin.nom}</h2>
                      </div>
                      <p className="mt-1 font-donnees text-sm text-encre-doux">
                        {libelleType(vin.type)} · {vin.appellation}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl">
                        <Etoiles note={vin.etoiles} />
                      </div>
                      <p className="mt-1 font-donnees text-sm text-encre">
                        {vin.prix_reference_eur.toFixed(2).replace(".", ",")} €
                      </p>
                    </div>
                  </div>
                </Carte>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
