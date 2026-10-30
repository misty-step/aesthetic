// Docs: skills/misty/SKILL.md inside stack.mistystep.io's docs chrome, as the live site renders it. The lockup is
// the Locked mark module's own drawing.
import type { MarkOption } from '../../contract';
import { esc } from '../../html';
import { loadOption } from '../../options';
import { LOCKED } from '../locked';
import * as M from '../content/misty';

const STACK = 'https://stack.mistystep.io';
const abs = (href: string) => new URL(href, STACK).href;
const TOGGLE = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor"/></svg>';
const SHORT = M.SHA.slice(0, 7);

const docsNav = () => `<nav aria-label="Documentation navigation"><ul role="list">${M.DOCS_NAV.map(([label, href]) => `<li><a href="${abs(href)}">${esc(label)}</a></li>`).join('')}</ul><p>${esc(M.GROUP)}</p><ul role="list"><li><a href="${M.PAGE_URL}" aria-current="page">${esc(M.TITLE)}</a></li></ul></nav>`;
const toc = () => `<nav aria-label="On this page"><ul role="list">${M.TOC.map(([id, label]) => `<li data-depth="2"><a href="#${id}">${esc(label)}</a></li>`).join('')}</ul></nav>`;
const related = (title: string, links: [string, string][]) => `<section class="docs-related"><h2>${esc(title)}</h2><ul>${links.map(([label, href]) => `<li><a class="sp-link" href="${href}">${esc(label)}</a></li>`).join('')}</ul></section>`;

export async function render(): Promise<string> {
  const mark = await loadOption('mark', LOCKED.mark) as MarkOption & { css?: string };
  document.documentElement.dataset.mark = mark.id;
  document.head.append(Object.assign(document.createElement('style'), { textContent: mark.css ?? '' }));
  const brand = 'MISTYSTACK';
  return `<div class="docs" id="top">
<a class="sp-skip" href="#main">Skip to content</a>
<header class="docs-nav">
  <a class="brand" href="${STACK}/" aria-label="mistystack home"><span class="brand-mark">${mark.svg({ size: 32, title: brand })}</span><span class="brand-name">${mark.wordmark?.({ name: brand }) ?? esc(brand)}</span></a>
  <nav class="docs-links" aria-label="Primary">${M.NAV.map(([label, href]) => `<a href="${abs(href)}"${href === '/library/' ? ' aria-current="page"' : ''}>${esc(label)}</a>`).join('')}</nav>
  <div class="docs-actions">
    <button class="sp-button sp-quiet sp-icon-only" type="button" aria-label="Switch colour theme" data-theme-toggle>${TOGGLE}</button>
    <a class="sp-link docs-install" href="${abs('/install/')}">Install</a>
    <details class="docs-menu"><summary>Menu</summary><nav aria-label="Menu"><ul>${M.MENU.map(([label, href]) => `<li><a href="${abs(href)}"${href === '/library/' ? ' aria-current="page"' : ''}>${esc(label)}</a></li>`).join('')}</ul></nav></details>
  </div>
</header>
<main id="main" tabindex="-1">
  <div class="docs-shell">
    <aside class="docs-sidebar">${docsNav()}</aside>
    <article class="docs-content">
      <nav class="docs-crumbs" aria-label="Breadcrumb"><a class="sp-link" href="${STACK}/">Home</a> / <a class="sp-link" href="${abs('/library/')}">${esc(M.GROUP)}</a></nav>
      <details class="docs-browse"><summary>Browse documentation</summary>${docsNav()}</details>
      <header class="docs-header"><h1 id="misty">${esc(M.TITLE)}<a class="heading-anchor" href="#misty" aria-label="Link to ${esc(M.TITLE)}">#</a></h1><p>${esc(M.PREVENTS)}</p></header>
      <section class="docs-meta" aria-label="Skill metadata"><dl>${M.METADATA.map(([term, html]) => `<dt>${esc(term)}</dt><dd>${html}</dd>`).join('')}</dl></section>
      <div class="docs-provenance"><p><code class="sp-code-inline">skills/misty/SKILL.md</code></p><a class="sp-link" href="${M.SOURCE}">Source at <code class="sp-code-inline">${SHORT}</code></a> · <a class="sp-link" href="https://github.com/misty-step/mistystack/edit/master/skills/misty/SKILL.md">Edit on GitHub</a> · <a class="sp-link" href="${abs('/source/skills/misty/SKILL.md')}">Raw Markdown</a></div>
      <details class="docs-toc-mobile"><summary>On this page</summary>${toc()}</details>
      <div class="docs-prose">${M.BODY}</div>
      ${related('Supporting documents', M.SUPPORTING)}
      ${related('Linked from', M.LINKED_FROM)}
    </article>
    <aside class="docs-toc"><p>On this page</p>${toc()}</aside>
  </div>
</main>
<footer class="docs-foot">
  <p>${esc(M.FOOT_LINE)}</p>
  <nav aria-label="Footer">${M.FOOT_LINKS.map(([label, href]) => `<a class="sp-link" href="${href}">${esc(label)}</a>`).join('')}</nav>
  <p>Site source <a class="sp-link" href="https://github.com/misty-step/mistystack/tree/${M.SHA}"><code class="sp-code-inline">${SHORT}</code></a> · Method package ${esc(M.METHOD_VERSION)} · <a class="sp-link" href="${abs('/release.json')}">Release record</a></p>
</footer>
</div>`;
}

export function mount() {
  document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
    const root = document.documentElement;
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  });
}
