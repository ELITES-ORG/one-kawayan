export type Scheme = 'light' | 'dark';

/** The home opens in the device theme. A later choice is stored on the document. */
export function schemeFromPreference(prefersDark: boolean): Scheme {
  return prefersDark ? 'dark' : 'light';
}
