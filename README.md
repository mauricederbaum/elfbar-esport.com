# ELFBAR-ESPORT

Responsive deutsche Website für ein inoffizielles Counter-Strike-Team. Statisches HTML, CSS und JavaScript; kein Build, keine npm-Abhängigkeiten.

## Lokal starten

```sh
python3 -m http.server 8080 --directory dist
```

Danach http://localhost:8080 öffnen. Für Hosting den Inhalt von `dist/` verwenden, z. B. NGINX, Cloudflare Pages oder GitHub Pages. Alle Asset-Pfade sind relativ und funktionieren auch in einem Unterverzeichnis. HTTPS wird empfohlen.

## Dateien und Inhalte

- `dist/index.html`: Texte, Teamvorstellung, Roster-Hinweis, Matchcenter, Updates und Footer.
- `dist/styles.css`: responsives Design und Farben in `:root`.
- `dist/app.js`: Navigation, Match-Tabs mit Tastatursteuerung, Artikel- und Informationsdialoge. Ganz oben `teamConfig` für Discord-Einladung, FACEIT und Steam-Gruppe.
- `dist/assets/team-logo.webp`: vom Team bereitgestelltes Original-Logo, über die Discord-CDN-URL in 512 px bezogen.
- `dist/assets/cs2-hero.jpg`: Counter-Strike-Illustration aus Valves Steam-CDN: https://cdn.akamai.steamstatic.com/steam/apps/730/library_hero.jpg (Rechte: Valve).
- `dist/assets/anton.ttf`: lokal ausgelieferte Schrift Anton, SIL Open Font License, siehe `dist/assets/anton-OFL.txt`.
- `.openai/hosting.json`: Konfiguration der privaten Sites-Vorschau.

## Nächste Inhalte

1. Echte Spielernamen, Rollen, Profil-Links und freigegebene Fotos ergänzen. Aktuell werden keine Spieler, Ränge, Sponsoren oder Ergebnisse erfunden.
2. Discord-Einladungslink in `teamConfig.discordInvite` setzen. Optional FACEIT und Steam-Gruppe ergänzen.
3. Matchdaten im HTML/JavaScript ergänzen; die aktuelle Ansicht zeigt ausdrücklich leere Zustände für kommende Matches und Ergebnisse.
4. Vor öffentlichem Betrieb Betreiber-/Kontaktangaben, gegebenenfalls Impressum und die Datenschutzhinweise vervollständigen. Die Dialogtexte sind ausdrücklich Entwürfe; die private Vorschau verwendet die Hosting-Zugriffsprüfung.
5. Bei eigener Domain Open-Graph-Bild-URL in `index.html` anpassen.

Es gibt kein Tracking im eigenen Seitencode, keine eingebetteten Drittanbieter-Widgets und keine extern geladenen Schriften. Bilder werden lokal ausgeliefert. Für Counter-Strike-Grafik und bereitgestelltes Teamlogo wurden keine Eigentumsrechte übertragen.
