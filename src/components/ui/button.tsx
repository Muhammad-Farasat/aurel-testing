import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium tracking-wide transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-gold text-midnight hover:bg-gold-soft",
        dark: "bg-midnight text-ivory hover:bg-charcoal",
        outline: "border border-midnight/20 text-midnight hover:border-midnight hover:bg-midnight/5",
        "outline-light": "border border-ivory/40 text-ivory hover:border-gold hover:text-gold",
        ghost: "text-midnight hover:bg-midnight/5",
        destructive: "bg-red-700 text-white hover:bg-red-800",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonStyles> & { className?: string };

type ButtonProps = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonLinkProps = ButtonBaseProps &
  React.ComponentPropsWithoutRef<typeof Link> & { href: string };

export function Button({ className, variant, size, href, ...props }: ButtonProps | ButtonLinkProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(buttonStyles({ variant, size }), className)}
        {...(props as Omit<React.ComponentPropsWithoutRef<typeof Link>, "href">)}
      />
    );
  }
  return (
    <button
      className={cn(buttonStyles({ variant, size }), className)}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}
