# Portfolio · María Alejandra Quiroga

Creative Project Manager portfolio, live at **https://mariaquirogamanrique.github.io**.

It's a static site (plain HTML, CSS and JavaScript, no build step), bilingual EN/ES, mobile-first,
and hosted on GitHub Pages from the `main` branch.

```
index.html            Home: hero, selected work, what the portfolio shows
case-singer.html      Flagship case study: La Tienda Singer
design-system.html    The Singer visual system (palette, type, grid, components, templates, process)
how-i-work.html       PM process: brief → research → concept → production → launch → measure
about.html            About + contact + CV download
_templates/           Starting point for new case studies (not linked from the site)
assets/css/site.css   All styles (tokens at the top)
assets/js/site.js     Language toggle, reading "thread", keyboard scrolling for galleries
assets/img/<brand>/   Images per case study (WebP; full size + "-sm" half size)
assets/files/         Downloads (CV)
```

## Run it locally

Any static server works. From this folder:

```bash
# Python
python -m http.server 8000
# or Node
npx serve .
```

Then open http://localhost:8000. Opening `index.html` directly by double-clicking also works.

## Edit text (EN/ES)

Every piece of text is written twice, side by side:

```html
<span lang="en">Hello</span><span lang="es">Hola</span>
```

The toggle hides whichever language isn't active. Your choice is remembered, and `?lang=es` forces Spanish.
For image alt text and ARIA labels, the English text goes in the normal attribute and the Spanish in `data-es-…`:

```html
<img src="…" alt="English description" data-es-alt="Descripción en español">
```

## Add a new case study

1. **Images:** export WebP files into `assets/img/<brand>/`. Use two sizes per image:
   `name.webp` (≤ 1400 px wide) and `name-sm.webp` (half width). Squoosh (https://squoosh.app) works well.
   Keep each file under about 250 KB.
2. **Page:** copy `_templates/case-study.html` to the root as `case-<brand>.html`. Paste the header and footer
   from `case-singer.html` and replace every `[BRACKET]`. Any section block from `case-singer.html`
   (persona cards, timeline, KPIs…) can be copied as-is, since they all use classes from `site.css`.
3. **Be honest:** mark produced work with `chip chip--made` and planned work with `chip chip--plan`.
   Label targets as targets; if you have results, fill in the "Actual" row.
4. **Home:** in `index.html`, copy the `<a class="work-card">` block, point it at the new page,
   and remove the "Next case study" placeholder once you have two cases.
5. **Nav:** if the new case should be in the top menu, add it to the `<nav class="nav">` list on every page.

## Publish changes

```bash
git add .
git commit -m "Add <brand> case study"
git push
```

GitHub Pages redeploys automatically within a minute or two.

## Placeholders still to fill

Search the project for `[` + capital letters (e.g. `[EMAIL]`, `[CITY]`, `[ADD:`, `[CONFIRM`) or for the class `ph`.

## Credits

La Tienda Singer is an authorized Singer dealer. Work shown with permission; Singer is a trademark of its
respective owner. The La Tienda Singer case is an academic project for the course *Diseño y Producción de
Estrategias y Contenidos Digitales* (Prof. William Castillo).
Fonts: Fraunces, Instrument Sans and IBM Plex Mono (site); Poppins and Playfair Display (Singer work), via Google Fonts.
