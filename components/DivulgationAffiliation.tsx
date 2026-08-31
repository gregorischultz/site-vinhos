/**
 * DivulgationAffiliation — bloc de transparence obligatoire (art. L121-1 et
 * L121-3 Code de la consommation, loi nº 2023-451). Le caractère commercial
 * doit être immédiatement identifiable : ce bloc va EN HAUT, avant le premier
 * lien affilié, jamais seulement en pied de page.
 */
export function DivulgationAffiliation() {
  return (
    <aside className="rounded-carafe border border-trait p-4 font-corps text-sm text-encre">
      <strong>Publicité</strong> — Cette page contient des liens affiliés. Si
      vous achetez via ces liens, nous percevons une commission, sans surcoût
      pour vous. Cela ne modifie ni le prix que vous payez ni notre classement.
    </aside>
  );
}
