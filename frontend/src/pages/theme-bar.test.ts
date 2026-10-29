import { describe, expect, it } from 'vitest';
import { bannerUnderStatusBar, themeBarHex, themeBarHexFromPixel, themeBarTarget } from './theme-bar';

describe('themeBarTarget', () => {
  it('copies the splash while it covers the page', () => {
    expect(themeBarTarget('splash', 'banner', 'page')).toBe('splash');
  });

  it('copies the banner on the home screen, ahead of the page theme', () => {
    expect(themeBarTarget(null, 'banner', 'page')).toBe('banner');
  });

  it('copies the page on a screen with no banner', () => {
    expect(themeBarTarget(null, null, 'page')).toBe('page');
  });
});

describe('bannerUnderStatusBar', () => {
  it('meets the status bar at the top of the page', () => {
    expect(bannerUnderStatusBar(0, 320)).toBe(true);
  });

  it('meets the status bar while part of it is scrolled away', () => {
    expect(bannerUnderStatusBar(-200, 120)).toBe(true);
  });

  it('leaves the status bar once it has scrolled away', () => {
    expect(bannerUnderStatusBar(-320, 0)).toBe(false);
  });

  it('does not meet the status bar when it starts lower on the page', () => {
    expect(bannerUnderStatusBar(48, 368)).toBe(false);
  });
});

describe('themeBarHex', () => {
  it('keeps a hex colour the phone can paint', () => {
    expect(themeBarHex('#0F452B')).toBe('#0f452b');
    expect(themeBarHex('#abc')).toBe('#aabbcc');
  });

  it('turns rgb into hex', () => {
    expect(themeBarHex('rgb(15, 69, 43)')).toBe('#0f452b');
    expect(themeBarHex('rgb(15 69 43)')).toBe('#0f452b');
    expect(themeBarHex('rgba(15, 69, 43, 1)')).toBe('#0f452b');
  });

  it('rejects a colour the phone ignores', () => {
    expect(themeBarHex('oklch(0.2 0.025 158)')).toBeNull();
    expect(themeBarHex('transparent')).toBeNull();
    expect(themeBarHex('rgba(15, 69, 43, 0)')).toBeNull();
  });
});

describe('themeBarHexFromPixel', () => {
  it('turns an opaque pixel into the dark page colour', () => {
    expect(themeBarHexFromPixel(12, 26, 18, 255)).toBe('#0c1a12');
  });

  it('ignores a transparent pixel', () => {
    expect(themeBarHexFromPixel(12, 26, 18, 0)).toBeNull();
  });
});
