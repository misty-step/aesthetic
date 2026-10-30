// Release notes: Landmark's changelog page, its aesthetic screen shell and CHANGELOG.md as the live site renders them.
// The footer's GitHub glyph is a third-party logo, so its accessible name stands as a text link.
import { esc } from '../../html';
import * as L from '../content/landmark';
import { icon } from '../icons';

const slug = (version: string) => `v${version.replaceAll('.', '-')}`;

export function render(): string {
  const nav = L.NAV.map(([label, href]) => `<a href="${new URL(href, L.SITE).href}"${label === 'changelog' ? ' aria-current="page"' : ''}>${esc(label)}</a>`).join('<span class="cl-sep" aria-hidden="true">·</span>');
  const releases = L.RELEASES.map(r => `<section class="cl-release" aria-labelledby="${slug(r.version)}">
  <h2 id="${slug(r.version)}"><a class="sp-link" href="${r.href}">${esc(r.version)}</a><span class="cl-date">(${esc(r.date)})</span></h2>
  ${r.sections.map(s => `<h3>${esc(s.title)}</h3><ul>${s.items.map(i => `<li>${i.scope ? `<strong>${esc(i.scope)}:</strong> ` : ''}${esc(i.text)} (<a class="sp-link cl-commit" href="${i.href}">${esc(i.commit)}</a>)</li>`).join('')}</ul>`).join('')}
</section>`).join('\n');
  return `<div class="cl">
<header class="cl-bar">
  <a class="cl-logo" href="${L.SITE}" aria-label="Landmark home"><span class="cl-mark" aria-hidden="true">${icon('signpost')}</span><span class="cl-name">Landmark</span></a>
  <nav class="cl-nav" aria-label="Site">${nav}</nav>
</header>
<main class="cl-stage" id="main" tabindex="-1">
  <article class="cl-page" aria-labelledby="release-notes-title">
    <h1 id="release-notes-title">${esc(L.TITLE)}</h1>
    <p class="cl-lede">${L.LEDE_HTML}</p>
    <div class="cl-releases">${releases}</div>
  </article>
</main>
<footer class="cl-bar">
  <button class="sp-button sp-quiet sp-icon-only cl-mode" type="button" aria-label="toggle color mode">${icon('sun', 'cl-sun')}${icon('moon', 'cl-moon')}</button>
  <p class="cl-credit">${esc(L.CREDIT.before)} <a class="sp-link" href="${L.CREDIT.href}">${esc(L.CREDIT.name)}</a> ${esc(L.CREDIT.after)} <a class="sp-link" href="https://github.com/misty-step/landmark">${esc(L.CREDIT.github)}</a></p>
</footer>
</div>`;
}

export function mount() {
  document.querySelector('.cl-mode')?.addEventListener('click', () => {
    const root = document.documentElement;
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  });
}
