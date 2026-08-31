/*
  Vérifie chaque URL affiliée des fiches et écrit un rapport lisible.
  Lancer avec : npm run verifier-liens
  (Ne bloque pas le build : c'est un outil de maintenance.)
*/
import { chargerVinsPublies } from "../lib/contenu";
import { MARCHANDS } from "../lib/offres";

type Ligne = {
  vin: string;
  marchand: string;
  url: string;
  statut: string;
  ageJours: number;
};

async function verifier(url: string): Promise<string> {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    return res.ok ? `OK ${res.status}` : `⚠️ ${res.status}`;
  } catch {
    return "❌ injoignable";
  }
}

async function main() {
  const vins = chargerVinsPublies();
  const lignes: Ligne[] = [];

  for (const vin of vins) {
    for (const offre of vin.offres) {
      const statut = await verifier(offre.url_affiliee);
      const ageJours = Math.round(
        (Date.now() - new Date(offre.date_verification).getTime()) /
          (1000 * 60 * 60 * 24),
      );
      lignes.push({
        vin: vin.slug,
        marchand: MARCHANDS[offre.marchand]?.nom ?? offre.marchand,
        url: offre.url_affiliee,
        statut,
        ageJours,
      });
    }
  }

  if (lignes.length === 0) {
    console.log("Aucune offre à vérifier.");
    return;
  }

  console.log(`\nRapport de vérification — ${lignes.length} offre(s)\n`);
  for (const l of lignes) {
    const alerteAge = l.ageJours > 90 ? " ⏳ >90j (masquée au build)" : "";
    console.log(
      `  ${l.statut.padEnd(14)} ${l.vin} · ${l.marchand} · ${l.ageJours}j${alerteAge}`,
    );
    console.log(`                 ${l.url}`);
  }
  console.log("");
}

main();
