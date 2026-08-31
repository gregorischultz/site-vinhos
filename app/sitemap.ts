import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { chargerVinsPublies } from "@/lib/contenu";
import { listeAliments } from "@/lib/accords";
import { TYPES_VIN } from "@/lib/libelles";

/*
  Sitemap gerado no build a partir do corpus real (secção 11).
  Exclui /go/ (afiliação) e /kit (interno).
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (chemin: string) => `${SITE_URL}${chemin}`;

  const statiques = [
    "/",
    "/accords",
    "/recherche",
    "/methode",
    "/mentions-legales",
    "/politique-de-confidentialite",
    "/cookies",
    "/divulgation-affiliation",
    "/contact",
  ].map((c) => ({ url: u(c), lastModified: new Date() }));

  const types = TYPES_VIN.map((t) => ({
    url: u(`/vins/${t}`),
    lastModified: new Date(),
  }));

  const accords = listeAliments().map((a) => ({
    url: u(`/accords/${a.slug}`),
    lastModified: new Date(),
  }));

  const vins = chargerVinsPublies().map((v) => ({
    url: u(`/vin/${v.slug}`),
    lastModified: new Date(v.date_revision),
  }));

  return [...statiques, ...types, ...accords, ...vins];
}
