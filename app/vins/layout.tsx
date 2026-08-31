import { BlocSanitaire } from "@/components/BlocSanitaire";

/**
 * Layout da rota /vins — injeta a menção sanitária (loi Évin, art. L3323-4) em
 * todas as páginas que listam vinhos. Obrigatório por rota, nunca colado à mão.
 */
export default function LayoutVins({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="contenu pb-10">
        <div className="border-t border-trait pt-4">
          <BlocSanitaire />
        </div>
      </div>
    </>
  );
}
