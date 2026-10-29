/** How often an open app looks for a deploy, without refetching the page itself. */
export const UPDATE_CHECK_MS = 5 * 60 * 1000;

/**
 * A newer build is on the server. An empty reply is a failed check, not a
 * different version, so a blip never asks the person to reload.
 */
export function updateIsReady(current: string, latest: string | null): boolean {
  if (latest === null) return false;
  const next = latest.trim();
  if (next === '' || current.trim() === '') return false;
  return next !== current.trim();
}

/** Ask while the app is on screen. Reload in the background so the next open is current. */
export function updateAction(ready: boolean, visible: boolean): 'none' | 'ask' | 'reload' {
  if (!ready) return 'none';
  return visible ? 'ask' : 'reload';
}

export async function latestBuildId(
  fetchId: (url: string, init: { cache: 'no-store' }) => Promise<Response> = fetch,
): Promise<string | null> {
  try {
    const response = await fetchId('/build-id.txt', { cache: 'no-store' });
    if (!response.ok) return null;
    const id = (await response.text()).trim();
    return id === '' ? null : id;
  } catch {
    return null;
  }
}

/** Load the page the server is publishing now. The HTML is not kept in cache. */
export function applyUpdate(): void {
  window.location.reload();
}
