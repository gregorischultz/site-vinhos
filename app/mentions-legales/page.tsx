import type { Metadata } from "next";
import { PageLegale } from "@/components/PageLegale";

export const metadata: Metadata = {
  title: "Mentions légales — Carafe",
  description: "Éditeur, hébergeur et informations légales du site Carafe.",
};

export default function MentionsLegales() {
  return (
    <PageLegale titre="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        Le présent site est édité par [À COMPLÉTER : nom / raison sociale],
        [À COMPLÉTER : statut juridique et capital le cas échéant], dont le siège
        est situé [À COMPLÉTER : adresse].
        <br />
        SIRET : [À COMPLÉTER]. Directeur de la publication : [À COMPLÉTER].
        <br />
        Contact : [À COMPLÉTER : adresse e-mail].
      </p>

      <h2>Hébergeur</h2>
      <p>
        Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
        91789, États-Unis — [À VÉRIFIER : coordonnées à jour de l&apos;hébergeur].
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus éditoriaux (textes, notations, fiches) est
        la propriété de l&apos;éditeur, sauf mention contraire. Toute
        reproduction sans autorisation est interdite.
      </p>

      <h2>Communication sur les boissons alcoolisées</h2>
      <p>
        Conformément à la loi Évin (Code de la santé publique, art. L.3323-2 et
        suivants), les contenus de ce site relatifs au vin ont un caractère
        strictement informatif et descriptif.
      </p>
      <p className="font-donnees text-sm uppercase tracking-wide text-encre-doux">
        L&apos;abus d&apos;alcool est dangereux pour la santé, à consommer avec
        modération.
      </p>

      <p className="font-donnees text-sm text-encre-doux">
        ⚠️ Ces mentions sont un modèle. Elles doivent être complétées et
        validées par un professionnel du droit avant mise en ligne.
      </p>
    </PageLegale>
  );
}
