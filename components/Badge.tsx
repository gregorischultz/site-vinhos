import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  /** sauge (secundária, por defeito) ou lie (primária) */
  ton?: "sauge" | "lie";
};

/**
 * Badge — etiqueta curta (tipo de vinho, motor de acordos…).
 */
export function Badge({ children, ton = "sauge" }: BadgeProps) {
  const cor = ton === "lie" ? "bg-lie" : "bg-sauge";
  return (
    <span
      className={`${cor} inline-block rounded-carafe px-2.5 py-1 font-donnees text-xs uppercase tracking-wide text-craie`}
    >
      {children}
    </span>
  );
}
