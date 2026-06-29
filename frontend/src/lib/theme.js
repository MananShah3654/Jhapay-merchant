// Theme controller — dark is the default; light is opt-in via [data-theme="light"].
const STORAGE_KEY = "jh-theme";

export function getTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function applyTheme(theme) {
  const el = document.documentElement;
  if (theme === "light") el.setAttribute("data-theme", "light");
  else el.removeAttribute("data-theme");
}

export function setTheme(theme) {
  const t = theme === "light" ? "light" : "dark";
  try {
    localStorage.setItem(STORAGE_KEY, t);
  } catch {
    /* ignore */
  }
  applyTheme(t);
  return t;
}

export function toggleTheme() {
  return setTheme(getTheme() === "light" ? "dark" : "light");
}

// Apply the stored theme as early as possible to avoid a flash.
export function initTheme() {
  applyTheme(getTheme());
}
