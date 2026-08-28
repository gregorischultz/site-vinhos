import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carafe",
  description: "La bonne bouteille, sans se tromper.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
