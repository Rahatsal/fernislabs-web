import { readFileSync } from 'node:fs';
import { html, raw } from '../lib/html.mjs';
import { href } from '../lib/routes.mjs';
import { studio, ui } from '../site.mjs';
import { appLegalLinks } from '../components/app.mjs';
import { crumbs } from '../components/crumbs.mjs';

const CONTENT_DIR = new URL('../../content/', import.meta.url);

/** Reads a legal text fragment: content/<scope>/<doc>.<locale>.html */
const readDoc = (scope, doc, locale) => readFileSync(new URL(`${scope}/${doc}.${locale}.html`, CONTENT_DIR), 'utf8');

const formatDate = (iso, locale) =>
  new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));

const docBody = ({ locale, trail, title, updated, content, aside }) => html`
  <div class="page doc">
    ${crumbs(locale, trail)}
    <h1>${title}</h1>
    <p class="doc__updated">${ui[locale].updated}: <time datetime="${updated}">${formatDate(updated, locale)}</time></p>
    <div class="doc__grid">
      <article class="prose">${raw(content)}</article>
      ${aside}
    </div>
  </div>`;

/** One of an app's legal texts (privacy, terms, delete-account). */
export const appDocPage = (app, doc) => ({
  path: (locale) => href(locale, app.slug, doc),
  render: (locale) => {
    const title = app.copy[locale].docTitles[doc];
    return {
      title: `${title} | ${app.name}`,
      description: `${app.name} ${title} (${studio.name})`,
      body: docBody({
        locale,
        trail: [[app.name, href(locale, app.slug)], [title]],
        title,
        updated: app.legalUpdated,
        content: readDoc(app.slug, doc, locale),
        aside: html`<aside class="doc__aside" aria-label="${app.name}">${appLegalLinks(app, locale, { current: doc })}</aside>`,
      }),
    };
  },
});

/** The privacy notice of the website itself. */
export const sitePrivacyPage = {
  updated: '2026-10-11',
  path: (locale) => href(locale, 'privacy'),
  render(locale) {
    const title = ui[locale].sitePrivacy;
    return {
      title: `${title} | ${studio.name}`,
      description: `${studio.name}: ${title}`,
      body: docBody({
        locale,
        trail: [[title]],
        title,
        updated: this.updated,
        content: readDoc('site', 'privacy', locale),
        aside: null,
      }),
    };
  },
};
