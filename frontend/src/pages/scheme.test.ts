import { describe, expect, it } from 'vitest';
import { schemeFromPreference } from './scheme';

describe('schemeFromPreference', () => {
  it('opens in dark when the device asks for dark', () => {
    expect(schemeFromPreference(true)).toBe('dark');
  });

  it('opens in light when the device asks for light', () => {
    expect(schemeFromPreference(false)).toBe('light');
  });
});
