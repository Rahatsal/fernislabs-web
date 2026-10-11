import { html } from '../lib/html.mjs';
import { href } from '../lib/routes.mjs';
import { ui } from '../site.mjs';
import { fernMark } from '../components/brand.mjs';

// Rendered once, in the default locale, as /404.html (hosts serve it for unknown paths).
export const notFoundPage = {
  file: '404.html',
  render: (locale) => {
    const t = ui[locale];
    return {
      title: t.notFoundTitle,
      description: t.notFoundLead,
      body: html`
      <section class="page not-found">
        ${fernMark({ size: 72 })}
        <h1>${t.notFoundTitle}</h1>
        <p>${t.notFoundLead}</p>
        <p><a class="button" href="${href(locale)}">${t.notFoundCta}</a></p>
      </section>`,
    };
  },
};
