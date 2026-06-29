import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { getTheme, toggleTheme } from "@/lib/theme";

/**
 * Small icon button that flips the app between dark and light themes.
 * Reads/writes localStorage via the theme controller.
 */
export default function ThemeToggle({ className = "" }) {
  const [theme, setThemeState] = useState(getTheme());

  // Keep in sync if the theme was changed elsewhere.
  useEffect(() => {
    setThemeState(getTheme());
  }, []);

  const onClick = () => setThemeState(toggleTheme());
  const isLight = theme === "light";

  return (
    <button
      type="button"
      data-testid="theme-toggle"
      onClick={onClick}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className={`grid place-items-center w-9 h-9 rounded-full jh-press ${className}`}
      style={{
        background: "var(--jh-surface-2)",
        border: "1px solid var(--jh-border-soft)",
      }}
    >
      {isLight ? (
        <Moon size={16} color="var(--jh-icon)" />
      ) : (
        <Sun size={16} color="var(--jh-icon)" />
      )}
    </button>
  );
}
