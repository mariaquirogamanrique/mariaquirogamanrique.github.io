/* Portfolio · shared behaviour
   1. EN/ES toggle: content lives in pairs of elements with lang="en" / lang="es".
      Attributes (alt, aria-label, title) use data-es-<attr>; the English value stays in the attribute.
   2. Reading "thread" on long pages (.thread element present).
   No dependencies. The <head> inline snippet sets data-lang before paint to avoid a flash. */
(function () {
  var root = document.documentElement;
  var ATTRS = ['alt', 'aria-label', 'title', 'content'];

  function setLang(lang, save) {
    if (lang !== 'es') lang = 'en';
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    if (save) { try { localStorage.setItem('lang', lang); } catch (e) {} }

    ATTRS.forEach(function (a) {
      document.querySelectorAll('[data-es-' + a + ']').forEach(function (el) {
        if (!el.hasAttribute('data-en-' + a)) el.setAttribute('data-en-' + a, el.getAttribute(a) || '');
        el.setAttribute(a, el.getAttribute('data-' + lang + '-' + a));
      });
    });
    var t = root.getAttribute('data-' + lang + '-title');
    if (t) document.title = t;

    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.setLang === lang));
    });
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-set-lang]');
    if (b) setLang(b.dataset.setLang, true);
  });

  setLang(root.getAttribute('data-lang'), false);

  /* Thread: progress through the page, drawn as a red running stitch */
  var thread = document.querySelector('.thread');
  if (thread && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ticking = false;
    var update = function () {
      var max = document.documentElement.scrollHeight - innerHeight;
      thread.style.setProperty('--p', max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0);
      ticking = false;
    };
    addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* Horizontal strips: arrow keys scroll one item when the strip has focus */
  document.querySelectorAll('.strip').forEach(function (s) {
    s.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var item = s.firstElementChild; if (!item) return;
      e.preventDefault();
      s.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * (item.getBoundingClientRect().width + 14), behavior: 'smooth' });
    });
  });
})();
