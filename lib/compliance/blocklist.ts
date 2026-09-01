/**
 * Filtre de conformité loi Évin (regrasLegais.md, section 5).
 *
 * Réseau de sécurité — PAS une garantie. Un texte qui passe ce filtre peut
 * rester non conforme ; la liste fermée de l'art. L3323-4 (section 2) reste la
 * référence. Objectif ici : bloquer au build le vocabulaire hédonique, festif,
 * sanitaire ou saisonnier que la loi interdit, avant toute mise en ligne.
 *
 * Aucune IA, aucun coût : simple comparaison de texte.
 *
 * Détection par frontière de mot (et non `includes`) pour éviter les faux
 * positifs du français œnologique : « été » (saison, interdit) ne doit pas se
 * déclencher dans « a été vinifié » (participe passé, légitime).
 */

export const BLOCKED_TERMS = [
  // convivialité / hédonisme
  "convivial", "convivialité", "partage", "partager", "entre amis", "amis",
  "fête", "festif", "célébrer", "célébration", "trinquer", "apéro",
  "plaisir", "délice", "gourmand", "séduisant", "séduction", "sensuel",
  "envoûtant", "envoûtement", "romantique", "moment parfait", "soirée",
  "détente", "se détendre", "relaxer", "réconfort", "évasion", "voyage sensoriel",
  // vacances / saison / sport
  // « été » (saison) est un homographe de « a été » (auxiliaire) : on ne cible
  // que les tournures saisonnières, jamais le mot seul. « terrasses » (au
  // pluriel, terroir viticole) n'est pas visé — seul le singulier « terrasse ».
  "vacances", "l'été", "cet été", "en été", "d'été", "plage", "soleil",
  "terrasse", "sport", "match", "victoire", "champion", "stade",
  // statut
  "succès", "prestige", "luxe", "raffinement", "sophistiqué", "élégance de vivre",
  // invitation à consommer
  "ouvrez une bouteille", "laissez-vous tenter", "à déguster ce soir",
  "masterclass", "leçon de dégustation", "il faut goûter",
  // santé (interdiction absolue)
  "santé", "bienfaits", "digeste", "léger pour l'organisme", "antioxydant",
  "resvératrol", "bon pour le cœur", "vertus",
];

export const BLOCKED_EMOJI = ["🎉", "🥂", "🍾", "🏖️", "☀️", "❤️", "🔥", "😍", "🤩"];

export type ComplianceResult = { ok: boolean; hits: string[] };

// Une lettre (accents français inclus), pour délimiter les mots.
const LETTRE = "A-Za-zÀ-ÿ";

function versRegex(terme: string): RegExp {
  const echappe = terme.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![${LETTRE}])${echappe}(?![${LETTRE}])`, "iu");
}

const REGEX_TERMES: ReadonlyArray<readonly [string, RegExp]> = BLOCKED_TERMS.map(
  (t) => [t, versRegex(t)] as const,
);

/** Retourne les termes/emoji interdits présents dans le texte. */
export function checkCompliance(text: string): ComplianceResult {
  // Normalise l'apostrophe typographique (’) en apostrophe droite (') pour que
  // « l'été » soit détecté quelle que soit la saisie.
  const normalise = text.replace(/’/g, "'");
  const hits = [
    ...REGEX_TERMES.filter(([, re]) => re.test(normalise)).map(([t]) => t),
    ...BLOCKED_EMOJI.filter((e) => text.includes(e)),
  ];
  return { ok: hits.length === 0, hits };
}
