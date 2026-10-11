import { html } from '../lib/html.mjs';
import { href } from '../lib/routes.mjs';
import { studio, ui } from '../site.mjs';

/**
 * Breadcrumb trail that starts at the studio home.
 * `trail` is a list of [label, url]; the last item is the current page and has no url.
 */
export const crumbs = (locale, trail) => html`
  <nav class="crumbs" aria-label="${ui[locale].breadcrumb}">
    <ol>
      <li><a href="${href(locale)}">${studio.name}</a></li>
      ${trail.map(([label, url]) =>
        url ? html`<li><a href="${url}">${label}</a></li>` : html`<li aria-current="page">${label}</li>`,
      )}
    </ol>
  </nav>`;
