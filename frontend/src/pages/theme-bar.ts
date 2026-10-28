/** The splash sets this while it covers the page, so the phone bars copy it. */
export const THEME_BAR_ATTR = 'data-theme-bar';

/** The splash covers the page, so the bars follow it until the page is what you see. */
export function themeBarSource<T>(splash: T | null, page: T): T {
  return splash ?? page;
}

/**
 * Android only accepts a hex colour for the status and navigation bars.
 * A computed background is oklch, and the phone ignores that, so the bars stay
 * the seal green baked in at install.
 */
export function themeBarHex(color: string): string | null {
  const text = color.trim();
  const hex = text.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  const rawHex = hex?.[1];
  if (rawHex) {
    const raw = rawHex.toLowerCase();
    const full = raw.length === 3 ? [...raw].map((channel) => channel + channel).join('') : raw;
    return `#${full}`;
  }

  const rgb = text.match(
    /^rgba?\(\s*([0-9.]+)[,\s]+([0-9.]+)[,\s]+([0-9.]+)(?:\s*[,/]\s*([0-9.]+%?))?\s*\)$/i,
  );
  const redChannel = rgb?.[1];
  const greenChannel = rgb?.[2];
  const blueChannel = rgb?.[3];
  const alphaChannel = rgb?.[4];
  if (!rgb || redChannel === undefined || greenChannel === undefined || blueChannel === undefined) return null;
  if (alphaChannel !== undefined && alphaChannel !== '1' && alphaChannel !== '100%') return null;

  const bytes = [redChannel, greenChannel, blueChannel].map((channel) => Math.round(Number(channel)));
  if (bytes.some((channel) => Number.isNaN(channel) || channel < 0 || channel > 255)) return null;
  return `#${bytes.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
}

/** The 1×1 pixel Android can paint, read back from a canvas that understands oklch. */
export function themeBarHexFromPixel(
  red: number,
  green: number,
  blue: number,
  alpha: number,
): string | null {
  if (alpha !== 255) return null;
  return themeBarHex(`rgb(${red}, ${green}, ${blue})`);
}

function themeBarHexFromCanvas(doc: Document, color: string): string | null {
  const canvas = doc.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext('2d');
  if (!context) return null;

  const sentinel = '#010101';
  context.fillStyle = sentinel;
  context.fillStyle = color;
  const accepted = String(context.fillStyle).toLowerCase();
  if (accepted === sentinel && color.trim().toLowerCase() !== sentinel) return null;

  context.clearRect(0, 0, 1, 1);
  context.fillRect(0, 0, 1, 1);
  const pixel = context.getImageData(0, 0, 1, 1).data;
  const red = pixel[0];
  const green = pixel[1];
  const blue = pixel[2];
  const alpha = pixel[3];
  if (red === undefined || green === undefined || blue === undefined || alpha === undefined) return null;
  return themeBarHexFromPixel(red, green, blue, alpha);
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
  const hex = color ? (themeBarHex(color) ?? themeBarHexFromCanvas(doc, color)) : null;
  if (!hex) return;

  const metas = [...doc.head.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')];
  let meta = metas.find((node) => !node.media);
  if (!meta) {
    meta = doc.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    doc.head.appendChild(meta);
  }
  meta.setAttribute('content', hex);
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
