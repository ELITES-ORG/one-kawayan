import { describe, expect, it } from 'vitest';
import { splashCanLeave, splashHoldMs, splashLogoDelayMs } from './splash-timing';

describe('splashLogoDelayMs', () => {
  it('fades the logo in after the last letter of OneKawayan', () => {
    expect(splashLogoDelayMs('OneKawayan'.length)).toBe(605);
  });
});

describe('splashHoldMs', () => {
  it('stays at least 3 seconds even when the next screen is ready', () => {
    expect(splashHoldMs(false)).toBe(3000);
  });

  it('shortens the hold when motion is reduced', () => {
    expect(splashHoldMs(true)).toBe(200);
  });
});

describe('splashCanLeave', () => {
  const ready = { fontsReady: true, windowLoaded: true, elapsedMs: 900, holdMs: 900 };

  it('stays while fonts are still loading', () => {
    expect(splashCanLeave({ ...ready, fontsReady: false })).toBe(false);
  });

  it('stays while the window has not finished loading', () => {
    expect(splashCanLeave({ ...ready, windowLoaded: false })).toBe(false);
  });

  it('stays until the hold has elapsed', () => {
    expect(splashCanLeave({ ...ready, elapsedMs: 899 })).toBe(false);
  });

  it('leaves once the next screen is ready and the hold is over', () => {
    expect(splashCanLeave(ready)).toBe(true);
  });
});
