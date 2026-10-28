import { describe, expect, it } from 'vitest';
import { themeBarSource } from './theme-bar';

describe('themeBarSource', () => {
  it('copies the splash while it covers the page', () => {
    expect(themeBarSource('splash', 'page')).toBe('splash');
  });

  it('copies the page once the splash is gone', () => {
    expect(themeBarSource(null, 'page')).toBe('page');
  });
});
