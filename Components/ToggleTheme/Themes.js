// define colors
export const backgroundColors = [
  { theme: 'light', color: '#363742' },
  { theme: 'dark', color: '#292C35' },
];

export const fontPrimary = [
  { theme: 'light', color: 'black' },
  { theme: 'dark', color: 'white' },
];

export const fontSecondary = [
  { theme: 'light', color: '#C5D57F' },
  { theme: 'dark', color: '#a2f1ffff' },
];

export const secondaryColors = [
  { theme: 'light', color: '#EAE8E2' },
  { theme: 'dark', color: '#363742' },
];

export const thirdColors = [
  { theme: 'light', color: '#C5D57F' },
  { theme: 'dark', color: '#292C35' },
];

export const footerColors = [
  { theme: 'light', color: '#EAE8E2' },
  { theme: 'dark', color: '#363742' },
];

// default theme
export const defaultTheme = 'light';

/**
 * @param {string} theme - Current theme (e.g., 'light' or 'dark').
 * @param {Array} colorArray - Array of theme-color mappings.
 * @returns {string} - The color value or a fallback color.
 */
export function getThemeColor(theme, colorArray) {
  const colorMapping = colorArray.find(item => item.theme === theme);
  return colorMapping ? colorMapping.color : getThemeColor(defaultTheme, colorArray);
}

/**
 * Update the CSS variables in the :root selector dynamically.
 * @param {string} theme - Current theme (e.g., 'light' or 'dark').
 */
export function updateCSSVariables(theme) {
  document.documentElement.style.setProperty('--background-color', getThemeColor(theme, backgroundColors));
  document.documentElement.style.setProperty('--font-primary', getThemeColor(theme, fontPrimary));
  document.documentElement.style.setProperty('--secondary-color', getThemeColor(theme, secondaryColors));
  document.documentElement.style.setProperty('--third-color', getThemeColor(theme, thirdColors));
  document.documentElement.style.setProperty('--footer-color', getThemeColor(theme, footerColors));
  document.documentElement.style.setProperty('--font-secondary', getThemeColor(theme, fontSecondary));
}

/**
 * @param {string} theme - Theme to validate.
 * @returns {boolean} - Returns true if the theme is valid.
 */
export function isValidTheme(theme) {
  const validThemes = [...backgroundColors, ...fontPrimary, ...secondaryColors, ...thirdColors, ...footerColors, ...fontSecondary].map(item => item.theme);
  return validThemes.includes(theme);
}


export const themes = {
  backgroundColors,
  fontPrimary,
  fontSecondary,
  secondaryColors,
  thirdColors,
  footerColors,
  defaultTheme,
};
