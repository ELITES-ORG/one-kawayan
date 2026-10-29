import { useSyncExternalStore } from 'react';

/**
 * What the Install button can do on this device.
 *
 * - `installed`: already running as the installed app.
 * - `prompt`: the browser handed over its install prompt (Chrome, Edge, Android).
 * - `ios`: Safari has no install prompt; the person adds it from the Share sheet.
 * - `manual`: no prompt yet, or a browser without one; point at its own menu.
 */
export type InstallState = 'installed' | 'prompt' | 'ios' | 'manual';

export function installState({
  standalone,
  hasPrompt,
  ios,
}: {
  standalone: boolean;
  hasPrompt: boolean;
  ios: boolean;
}): InstallState {
  if (standalone) return 'installed';
  if (hasPrompt) return 'prompt';
  return ios ? 'ios' : 'manual';
}

/** iPhone and iPod, and iPadOS, which reports itself as a Mac with a touch screen. */
export function isIos(userAgent: string, maxTouchPoints: number): boolean {
  if (/iPhone|iPad|iPod/.test(userAgent)) return true;
  return /Macintosh/.test(userAgent) && maxTouchPoints > 1;
}

/** Chromium's install event. Not in the DOM typings because no standard defines it. */
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * The display modes the installed app opens in. The manifest asks for
 * fullscreen; a browser that cannot do that falls back to standalone.
 */
export const INSTALLED_DISPLAY = '(display-mode: fullscreen), (display-mode: standalone)';

let deferred: BeforeInstallPromptEvent | null = null;
let installedHere = false;
let snapshot: InstallState = 'manual';
const listeners = new Set<() => void>();

function refresh() {
  snapshot = installState({
    standalone:
      installedHere ||
      window.matchMedia(INSTALLED_DISPLAY).matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true,
    hasPrompt: deferred !== null,
    ios: isIos(navigator.userAgent, navigator.maxTouchPoints),
  });
  for (const listener of listeners) listener();
}

// Registered when the module loads, not when the card mounts: the browser can
// fire this before React has rendered, and it does not fire it twice.
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (event) => {
    // Our button replaces Chrome's own mini-infobar on Android.
    event.preventDefault();
    deferred = event as BeforeInstallPromptEvent;
    refresh();
  });
  window.addEventListener('appinstalled', () => {
    deferred = null;
    installedHere = true;
    refresh();
  });
  refresh();
}

/** Shows the browser's install dialog. A prompt can be used once, accepted or not. */
export async function promptInstall(): Promise<void> {
  const event = deferred;
  if (!event) return;
  deferred = null;
  await event.prompt();
  await event.userChoice;
  refresh();
}

export function useInstallState(): InstallState {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => snapshot,
  );
}
