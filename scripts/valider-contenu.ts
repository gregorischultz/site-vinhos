/*
  Valida todas as fichas antes do build. Se alguma estiver incompleta, errada,
  ou referir um acordo inexistente, sai com código 1 e o build para.
  Corre via "npm run valider" ou automaticamente no "prebuild".
*/
import { chargerTousLesVins } from "../lib/contenu";
import { ALIMENTS } from "../lib/accords";
import { checkCompliance } from "../lib/compliance/blocklist";

try {
  const vins = chargerTousLesVins();
  const clesAccords = new Set(Object.keys(ALIMENTS));

  // Cada clé d'accord d'une fiche doit exister dans data/aliments.json.
  for (const vin of vins) {
    for (const accord of vin.accords) {
      if (!clesAccords.has(accord)) {
        throw new Error(
          `\n❌ content/vins/${vin.slug}.mdx : accord inconnu "${accord}" (absent de data/aliments.json).\n`,
        );
      }
    }
  }

  // Filtre loi Évin : le texte éditorial (résumé, corps MDX, arômes) ne doit
  // contenir aucun terme hédonique, festif, sanitaire ou saisonnier interdit.
  const nonConformes = vins
    .map((vin) => {
      const texte = [vin.resume, vin.corps, ...vin.aromes].join("\n");
      return { slug: vin.slug, ...checkCompliance(texte) };
    })
    .filter((r) => !r.ok);

  if (nonConformes.length > 0) {
    const details = nonConformes
      .map((r) => `    · content/vins/${r.slug}.mdx : ${r.hits.join(", ")}`)
      .join("\n");
    throw new Error(
      `\n❌ Contenu non conforme (loi Évin, regrasLegais.md §5) :\n${details}\n`,
    );
  }

  const publies = vins.filter((v) => v.statut === "publie").length;
  console.log(
    `✅ ${vins.length} fiche(s) valide(s) — dont ${publies} publiée(s). ${clesAccords.size} accords chargés.`,
  );
} catch (erreur) {
  console.error(erreur instanceof Error ? erreur.message : erreur);
  console.error("Build interrompu : corrige le contenu ci-dessus.\n");
  process.exit(1);
}
