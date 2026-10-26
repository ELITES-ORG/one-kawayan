import { describe, expect, it } from 'vitest';
import { buttonStyles } from './button-styles';

describe('buttonStyles', () => {
  it('uses the primary fill token', () => {
    expect(buttonStyles({ variant: 'primary' })).toContain('bg-primary');
  });

  it('keeps rounded-full off a button', () => {
    expect(buttonStyles()).not.toContain('rounded-full');
  });

  it('puts a dark label on the gold fill', () => {
    expect(buttonStyles({ variant: 'accent' })).toContain('text-on-accent');
  });
});
