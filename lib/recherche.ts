import { tousLesVinsClasses } from "./classement";
import { listeAliments } from "./accords";
import { TYPES_VIN, libelleType } from "./libelles";
import paysData from "@/data/pays.json";

const pays = paysData as Record<string, { libelle_fr: string }>;

export type DocRecherche = {
  id: string;
  titre: string;
  sous_titre: string;
  categorie: "Vin" | "Accord" | "Type";
  href: string;
  motscles: string;
};

/*
  Índice de pesquisa gerado no build (secção 4). Reúne vinhos, acordos e tipos
  num único array serializável, passado ao cliente que corre o Fuse.js.
*/
export function construireIndex(): DocRecherche[] {
  const vins = tousLesVinsClasses().map((v) => ({
    id: `vin:${v.slug}`,
    titre: v.nom,
    sous_titre: `${libelleType(v.type)} · ${v.appellation}`,
    categorie: "Vin" as const,
    href: `/vin/${v.slug}`,
    motscles: [
      v.producteur,
      v.region,
      v.appellation,
      pays[v.pays]?.libelle_fr ?? v.pays,
      ...v.cepages,
      ...v.aromes,
    ].join(" "),
  }));

  const accords = listeAliments().map((a) => ({
    id: `accord:${a.slug}`,
    titre: a.libelle_fr,
    sous_titre: "Accord mets & vin",
    categorie: "Accord" as const,
    href: `/accords/${a.slug}`,
    motscles: a.synonymes.join(" "),
  }));

  const types = TYPES_VIN.map((t) => ({
    id: `type:${t}`,
    titre: libelleType(t),
    sous_titre: "Classement par type",
    categorie: "Type" as const,
    href: `/vins/${t}`,
    motscles: t.replace("-", " "),
  }));

  return [...vins, ...accords, ...types];
}
