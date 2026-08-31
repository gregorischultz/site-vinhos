/**
 * BlocSanitaire — menção sanitária obrigatória (loi Évin).
 * Deve aparecer no rodapé de todas as páginas e por cima de qualquer bloco
 * com link de compra. O texto é fixo por lei, não editar.
 */
export function BlocSanitaire() {
  return (
    <p className="font-donnees text-xs uppercase tracking-wide text-encre-doux">
      L&apos;abus d&apos;alcool est dangereux pour la santé, à consommer avec
      modération.
    </p>
  );
}
