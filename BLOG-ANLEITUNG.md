# Blogartikel schreiben — Kurzanleitung

Ein neuer Artikel ist einfach eine Textdatei. Die Web-Adresse entsteht **automatisch aus dem Dateinamen** – du musst dich um URLs nicht mehr kümmern.

## 1. Datei anlegen
Lege im Ordner **`_posts/`** eine neue Datei an. Der Dateiname bestimmt Datum **und** Adresse:
```
_posts/2026-10-26-mein-thema.md
```
→ ergibt automatisch die Adresse **/blog/mein-thema/**

**Regeln für den Dateinamen (wichtig!):**
- Beginnt mit dem Datum: `JJJJ-MM-TT-...`
- Danach nur **Kleinbuchstaben a–z, Zahlen und Bindestriche**
- **Keine** Umlaute (ä→ae, ö→oe, ü→ue, ß→ss), **keine** Fragezeichen, Leerzeichen, Kommas o. Ä.
- Das **Datum darf nicht in der Zukunft** liegen (sonst wird der Artikel nicht veröffentlicht).

## 2. Kopf (nur 2 Zeilen)
Ganz oben in die Datei:
```
---
title: "Dein Titel (hier sind Umlaute & Fragezeichen erlaubt)"
description: "1–2 Sätze für Google & Vorschau."
---
```
Mehr brauchst du nicht – Layout, Sprache und Adresse werden automatisch gesetzt.

## 3. Text schreiben (Markdown)
```
Das ist ein normaler Absatz.

## Zwischenüberschrift

- Aufzählungspunkt
- Noch einer

> Ein hervorgehobenes Zitat.

Ein [Link zum Kontakt](/kontakt/).
```

## 4. Veröffentlichen
Speichern → in GitHub Desktop **Commit** → **Push**. Nach 1–2 Min ist der Artikel live und erscheint automatisch auf der Blog-Übersicht.

## Bilder
Bild in `assets/img/` ablegen und einbinden:
```
![Bildbeschreibung](/assets/img/mein-bild.jpg)
```

Die fertige Vorlage findest du in **VORLAGE-blogpost.md** — kopieren, in `_posts/` legen, umbenennen, ausfüllen.
