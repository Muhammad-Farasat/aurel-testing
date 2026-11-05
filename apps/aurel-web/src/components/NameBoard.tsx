import type { ReactNode } from "react";
import "./NameBoard.css";

/**
 * Signature device 1: the arrivals name board. A plain rectangle with a 2px ink
 * border. `draw` animates the border in once (420ms) on first render.
 */
export function NameBoard({
  children,
  draw = false,
  size = "md",
  className,
}: {
  children: ReactNode;
  draw?: boolean;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <div className={["nameboard", `nameboard--${size}`, draw ? "nameboard--draw" : "", className ?? ""].filter(Boolean).join(" ")}>
      <span className="nameboard__edge" aria-hidden="true" />
      {children}
    </div>
  );
}

/** A name set as it appears on the board. */
export function BoardName({ name, placeholder = "YOUR NAME" }: { name: string; placeholder?: string }) {
  const text = name.trim() ? name.trim().toUpperCase() : placeholder;
  return <span className={["t-board", "nameboard__name", name.trim() ? "" : "is-empty"].join(" ")}>{text}</span>;
}
