/* view swap by hash: give each view data-route="name" and link to it
   with href="#name". The matching view mounts (.is-on) and replays
   its entrance; everything else unmounts. Falls back to
   data-route="index" when the hash names nothing. */
(() => {
  const views = document.querySelectorAll('[data-route]');
  if (!views.length) return;
  const show = () => {
    const route = location.hash.slice(1) || 'index';
    let hit = false;
    views.forEach((v) => {
      const on = v.dataset.route === route;
      v.classList.toggle('is-on', on);
      hit = hit || on;
    });
    if (!hit)
      views.forEach((v) =>
        v.classList.toggle('is-on', v.dataset.route === 'index'),
      );
    if (window.aePlaceInds) requestAnimationFrame(window.aePlaceInds);
  };
  addEventListener('hashchange', show);
  show();
})();
