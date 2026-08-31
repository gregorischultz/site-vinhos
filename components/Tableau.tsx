type TableauProps = {
  /** cabeçalhos das colunas */
  entetes: string[];
  /** linhas; cada linha é um array de células (texto ou número) */
  lignes: (string | number)[][];
};

/**
 * Tableau — ficha técnica / dados. Fonte monospace (--donnees), separadores 1px.
 */
export function Tableau({ entetes, lignes }: TableauProps) {
  return (
    <table className="w-full border-collapse font-donnees text-sm">
      <thead>
        <tr className="border-b border-trait text-left">
          {entetes.map((entete) => (
            <th
              key={entete}
              className="py-2 pr-4 font-medium uppercase tracking-wide text-encre-doux"
            >
              {entete}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lignes.map((ligne, i) => (
          <tr key={i} className="border-b border-trait last:border-0">
            {ligne.map((cellule, j) => (
              <td key={j} className="py-2 pr-4 text-encre">
                {cellule}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
