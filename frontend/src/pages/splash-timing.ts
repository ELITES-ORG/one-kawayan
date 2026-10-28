/** Matches the letter stagger on `.splash-name` in motion.css. */
const SPLASH_LETTER_STAGGER_MS = 45;
/** Matches `--duration-base`, the length of each letter's rise. */
const SPLASH_LETTER_MS = 200;

/** The logo fades in once the last letter has landed. */
export function splashLogoDelayMs(letterCount: number): number {
  const last = Math.max(0, letterCount - 1);
  return last * SPLASH_LETTER_STAGGER_MS + SPLASH_LETTER_MS;
}

/** How long the splash stays once the next screen can paint, so the name and logo can finish. */
export function splashHoldMs(reducedMotion: boolean): number {
  return reducedMotion ? 200 : 1200;
}

/**
 * The splash leaves only after fonts and the window are ready and the name
 * has had its hold. A fast cache still shows the screen; a slow one waits.
 */
export function splashCanLeave(input: {
  fontsReady: boolean;
  windowLoaded: boolean;
  elapsedMs: number;
  holdMs: number;
}): boolean {
  return input.fontsReady && input.windowLoaded && input.elapsedMs >= input.holdMs;
}
