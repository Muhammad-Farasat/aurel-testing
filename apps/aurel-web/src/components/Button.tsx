import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { Icon } from "./Icon";
import "./Button.css";

type Variant = "primary" | "secondary" | "text" | "ink";

interface Common {
  variant?: Variant;
  arrow?: boolean;
  block?: boolean;
  children: ReactNode;
}

function cls(variant: Variant, block?: boolean, extra?: string) {
  return ["btn", `btn--${variant}`, block ? "btn--block" : "", extra ?? ""].filter(Boolean).join(" ");
}

export const Button = forwardRef<HTMLButtonElement, Common & ButtonHTMLAttributes<HTMLButtonElement>>(function Button(
  { variant = "secondary", arrow, block, children, className, type = "button", ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} className={cls(variant, block, className)} {...rest}>
      <span className="btn__label">{children}</span>
      {arrow ? <Icon name="arrow" size={20} className="btn__arrow" /> : null}
    </button>
  );
});

export function ButtonLink({ variant = "secondary", arrow, block, children, className, ...rest }: Common & LinkProps) {
  return (
    <Link className={cls(variant, block, className)} {...rest}>
      <span className="btn__label">{children}</span>
      {arrow ? <Icon name="arrow" size={20} className="btn__arrow" /> : null}
    </Link>
  );
}
