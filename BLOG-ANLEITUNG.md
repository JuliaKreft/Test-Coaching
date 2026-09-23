# Blogartikel schreiben — Kurzanleitung

Ein neuer Artikel ist einfach eine Textdatei. So geht's:

## 1. Datei anlegen
Lege im Ordner **`_posts/`** eine neue Datei an. Der Dateiname MUSS mit Datum beginnen:
```
_posts/2026-10-05-mein-thema.md
```

## 2. Kopf (Front Matter) einfügen
Ganz oben in die Datei (Werte anpassen):
```
---
layout: post
lang: de
title: "Dein Titel"
description: "1–2 Sätze für Google & Vorschau."
permalink: /blog/mein-thema/
de_url: /blog/mein-thema/
en_url: /blog/mein-thema/
alt_url: /blog/mein-thema/
alt_label: "EN"
---
```

## 3. Text schreiben (Markdown)
Darunter einfach schreiben:
```
Das ist ein normaler Absatz.

## Zwischenüberschrift

- Aufzählungspunkt
- Noch einer

> Ein hervorgehobenes Zitat.

Ein [Link zum Kontakt](/kontakt/).
```

## Bilder
Bild in `assets/img/` ablegen und im Text einbinden:
```
![Bildbeschreibung](/assets/img/mein-bild.jpg)
```

## Englischer Artikel
Gleiche Datei-Logik, aber `lang: en` und Pfad unter `/blog/...` (die englische Blog-Übersicht zeigt automatisch alle Artikel mit `lang: en`).

**Tipp für Google/KI:** Beginne Abschnitte mit der Antwort, halte Absätze kurz (2–3 Sätze), nutze Zwischenüberschriften und Listen.

Die Vorlage findest du in **VORLAGE-blogpost.md** — kopieren, umbenennen, ausfüllen.
