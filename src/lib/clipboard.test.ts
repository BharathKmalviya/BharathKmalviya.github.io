import {describe, expect, it, vi, beforeEach} from 'vitest';
import {copyText} from './clipboard';

describe('copyText', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns copied when clipboard.writeText resolves', async () => {
    vi.stubGlobal('navigator', {
      clipboard: {writeText: vi.fn().mockResolvedValue(undefined)},
    });
    await expect(copyText('a@b.com')).resolves.toBe('copied');
  });

  it('returns failed when clipboard is missing', async () => {
    vi.stubGlobal('navigator', {});
    await expect(copyText('a@b.com')).resolves.toBe('failed');
  });
});
