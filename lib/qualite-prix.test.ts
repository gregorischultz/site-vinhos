import { describe, it, expect } from "vitest";
import { calculerQPR, etoiles, scorePrix, scoreQualite } from "./qualite-prix";
import type { Vin, VinPourClassement } from "./schema";

// Um vinho de referência para os testes (dados arbitrários, só para o cálculo).
const vinBase: VinPourClassement = {
  slug: "test",
  nom: "Test",
  producteur: "Test",
  pays: "france",
  region: "Test",
  appellation: "Test",
  type: "rouge-sec",
  cepages: ["Test"],
  millesime: 2021,
  degre: 13,
  prix_reference_eur: 10,
  date_prix: "2026-08-01",
  note_qualite: 15,
  degustation: { corps: 3, acidite: 3, tanins: 3, sucrosite: 1 },
  aromes: ["test"],
  temperature_service: "16 °C",
  garde: "3 ans",
  carafage: false,
  accords: [],
  resume: "Test",
  auteur: "gregori",
  date_publication: "2026-09-01",
  date_revision: "2026-09-01",
  statut: "publie",
};

describe("QPR", () => {
  it("calcule le score attendu", () => {
    // note 15 -> scoreQualite 0.5 ; prix 10, médiane 12 -> ratio 1.2 -> scorePrix 0.6
    // qpr = 0.6*0.5 + 0.4*0.6 = 0.54
    expect(calculerQPR(vinBase, 12)).toBeCloseTo(0.54, 5);
  });

  it("plafonne le score de prix à 1", () => {
    // médiane très élevée -> ratio > 2 -> scorePrix plafonné à 1
    expect(scorePrix(10, 1000)).toBe(1);
  });

  it("mappe correctement les étoiles", () => {
    expect(etoiles(0.85)).toBe(5);
    expect(etoiles(0.7)).toBe(4);
    expect(etoiles(0.55)).toBe(3);
    expect(etoiles(0.4)).toBe(2);
    expect(etoiles(0.2)).toBe(1);
  });

  it("scoreQualite exclut structurellement les vins < 10/20 (score négatif)", () => {
    expect(scoreQualite(8)).toBeLessThan(0);
  });
});

describe("blindage anti-conflit d'intérêts (secção 7)", () => {
  it("le QPR ne dépend QUE de note_qualite et prix — jamais des offres", () => {
    // Deux vinhos identiques, l'un avec des offres alléchantes, l'autre sans.
    const vinRiche: Vin = {
      ...vinBase,
      offres: [
        {
          marchand: "gros-vendeur",
          url_affiliee: "https://exemple.fr/vin",
          prix_eur: 10,
          date_verification: "2026-08-01",
          disponible: true,
        },
      ],
    };
    const vinPauvre: Vin = { ...vinBase, offres: [] };

    // Même entrée qualité/prix -> même QPR, quelles que soient les offres.
    expect(calculerQPR(vinRiche, 12)).toBe(calculerQPR(vinPauvre, 12));
  });

  it("le type VinPourClassement n'expose PAS le champ offres", () => {
    // @ts-expect-error : 'offres' n'existe pas sur VinPourClassement — preuve au niveau des types.
    const _ = vinBase.offres;
    expect(_).toBeUndefined();
  });
});
