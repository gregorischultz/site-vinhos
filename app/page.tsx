import Link from "next/link";
import { tousLesVinsClasses } from "@/lib/classement";
import { listeAliments } from "@/lib/accords";
import { TYPES_VIN, libelleType } from "@/lib/libelles";
import { Carte } from "@/components/Carte";
import { Bouton } from "@/components/Bouton";
import { Etoiles } from "@/components/Etoiles";

export default function Home() {
  const selection = tousLesVinsClasses().slice(0, 4);
  const accords = listeAliments().slice(0, 6);

  return (
    <main>
      {/* Hero — registre factuel, conforme L.3323-4 */}
      <section className="border-b border-trait">
        <div className="contenu py-20">
          <p className="font-donnees text-sm uppercase tracking-wide text-sauge">
            Guide éditorial des vins
          </p>
          <h1 className="mt-4 max-w-[16ch] text-4xl leading-tight">
            La bonne bouteille, sans se tromper.
          </h1>
          <p className="mt-5 max-w-[60ch] text-lg text-encre-doux">
            Choisissez une bouteille concrète en moins de deux minutes : à partir
            du plat que vous préparez, de votre budget, ou du type de vin. Une
            sélection réduite, notée à la main, avec une méthode publiée.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Bouton href="/accords" variante="primaire">
              Partir d&apos;un plat
            </Bouton>
            <Bouton href="/recherche" variante="secondaire">
              Rechercher
            </Bouton>
          </div>
        </div>
      </section>

      {/* Partir d'un plat */}
      <section className="contenu py-16">
        <h2 className="text-2xl text-lie">Partir d&apos;un plat</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accords.map((a) => (
            <Link key={a.slug} href={`/accords/${a.slug}`} className="block">
              <Carte>
                <h3 className="text-xl text-encre">{a.libelle_fr}</h3>
                <p className="mt-2 text-sm text-encre-doux">
                  {a.explication_fr}
                </p>
              </Carte>
            </Link>
          ))}
        </div>
      </section>

      {/* Partir d'un type */}
      <section className="border-t border-trait bg-sable">
        <div className="contenu py-16">
          <h2 className="text-2xl text-lie">Partir d&apos;un type</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {TYPES_VIN.map((t) => (
              <Link
                key={t}
                href={`/vins/${t}`}
                className="rounded-carafe border border-trait bg-papier px-4 py-2 font-corps text-encre hover:border-lie hover:text-lie"
              >
                {libelleType(t)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Notre sélection */}
      {selection.length > 0 && (
        <section className="contenu py-16">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl text-lie">Notre sélection</h2>
            <Link href="/methode" className="text-sm text-lie underline">
              Comment nous notons →
            </Link>
          </div>
          <ol className="mt-6 space-y-4">
            {selection.map((vin) => (
              <li key={vin.slug}>
                <Link href={`/vin/${vin.slug}`} className="block">
                  <Carte>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl text-encre">{vin.nom}</h3>
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
        </section>
      )}
    </main>
  );
}
