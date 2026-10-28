/** The splash sets this while it covers the page, so the phone bars copy it. */
export const THEME_BAR_ATTR = 'data-theme-bar';

/** The splash covers the page, so the bars follow it until the page is what you see. */
export function themeBarSource<T>(splash: T | null, page: T): T {
  return splash ?? page;
}

/**
 * Paint the phone's status bar and navigation bar with the colour on screen.
 * A theme-color tag that carries a media query follows the device, not the
 * in-app theme, so the page keeps a single tag with no media.
 */
export function syncThemeBar(doc: Document = document): void {
  const page = doc.body;
  if (!page) return;
  const splash = doc.querySelector(`[${THEME_BAR_ATTR}]`);
  const color = doc.defaultView?.getComputedStyle(themeBarSource(splash, page)).backgroundColor;
  if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') return;

  const metas = [...doc.head.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')];
  let meta = metas.find((node) => !node.media);
  if (!meta) {
    meta = doc.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    doc.head.appendChild(meta);
  }
  meta.setAttribute('content', color);
  meta.removeAttribute('media');
  for (const node of metas) {
    if (node !== meta) node.remove();
  }
}

/** Follow the device theme until the page stores its own choice. */
export function watchThemeBar(): () => void {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const onChange = () => {
    if (!document.documentElement.dataset.theme) syncThemeBar();
  };
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}
