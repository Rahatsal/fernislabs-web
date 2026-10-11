import { html } from '../lib/html.mjs';
import { href } from '../lib/routes.mjs';
import { studio, ui } from '../site.mjs';
import { apps } from '../apps/index.mjs';
import { fernMark } from '../components/brand.mjs';
import { appTile } from '../components/app.mjs';

export const homePage = {
  path: (locale) => href(locale),
  render: (locale) => {
    const t = ui[locale];
    return {
      title: t.homeTitle,
      description: t.homeDescription,
      body: html`
      <section class="hero">
        ${fernMark({ size: 220, className: 'hero__mark', drawn: true })}
        <div class="hero__text">
          <h1>${t.heroTitle}</h1>
          <p class="lead">${t.heroLead}</p>
        </div>
      </section>

      <section class="section" id="apps" aria-labelledby="apps-title">
        <h2 id="apps-title">${t.appsTitle}</h2>
        <div class="app-grid">
          ${apps.map((app) => appTile(app, locale))}
          <div class="app-tile app-tile--next">${fernMark({ size: 40 })}<p>${t.nextApp}</p></div>
        </div>
      </section>

      <section class="section contact" id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">${t.contactTitle}</h2>
        <p>${t.contactLead}</p>
        <p class="contact__email"><a href="mailto:${studio.email}">${studio.email}</a></p>
        <p class="contact__where">${studio.name}, ${studio.city[locale]}</p>
      </section>`,
    };
  },
};
