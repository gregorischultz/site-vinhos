/**
 * Etoiles — nota QPR de 0 a 5, em estrelas cheias/vazias.
 */
export function Etoiles({ note }: { note: number }) {
  const pleines = "★".repeat(note);
  const vides = "☆".repeat(Math.max(0, 5 - note));
  return (
    <span
      className="font-donnees text-lie"
      aria-label={`${note} étoiles sur 5`}
      role="img"
    >
      {pleines}
      <span className="text-trait">{vides}</span>
    </span>
  );
}
