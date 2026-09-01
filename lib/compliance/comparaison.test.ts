import { describe, it, expect } from "vitest";
import { assertComparable } from "./comparaison";

describe("assertComparable (art. L122-3)", () => {
  it("accepte une comparaison au sein d'une même appellation", () => {
    expect(() =>
      assertComparable([
        { appellation: "Chinon AOP" },
        { appellation: "Chinon AOP" },
      ]),
    ).not.toThrow();
  });

  it("accepte une liste vide ou d'un seul vin", () => {
    expect(() => assertComparable([])).not.toThrow();
    expect(() => assertComparable([{ appellation: "Sancerre AOP" }])).not.toThrow();
  });

  it("refuse une comparaison entre appellations différentes", () => {
    expect(() =>
      assertComparable([
        { appellation: "Sancerre AOP" },
        { appellation: "Pouilly-Fumé AOP" },
      ]),
    ).toThrow(/Comparaison illicite/);
  });
});
