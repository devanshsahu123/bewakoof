import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full border-2 border-transparent cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary: "bg-[#ff5200] text-white border-[#ff5200] hover:bg-[#cc4100] hover:border-[#cc4100] hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(255,82,0,0.35)]",
  outline: "bg-transparent text-[#ff5200] border-[#ff5200] hover:bg-[#ff5200] hover:text-white hover:-translate-y-px",
  ghost:   "bg-transparent text-neutral-800 border-transparent hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-1.5 text-[0.8125rem]",
  md: "px-6 py-2.5 text-[0.9375rem]",
  lg: "px-9 py-3.5 text-[1.0625rem]",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="w-[1em] h-[1em] border-2 border-white/40 border-t-white rounded-full animate-spin flex-shrink-0"
        />
      )}
      {children}
    </button>
  );
}
