import type { ReactNode } from "react";
import { FilDAriane } from "@/components/FilDAriane";

/**
 * PageLegale — enveloppe commune des pages légales (registre sobre, lisible).
 */
export function PageLegale({
  titre,
  children,
}: {
  titre: string;
  children: ReactNode;
}) {
  return (
    <main className="contenu py-10">
      <FilDAriane
        miettes={[{ libelle: "Accueil", href: "/" }, { libelle: titre }]}
      />
      <h1 className="mt-6 text-4xl">{titre}</h1>
      <div className="mt-6 max-w-[68ch] space-y-4 leading-7 text-encre [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:text-lie [&_a]:text-lie [&_a]:underline">
        {children}
      </div>
    </main>
  );
}
