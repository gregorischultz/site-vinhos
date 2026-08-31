import Link from "next/link";
import { BlocSanitaire } from "@/components/BlocSanitaire";

const liensLegaux = [
  { href: "/mentions-legales", libelle: "Mentions légales" },
  { href: "/politique-de-confidentialite", libelle: "Confidentialité" },
  { href: "/cookies", libelle: "Cookies" },
  { href: "/divulgation-affiliation", libelle: "Affiliation" },
  { href: "/contact", libelle: "Contact" },
];

/**
 * PiedLegal — rodapé com a menção sanitária (obrigatória em todas as páginas)
 * e as ligações legais.
 */
export function PiedLegal() {
  return (
    <footer className="border-t border-trait bg-papier">
      <div className="contenu py-10">
        <BlocSanitaire />
        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-corps text-sm">
          {liensLegaux.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-encre-doux hover:text-lie"
            >
              {l.libelle}
            </Link>
          ))}
        </nav>
        <p className="mt-6 font-donnees text-xs text-encre-doux">
          © {new Date().getFullYear()} Carafe — La bonne bouteille, sans se
          tromper.
        </p>
      </div>
    </footer>
  );
}
