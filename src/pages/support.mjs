import { html } from '../lib/html.mjs';
import { href } from '../lib/routes.mjs';
import { studio, ui } from '../site.mjs';
import { appLegalLinks } from '../components/app.mjs';
import { crumbs } from '../components/crumbs.mjs';

/** An app's support page: the Support URL required by App Store Connect. */
export const supportPage = (app) => ({
  path: (locale) => href(locale, app.slug, 'support'),
  render: (locale) => {
    const t = ui[locale];
    const subject = encodeURIComponent(`${app.name} ${t.support}`);
    return {
      title: `${t.support} | ${app.name}`,
      description: `${app.name}: ${t.faqTitle}`,
      body: html`
      <div class="page doc">
        ${crumbs(locale, [[app.name, href(locale, app.slug)], [t.support]])}
        <h1>${app.name} ${t.support}</h1>
        <div class="doc__grid">
          <div>
            <section class="contact-card">
              <p>${t.supportLead}</p>
              <p><a class="button" href="mailto:${studio.email}?subject=${subject}">${t.writeUs}</a></p>
              <p class="contact-card__email">${studio.email}</p>
            </section>
            <h2>${t.faqTitle}</h2>
            <div class="faq">
              ${app.copy[locale].faq.map(([q, a]) => html`
              <details>
                <summary>${q}</summary>
                <p>${a}</p>
              </details>`)}
            </div>
          </div>
          <aside class="doc__aside" aria-label="${app.name}">${appLegalLinks(app, locale, { current: 'support' })}</aside>
        </div>
      </div>`,
    };
  },
});
