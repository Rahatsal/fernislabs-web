// URL scheme: Turkish lives at the root, every other locale under /<locale>/.
// Every page is a folder with an index.html, so URLs end with a slash on any host.

export const LOCALES = ['tr', 'en'];
export const DEFAULT_LOCALE = 'tr';
export const ORIGIN = 'https://fernislabs.com';

/** Site-relative URL of a page, e.g. href('en', 'sinyal', 'privacy') → /en/sinyal/privacy/ */
export const href = (locale, ...segments) => {
  const parts = locale === DEFAULT_LOCALE ? segments : [locale, ...segments];
  return parts.length ? `/${parts.join('/')}/` : '/';
};

export const absolute = (path) => ORIGIN + path;

/** Output file for a page path: /en/sinyal/ → en/sinyal/index.html */
export const outputFile = (path) => `${path.replace(/^\//, '')}index.html`;
