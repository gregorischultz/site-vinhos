import Link from "next/link";
import type { ReactNode } from "react";

type Variante = "primaire" | "secondaire";

type BoutonProps = {
  children: ReactNode;
  href?: string;
  variante?: Variante;
};

const base =
  "inline-flex items-center justify-center rounded-carafe px-6 py-3 font-corps text-base font-medium transition-colors";

const variantes: Record<Variante, string> = {
  primaire: "bg-lie text-craie hover:bg-lie-clair",
  secondaire:
    "border border-lie text-lie hover:bg-lie hover:text-craie bg-transparent",
};

/**
 * Bouton — ação principal (primaire) ou secundária (secondaire).
 * Renderiza um <Link> se tiver href, senão um <button>.
 */
export function Bouton({ children, href, variante = "primaire" }: BoutonProps) {
  const classes = `${base} ${variantes[variante]}`;
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}
