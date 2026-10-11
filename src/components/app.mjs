import { html } from '../lib/html.mjs';
import { href } from '../lib/routes.mjs';
import { ui } from '../site.mjs';

const STORES = [
  ['appStore', 'App Store'],
  ['googlePlay', 'Google Play'],
];

/** Inline custom properties that paint an element in the app's own colours. */
export const appThemeStyle = ({ theme }) =>
  `--app-bg:${theme.bg};--app-raised:${theme.raised};--app-text:${theme.text};--app-muted:${theme.muted};--app-accent:${theme.accent}`;

export const appIcon = (app, size = 64) =>
  html`<img class="app-icon" src="${app.icon}" width="${size}" height="${size}" alt="" decoding="async">`;

/** Store buttons; a store without a URL yet shows as "coming soon". */
export const storeButtons = (app, locale) => {
  const t = ui[locale];
  return html`
  <div class="stores">
    ${STORES.map(([key, label]) => {
      const url = app.stores[key];
      return url
        ? html`<a class="store" href="${url}" rel="noopener"><small>${t.getOn}</small><span>${label}</span></a>`
        : html`<span class="store store--soon"><small>${t.soonOn}</small><span>${label}</span></span>`;
    })}
  </div>`;
};

/** The links every app must have reachable from the web: support and legal texts. */
export const appLegalLinks = (app, locale, { current } = {}) => {
  const t = ui[locale];
  const links = [
    ['support', t.support],
    ...app.docs.map((doc) => [doc, app.copy[locale].docTitles[doc]]),
  ];
  return html`
  <ul class="doc-links">
    ${links.map(([slug, label]) => html`
    <li><a href="${href(locale, app.slug, slug)}"${slug === current ? html` aria-current="page"` : ''}>${label}</a></li>`)}
  </ul>`;
};

/** The app's tile on the studio home page. */
export const appTile = (app, locale) => {
  const copy = app.copy[locale];
  return html`
  <article class="app-tile" style="${appThemeStyle(app)}">
    <a class="app-tile__head" href="${href(locale, app.slug)}">
      ${appIcon(app, 72)}
      <span>
        <h3>${app.name}</h3>
        <span class="app-tile__tagline">${copy.tagline}</span>
      </span>
    </a>
    <p>${copy.summary}</p>
    ${storeButtons(app, locale)}
    ${appLegalLinks(app, locale)}
  </article>`;
};
