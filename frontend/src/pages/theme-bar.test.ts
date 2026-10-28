import { describe, expect, it } from 'vitest';
import { themeBarHex, themeBarHexFromPixel, themeBarSource } from './theme-bar';

describe('themeBarSource', () => {
  it('copies the splash while it covers the page', () => {
    expect(themeBarSource('splash', 'page')).toBe('splash');
  });

  it('copies the page once the splash is gone', () => {
    expect(themeBarSource(null, 'page')).toBe('page');
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
