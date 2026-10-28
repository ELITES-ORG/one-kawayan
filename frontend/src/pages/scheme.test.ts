import { describe, expect, it } from 'vitest';
import { initialScheme, schemeFromPreference } from './scheme';

describe('schemeFromPreference', () => {
  it('opens in dark when the device asks for dark', () => {
    expect(schemeFromPreference(true)).toBe('dark');
  });

  it('opens in light when the device asks for light', () => {
    expect(schemeFromPreference(false)).toBe('light');
  });
});

describe('initialScheme', () => {
  it('starts from dark when the device is dark and nothing is stored', () => {
    expect(initialScheme(undefined, true)).toBe('dark');
  });

  it('starts from light when the device is light and nothing is stored', () => {
    expect(initialScheme(undefined, false)).toBe('light');
  });

  it('keeps a stored choice over the device preference', () => {
    expect(initialScheme('light', true)).toBe('light');
    expect(initialScheme('dark', false)).toBe('dark');
  });
});
