import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "outline-light" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-[-0.005em] transition-[background-color,color,border-color,box-shadow,transform] duration-200 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Diagonal shine sweeps across on hover.
  primary:
    "relative overflow-hidden bg-copper-dark text-white shadow-soft hover:bg-copper-deep hover:shadow-lift active:translate-y-px after:pointer-events-none after:absolute after:inset-y-0 after:-left-3/4 after:w-1/2 after:skew-x-[-20deg] after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:transition-[left] after:duration-700 hover:after:left-[125%] motion-reduce:after:hidden",
  outline:
    "border border-ink/15 bg-surface text-ink hover:border-copper hover:text-copper-dark",
  "outline-light":
    "border border-white/25 text-white hover:border-copper-light hover:text-copper-light",
  light: "bg-white text-ink hover:bg-copper-soft",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

type StyleProps = {
  variant?: Variant;
  size?: Size;
  /** Adds a trailing arrow that nudges right on hover. */
  arrow?: boolean;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Pick<StyleProps, "variant" | "size" | "className">) {
  return cn(base, variants[variant], sizes[size], className);
}

function Inner({
  icon,
  arrow,
  children,
}: Pick<StyleProps, "icon" | "arrow" | "children">) {
  return (
    <>
      {icon}
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1 motion-reduce:transform-none"
        />
      )}
    </>
  );
}

type ButtonLinkProps = StyleProps &
  Omit<ComponentProps<"a">, "href" | "className" | "children"> & { href: string };

/** Link styled as a button. Internal paths use next/link; tel:, mailto: and http(s) use <a>. */
export function ButtonLink({
  href,
  variant,
  size,
  arrow,
  icon,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  const inner = (
    <Inner icon={icon} arrow={arrow}>
      {children}
    </Inner>
  );

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {inner}
    </a>
  );
}

type ButtonProps = StyleProps & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({
  variant,
  size,
  arrow,
  icon,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      <Inner icon={icon} arrow={arrow}>
        {children}
      </Inner>
    </button>
  );
}
