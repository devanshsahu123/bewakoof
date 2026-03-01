"use client";

import { useTheme } from "@/store/themeStore";

export default function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="flex items-center"
    >
      {/* pill track */}
      <span
        className={`relative flex items-center w-[52px] h-[28px] rounded-full border-[1.5px]
                    p-[3px] transition-colors duration-300
                    ${isDark
                      ? "bg-[#1e1b4b] border-[#4c3fb5]"
                      : "bg-neutral-100 border-neutral-300"}`}
      >
        {/* thumb */}
        <span
          className={`absolute flex items-center justify-center w-[22px] h-[22px]
                      rounded-full text-[12px] shadow-sm bg-white
                      transition-all duration-[250ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                      ${isDark ? "left-[calc(100%-25px)] !bg-[#312e81]" : "left-[3px]"}`}
        >
          {isDark ? "🌙" : "☀️"}
        </span>
      </span>
    </button>
  );
}
