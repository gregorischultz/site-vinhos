import { describe, it, expect } from "vitest";
import { checkCompliance } from "./blocklist";

describe("checkCompliance (loi Évin §5)", () => {
  it("accepte une fiche technique factuelle", () => {
    const r = checkCompliance(
      "Chinon AOP, 100 % cabernet franc, 13 % vol. Robe rubis sombre, nez de fruits noirs, tanins fins. Servir à 16 °C.",
    );
    expect(r.ok).toBe(true);
    expect(r.hits).toEqual([]);
  });

  it("ne se déclenche pas sur les faux positifs œnologiques", () => {
    // « été » (participe), « léger » (structure), « terrasse » absent ici :
    expect(checkCompliance("Ce vin a été élevé en barrique.").ok).toBe(true);
    expect(checkCompliance("Vin de structure légère, acidité moyenne.").ok).toBe(
      true,
    );
  });

  it("bloque le vocabulaire hédonique", () => {
    const r = checkCompliance("Un rouge gourmand, parfait entre amis.");
    expect(r.ok).toBe(false);
    expect(r.hits).toContain("gourmand");
    expect(r.hits).toContain("entre amis");
  });

  it("bloque les allégations de santé et les emoji festifs", () => {
    expect(checkCompliance("Bon pour le cœur 🥂").hits).toEqual(
      expect.arrayContaining(["bon pour le cœur", "🥂"]),
    );
  });
});
