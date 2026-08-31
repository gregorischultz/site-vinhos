import Link from "next/link";
import { Fragment } from "react";
import { SITE_URL } from "@/lib/site";
import { DonneesStructurees } from "@/components/DonneesStructurees";

type Miette = {
  libelle: string;
  href?: string;
};

type FilDArianeProps = {
  miettes: Miette[];
};

/**
 * Fil d'Ariane — navegação de migalhas. O último item é a página atual (sem link).
 * Emite também os dados estruturados BreadcrumbList (SEO).
 */
export function FilDAriane({ miettes }: FilDArianeProps) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: miettes.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.libelle,
      ...(m.href ? { item: `${SITE_URL}${m.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Fil d'Ariane" className="font-corps text-sm text-encre-doux">
      <DonneesStructurees data={breadcrumb} />
      {miettes.map((miette, i) => {
        const dernier = i === miettes.length - 1;
        return (
          <Fragment key={miette.libelle}>
            {miette.href && !dernier ? (
              <Link href={miette.href} className="text-lie hover:underline">
                {miette.libelle}
              </Link>
            ) : (
              <span aria-current={dernier ? "page" : undefined}>
                {miette.libelle}
              </span>
            )}
            {!dernier && <span className="mx-2 text-trait">/</span>}
          </Fragment>
        );
      })}
    </nav>
  );
}
