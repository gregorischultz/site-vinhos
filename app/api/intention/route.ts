import { NextResponse } from "next/server";
import { interpreter } from "@/lib/intention";

/*
  Route Handler de l'IA d'intention. Toujours dégradable : en cas d'absence de
  clé, d'erreur ou de faible confiance, renvoie { fallback: true } et le client
  bascule sur la recherche Fuse.js.
*/

// Rate limiting minimal en mémoire (par IP). En production, remplacer par un
// store partagé (Upstash, KV…) car les instances serverless ne partagent rien.
const seuil = 10;
const fenetreMs = 60_000;
const historique = new Map<string, number[]>();

function limite(ip: string): boolean {
  const maintenant = Date.now();
  const recents = (historique.get(ip) ?? []).filter(
    (t) => maintenant - t < fenetreMs,
  );
  recents.push(maintenant);
  historique.set(ip, recents);
  return recents.length > seuil;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limite(ip)) {
    return NextResponse.json({ fallback: true }, { status: 429 });
  }

  let texte = "";
  try {
    const corps = await req.json();
    texte = typeof corps?.texte === "string" ? corps.texte.slice(0, 200) : "";
  } catch {
    return NextResponse.json({ fallback: true });
  }
  if (!texte.trim()) return NextResponse.json({ fallback: true });

  const intention = await interpreter(texte);

  // Pas d'interprétation fiable -> fallback (secção 9 : confiance < 0.7).
  if (!intention || intention.confiance < 0.7) {
    return NextResponse.json({ fallback: true });
  }

  if (intention.intention === "accord" && intention.aliments.length > 0) {
    return NextResponse.json({
      redirection: `/accords/${intention.aliments[0]}`,
      intention,
    });
  }

  return NextResponse.json({ fallback: true, intention });
}
