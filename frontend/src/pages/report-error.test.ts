import { describe, expect, it } from 'vitest';
import { reportFieldError } from './report-error';

describe('reportFieldError', () => {
  it('names both fields when both are empty', () => {
    expect(reportFieldError('  ', '')).toBe('Add the place and what happened.');
  });

  it('names only the place when that is the empty one', () => {
    expect(reportFieldError('', 'A pothole')).toBe('Add the place.');
  });

  it('names only what happened when that is the empty one', () => {
    expect(reportFieldError('Port road', '   ')).toBe('Add what happened.');
  });

  it('returns nothing when both fields have text', () => {
    expect(reportFieldError('Port road', 'A pothole')).toBe('');
  });
});
