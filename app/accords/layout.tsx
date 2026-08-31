import { BlocSanitaire } from "@/components/BlocSanitaire";

/**
 * Layout da rota /accords — injeta a menção sanitária (loi Évin, art. L3323-4)
 * em todas as páginas de harmonização, que recomendam vinhos. Obrigatório por
 * rota, nunca colado à mão.
 */
export default function LayoutAccords({
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
