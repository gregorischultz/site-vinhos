import type { ReactNode } from "react";

type CarteProps = {
  children: ReactNode;
  /** fundo alternado --sable em vez de --papier */
  ton?: "papier" | "sable";
};

/**
 * Carte — bloco de conteúdo. Separação por 1px de --trait, sem sombra (secção 3).
 */
export function Carte({ children, ton = "papier" }: CarteProps) {
  const fundo = ton === "sable" ? "bg-sable" : "bg-papier";
  return (
    <div className={`${fundo} rounded-carafe border border-trait p-6`}>
      {children}
    </div>
  );
}
