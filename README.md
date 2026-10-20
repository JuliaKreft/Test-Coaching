# Website von Julia Kreft — Jekyll-Projekt

Das ist deine komplette Website als Jekyll-Projekt (baut auf GitHub Pages automatisch).

## ⚠️ Zuerst in einem TEST-Repository testen
Stelle **nicht** sofort deine Live-Seite um. Vorgehen:
1. Auf GitHub ein **neues, leeres Repository** anlegen (z. B. `website-test`).
2. Den **Inhalt dieses Ordners** (alle Dateien/Ordner, inkl. `_config.yml`, `_includes`, `_layouts`, `assets`, `en`, `_posts`) hochladen — über „Add file → Upload files".
3. **Settings → Pages** → Source „Deploy from a branch" → `main` / `/ (root)` → Save.
4. Nach 1–2 Min die Vorschau-URL öffnen und alles prüfen (DE + EN, alle Seiten, Blog, Presse).
5. Erst wenn alles passt: dieselben Dateien in dein **Live-Repo** laden.

## Struktur
- `index.html`, `coaching.html`, `speaking.html`, `kontakt.html`, `presse.html`, `blog.html` — deutsche Seiten
- `impressum.html`, `datenschutz.html` — rechtliche Seiten (DE)
- `en/` — englische Spiegelseiten
- `_posts/` — Blogartikel (siehe **BLOG-ANLEITUNG.md**)
- `_includes/` — Kopf/Header/Footer/Schema/Newsletter (einmal pflegen, überall gültig)
- `_layouts/` — Seiten-Grundgerüst
- `assets/` — CSS, JS, Bilder (ausgelagert = schnellere Ladezeit)
- `robots.txt`, `llms.txt`, `og-image.jpg` — SEO/GEO; `sitemap.xml` wird automatisch erzeugt

## Newsletter (CleverReach) einbinden
1. Öffne `_includes/newsletter.html`.
2. Ersetze den Kommentar `<!-- CLEVERREACH: ... -->` durch deinen CleverReach-Einbettungscode.
3. Der Newsletter erscheint automatisch am Ende jedes Blogartikels. Möchtest du ihn auch auf der Startseite? Sag mir Bescheid — oder füge `{%- raw -%}{% include newsletter.html %}{%- endraw -%}` an der gewünschten Stelle in `index.html` ein.

## Gut zu wissen
- In `_config.yml` steht `url: https://www.juliakreft.de` (ohne „www"), passend zu deiner aktuellen Auslieferung. Wenn du lieber „www" möchtest, sag Bescheid.
- Die englischen Rechtstexte verweisen bewusst auf die deutschen Seiten (Impressum/Datenschutz auf Deutsch ist in DE Standard).
- Neue Blogartikel: siehe **BLOG-ANLEITUNG.md** und die Datei **VORLAGE-blogpost.md**.
