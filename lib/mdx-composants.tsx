import type { ComponentPropsWithoutRef } from "react";

/**
 * Estilos aplicados ao corpo MDX das fichas e guias.
 * Mantém o registo editorial: texto legível, largura controlada.
 */
export const mdxComposants = {
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-4 max-w-[68ch] leading-7 text-encre" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-10 text-2xl text-lie" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 text-xl" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-4 list-disc space-y-1 pl-6 text-encre" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="text-lie underline hover:text-lie-clair" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold" {...props} />
  ),
};
