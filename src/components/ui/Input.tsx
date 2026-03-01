import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = "", ...rest }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-semibold text-[var(--color-text)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          {...rest}
          className={[
            "w-full px-4 py-3 rounded-lg border-[1.5px] bg-[var(--color-surface)] text-[var(--color-text)]",
            "text-[0.9375rem] font-[inherit] outline-none",
            "transition-all duration-200",
            "placeholder:text-[var(--color-text-muted)]",
            error
              ? "border-red-500 focus:shadow-[0_0_0_3px_rgba(229,57,53,0.12)]"
              : "border-[var(--color-border)] focus:border-[#ff5200] focus:shadow-[0_0_0_3px_rgba(255,82,0,0.12)]",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        />
        {error     && <p className="text-xs text-red-500">{error}</p>}
        {hint && !error && <p className="text-xs text-[var(--color-text-muted)]">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
