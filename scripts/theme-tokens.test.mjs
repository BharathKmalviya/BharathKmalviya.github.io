import {describe, expect, it} from 'vitest';
import {generateTokens} from './theme-tokens.mjs';

const SEED = '#3DDC84';
const HEX_PATTERN = /^#[0-9a-f]{6}$/i;

describe('generateTokens', () => {
  it('returns a hex value for every expected color role', () => {
    const tokens = generateTokens(SEED, false);
    expect(Object.keys(tokens).length).toBeGreaterThan(30);
    for (const value of Object.values(tokens)) {
      expect(value).toMatch(HEX_PATTERN);
    }
  });

  it('uses the --md-sys-color- prefix Material Web reads', () => {
    const tokens = generateTokens(SEED, false);
    for (const name of Object.keys(tokens)) {
      expect(name.startsWith('--md-sys-color-')).toBe(true);
    }
  });

  it('produces a different primary tone for dark mode', () => {
    const light = generateTokens(SEED, false);
    const dark = generateTokens(SEED, true);
    expect(light['--md-sys-color-primary']).not.toBe(dark['--md-sys-color-primary']);
  });

  it('is deterministic for the same seed and mode', () => {
    const first = generateTokens(SEED, false);
    const second = generateTokens(SEED, false);
    expect(first).toEqual(second);
  });
});
