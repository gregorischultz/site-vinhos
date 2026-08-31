"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Fuse from "fuse.js";
import type { DocRecherche } from "@/lib/recherche";
import { Badge } from "@/components/Badge";

/**
 * RechercheClient — pesquisa instantânea no cliente com Fuse.js.
 * Recebe o índice gerado no build; não faz pedidos ao servidor.
 * Ao submeter (Enter), tenta a IA d'intention ; en cas d'échec, Fuse.js prend
 * le relais sans erreur visible.
 */
export function RechercheClient({ index }: { index: DocRecherche[] }) {
  const router = useRouter();
  const [requete, setRequete] = useState("");
  const [enCours, setEnCours] = useState(false);

  // Lê ?q= da URL no arranque (mantém a página estática, sem render no servidor).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setRequete(q);
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(index, {
        keys: ["titre", "sous_titre", "motscles"],
        threshold: 0.4,
        ignoreLocation: true,
      }),
    [index],
  );

  const resultats = useMemo(() => {
    const q = requete.trim();
    if (!q) return [];
    return fuse.search(q).slice(0, 20);
  }, [fuse, requete]);

  async function soumettre(e: React.FormEvent) {
    e.preventDefault();
    const q = requete.trim();
    if (!q) return;
    setEnCours(true);
    try {
      const res = await fetch("/api/intention", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texte: q }),
      });
      const data = await res.json();
      if (data?.redirection) {
        router.push(data.redirection);
        return;
      }
    } catch {
      // silencieux : on reste sur les résultats Fuse.js
    } finally {
      setEnCours(false);
    }
  }

  return (
    <form onSubmit={soumettre}>
      <input
        type="search"
        value={requete}
        onChange={(e) => setRequete(e.target.value)}
        placeholder="Un plat, un cépage, un type de vin…"
        autoFocus
        className="w-full rounded-carafe border border-trait bg-papier px-4 py-3 font-corps text-lg text-encre outline-none focus:border-lie"
      />

      {requete.trim() && (
        <p className="mt-3 font-donnees text-sm text-encre-doux">
          {enCours
            ? "Interprétation…"
            : `${resultats.length} résultat${resultats.length > 1 ? "s" : ""}`}
        </p>
      )}

      <ul className="mt-4 divide-y divide-trait">
        {resultats.map(({ item }) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="flex items-center justify-between gap-4 py-3 hover:text-lie"
            >
              <span>
                <span className="text-lg text-encre">{item.titre}</span>
                <span className="mt-0.5 block font-donnees text-sm text-encre-doux">
                  {item.sous_titre}
                </span>
              </span>
              <Badge ton={item.categorie === "Vin" ? "lie" : "sauge"}>
                {item.categorie}
              </Badge>
            </Link>
          </li>
        ))}
      </ul>

      {requete.trim() && resultats.length === 0 && (
        <p className="mt-6 text-encre-doux">
          Aucun résultat. Essayez un cépage (« malbec »), un plat (« fromage »)
          ou un type (« rouge sec »).
        </p>
      )}
    </form>
  );
}
