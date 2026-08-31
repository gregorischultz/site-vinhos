import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { tousLesVinsClasses } from "@/lib/classement";
import { TYPES_VIN, libelleType } from "@/lib/libelles";
import { FilDAriane } from "@/components/FilDAriane";
import { Etoiles } from "@/components/Etoiles";
import { Carte } from "@/components/Carte";
import { DonneesStructurees } from "@/components/DonneesStructurees";
import { SITE_URL } from "@/lib/site";

type Params = { type: string };

export function generateStaticParams(): Params[] {
  return TYPES_VIN.map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { type } = await params;
  return {
    title: `${libelleType(type)} — le classement — Carafe`,
    description: `Notre sélection de ${libelleType(type).toLowerCase()}, classée par rapport qualité-prix.`,
    alternates: { canonical: `/vins/${type}` },
  };
}

export default async function PageType({
  params,
}: {
  params: Promise<Params>;
}) {
  const { type } = await params;
  if (!TYPES_VIN.includes(type as (typeof TYPES_VIN)[number])) notFound();

  const vins = tousLesVinsClasses().filter((v) => v.type === type);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${libelleType(type)} — classement Carafe`,
    itemListElement: vins.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: v.nom,
      url: `${SITE_URL}/vin/${v.slug}`,
    })),
  };

  return (
    <main className="contenu py-10">
      <DonneesStructurees data={itemList} />
      <FilDAriane
        miettes={[
          { libelle: "Accueil", href: "/" },
          { libelle: libelleType(type) },
        ]}
      />
      <h1 className="mt-6 text-4xl">{libelleType(type)}</h1>
      <p className="mt-3 max-w-[68ch] text-lg text-encre-doux">
        Notre sélection, classée par rapport qualité-prix. Le classement est
        éditorial et n&apos;a aucun lien avec les offres commerciales.
      </p>

      {vins.length === 0 ? (
        <p className="mt-10 text-encre-doux">
          Aucun vin publié dans cette catégorie pour l&apos;instant.
        </p>
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
                        {vin.appellation} · {vin.cepages.join(", ")}
                      </p>
                      <p className="mt-2 max-w-[60ch] text-encre-doux">
                        {vin.resume}
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
