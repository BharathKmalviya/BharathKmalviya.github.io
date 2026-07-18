import {devices} from '@playwright/test';

/** Playwright's `test.use()` inside a describe block rejects `defaultBrowserType`. */
export function touchDevice(name: keyof typeof devices) {
  const {defaultBrowserType, ...rest} = devices[name];
  void defaultBrowserType;
  return rest;
}
