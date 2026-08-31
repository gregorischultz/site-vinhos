/**
 * URL de base do site. Em produção, definir NEXT_PUBLIC_SITE_URL na Vercel
 * (ex.: https://carafe.fr). Em local, usa localhost.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const SITE_NOM = "Carafe";
export const SITE_BASELINE = "La bonne bouteille, sans se tromper.";
