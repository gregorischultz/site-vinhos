import Link from "next/link";

const liens = [
  { href: "/vins/rouge-sec", libelle: "Vins" },
  { href: "/accords", libelle: "Accords" },
  { href: "/methode", libelle: "Méthode" },
  { href: "/recherche", libelle: "Recherche" },
];

/**
 * EnTete — cabeçalho de navegação, presente em todas as páginas.
 */
export function EnTete() {
  return (
    <header className="border-b border-trait bg-craie/90 backdrop-blur-sm">
      <div className="contenu flex items-center justify-between py-4">
        <Link href="/" className="font-titres text-2xl text-lie">
          Carafe
        </Link>
        <nav className="flex gap-6 font-corps text-base">
          {liens.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              className="text-encre hover:text-lie"
            >
              {lien.libelle}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
