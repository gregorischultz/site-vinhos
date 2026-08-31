import { NextResponse } from "next/server";
import { trouverOffreParId } from "@/lib/offres";

/*
  Redirection affiliée (secção 10). 302 vers l'URL marchand, jamais indexée.
  L'évènement GA4 `clic_affilie` est envoyé côté client avant la navigation
  (voir components/BoutonOffre.tsx).
*/
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const offre = trouverOffreParId(id);

  if (!offre) {
    return new NextResponse("Offre introuvable", { status: 404 });
  }

  const res = NextResponse.redirect(offre.url, 302);
  res.headers.set("X-Robots-Tag", "noindex");
  return res;
}
