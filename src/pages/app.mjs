import { html } from '../lib/html.mjs';
import { href } from '../lib/routes.mjs';
import { ui } from '../site.mjs';
import { appIcon, appLegalLinks, appThemeStyle, storeButtons } from '../components/app.mjs';
import { crumbs } from '../components/crumbs.mjs';

/** The landing page of one app: what it does, plans, privacy summary and links. */
export const appPage = (app) => ({
  path: (locale) => href(locale, app.slug),
  render: (locale) => {
    const t = ui[locale];
    const copy = app.copy[locale];
    return {
      title: `${app.name}: ${copy.tagline}`,
      description: copy.description,
      theme: app.theme.bg,
      body: html`
      <section class="app-hero" style="${appThemeStyle(app)}">
        <div class="app-hero__inner">
          ${crumbs(locale, [[app.name]])}
          <div class="app-hero__id">
            ${appIcon(app, 112)}
            <div>
              <h1>${app.name}</h1>
              <p class="app-hero__tagline">${copy.tagline}</p>
            </div>
          </div>
          <p class="lead">${copy.summary}</p>
          ${storeButtons(app, locale)}
        </div>
      </section>

      <div class="page">
        <section class="section" aria-labelledby="features">
          <h2 id="features">${t.whatItDoes}</h2>
          <dl class="features">
            ${copy.features.map(([name, text]) => html`<div><dt>${name}</dt><dd>${text}</dd></div>`)}
          </dl>
        </section>

        <section class="section" aria-labelledby="plans">
          <h2 id="plans">${t.plansTitle}</h2>
          <dl class="plans">
            ${copy.plans.map(([name, text]) => html`<div><dt>${name}</dt><dd>${text}</dd></div>`)}
          </dl>
        </section>

        <section class="section" aria-labelledby="privacy">
          <h2 id="privacy">${t.privacyGlance}</h2>
          <ul class="checks">${copy.privacy.map((line) => html`<li>${line}</li>`)}</ul>
          <p><a href="${href(locale, app.slug, 'privacy')}">${t.readPolicy}</a></p>
        </section>

        <p class="notice">${copy.notice}</p>

        <section class="section" aria-labelledby="legal">
          <h2 id="legal">${t.legalTitle}</h2>
          ${appLegalLinks(app, locale)}
        </section>
      </div>`,
    };
  },
});
