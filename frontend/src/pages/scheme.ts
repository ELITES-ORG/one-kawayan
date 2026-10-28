export type Scheme = 'light' | 'dark';

/** The home opens in the device theme. A later choice is stored on the document. */
export function schemeFromPreference(prefersDark: boolean): Scheme {
  return prefersDark ? 'dark' : 'light';
}

/**
 * The theme already on screen. A stored choice wins; otherwise the device
 * preference does. The toggle has to start here, or the first click repeats
 * the theme the page is already showing.
 */
export function initialScheme(stored: string | undefined, prefersDark: boolean): Scheme {
  if (stored === 'light' || stored === 'dark') return stored;
  return schemeFromPreference(prefersDark);
}
