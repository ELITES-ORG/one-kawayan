import { describe, expect, it } from 'vitest';
import { latestBuildId, updateAction, updateIsReady } from './app-update';

describe('updateIsReady', () => {
  it('notices a build that is not the one on screen', () => {
    expect(updateIsReady('aaa', 'bbb')).toBe(true);
  });

  it('stays quiet when the server is still serving this build', () => {
    expect(updateIsReady('aaa', 'aaa')).toBe(false);
    expect(updateIsReady('aaa', '  aaa  ')).toBe(false);
  });

  it('ignores a failed or empty check', () => {
    expect(updateIsReady('aaa', null)).toBe(false);
    expect(updateIsReady('aaa', '')).toBe(false);
    expect(updateIsReady('aaa', '   ')).toBe(false);
    expect(updateIsReady('', 'bbb')).toBe(false);
  });
});

describe('updateAction', () => {
  it('asks when the person is looking at the app', () => {
    expect(updateAction(true, true)).toBe('ask');
  });

  it('reloads in the background', () => {
    expect(updateAction(true, false)).toBe('reload');
  });

  it('does nothing when there is no newer build', () => {
    expect(updateAction(false, true)).toBe('none');
    expect(updateAction(false, false)).toBe('none');
  });
});

describe('latestBuildId', () => {
  it('reads the id the server published', async () => {
    const fetchId = async () => new Response('abc123\n');
    await expect(latestBuildId(fetchId)).resolves.toBe('abc123');
  });

  it('ignores a missing file', async () => {
    const fetchId = async () => new Response('', { status: 404 });
    await expect(latestBuildId(fetchId)).resolves.toBeNull();
  });

  it('ignores a network failure', async () => {
    const fetchId = async () => {
      throw new Error('offline');
    };
    await expect(latestBuildId(fetchId)).resolves.toBeNull();
  });
});
