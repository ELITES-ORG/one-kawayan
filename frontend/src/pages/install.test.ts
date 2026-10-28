import { describe, expect, it } from 'vitest';
import { installState, isIos } from './install';

describe('installState', () => {
  it('is installed when running as the installed app, even with a prompt', () => {
    expect(installState({ standalone: true, hasPrompt: true, ios: false })).toBe('installed');
    expect(installState({ standalone: true, hasPrompt: false, ios: true })).toBe('installed');
  });

  it('uses the browser prompt when one was handed over', () => {
    expect(installState({ standalone: false, hasPrompt: true, ios: false })).toBe('prompt');
  });

  it('points iPhone at the Share sheet, which has no prompt', () => {
    expect(installState({ standalone: false, hasPrompt: false, ios: true })).toBe('ios');
  });

  it('points at the browser menu when there is no prompt', () => {
    expect(installState({ standalone: false, hasPrompt: false, ios: false })).toBe('manual');
  });
});

describe('isIos', () => {
  const iphone =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
  const mac =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15';
  const android =
    'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36';

  it('recognises an iPhone', () => {
    expect(isIos(iphone, 5)).toBe(true);
  });

  it('recognises an iPad, which reports itself as a Mac with touch', () => {
    expect(isIos(mac, 5)).toBe(true);
  });

  it('does not mistake a Mac without touch for an iPad', () => {
    expect(isIos(mac, 0)).toBe(false);
  });

  it('does not treat Android as iOS', () => {
    expect(isIos(android, 5)).toBe(false);
  });
});
