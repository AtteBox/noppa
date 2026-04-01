const THEME_STORAGE_KEY = "noppa-theme";

export type Theme = "light" | "dark";

function detectTheme(): Theme {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === "light" || saved === "dark") {
    return saved;
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

let currentTheme: Theme = $state(detectTheme());

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute(
      "content",
      theme === "dark" ? "#242424" : "#ffffff",
    );
  }
}

// Apply on load
applyTheme(currentTheme);

export function getTheme(): Theme {
  return currentTheme;
}

export function setTheme(theme: Theme) {
  currentTheme = theme;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyTheme(theme);
}

export function toggleTheme() {
  setTheme(currentTheme === "dark" ? "light" : "dark");
}
