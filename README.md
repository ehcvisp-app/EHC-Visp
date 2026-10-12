# EHC Visp Fan-App (Expo / React Native)

Native App für iPhone und Android, gebaut mit Expo SDK 57 und Expo Router.
Inhalte, Design und Abläufe entsprechen dem Prototyp
https://claude.ai/artifact/RgJyh8vnE9feV5rdvkpmN1

## Was drin ist

| Bereich | Stand |
|---|---|
| Home: nächstes Spiel mit Countdown, Resultate, News, Team, Treue | fertig |
| Spiele: ganzer Spielplan (38 Spiele), Resultate, Tabelle, Link Live-Ticker (SIHF) | fertig |
| Tippspiel: Tipps abgeben, Rangliste | Tipps lokal, Rangliste Beispiel |
| Fanshop: 33 Artikel mit Bildern und Preisen, Warenkorb → Webshop | fertig |
| Konto: Registrieren, Anmelden mit E-Mail-Code, Abo-Abgleich, Konto löschen | **Demo** (lokal, Code 241941) |
| Treue lohnt sich: Heimspiele, Belohnungen, Statistik aus den Scans | Statistik echt (Summen), persönlicher Stand Muster |
| Mein Abo: Abo-Daten, Links zur SECANDA-App | fertig |
| Team: 25 Spieler + 7 Staff mit Fotos | fertig |
| Tickets, News, Forum | Links zu den bestehenden Angeboten |

Alles, was noch Demo ist, ist im Code mit `DEMO` bzw. in `src/store.tsx` markiert.

## Projektstruktur

```
app/                 Screens (Expo Router)
  (tabs)/            Home, Spiele, Tippspiel, Shop, Mehr
  konto.tsx          Login / Registrierung / Konto löschen
  treue.tsx, abo.tsx, team.tsx, spieler/[id].tsx, warenkorb.tsx, tickets.tsx, news.tsx, forum.tsx
src/
  data.ts            Spielplan, Resultate, Kader, Shop, Links, Treue-Zahlen
  store.tsx          App-Zustand (AsyncStorage) + Demo-Login/Abo-Abgleich
  ui.tsx, components.tsx, theme.ts, images.ts
assets/              Fonts (Akute, Barlow), Logos, Spieler-, Staff- und Produktbilder, App-Icon
store/               Store-Texte, Datenschutz-Entwurf, Screenshots (1290×2796)
```

## Lokal starten

```bash
npm install
npx expo start          # QR-Code mit der App «Expo Go» scannen
```

## In die Stores bringen (EAS)

Voraussetzungen (nur der Club kann das erledigen):

1. **Expo-Konto** für den Club (expo.dev), am besten als Organisation «ehc-visp».
2. **Apple Developer Program** auf die EHC Visp Sport AG (D-U-N-S-Nummer nötig).
3. **Google Play Console** auf die EHC Visp Sport AG.
4. Code in ein **GitHub-Repository** laden und dieses im Expo-Projekt verbinden
   (expo.dev → Projekt → GitHub). Dann können Builds auch direkt aus dem Repo gestartet werden.

Schritte:

```bash
npm install -g eas-cli
eas login
eas init                      # erstellt das Expo-Projekt und trägt die projectId in app.json ein
eas build -p android --profile preview      # APK zum Testen auf Android
eas build -p ios --profile production       # iOS-Build, EAS führt durch Zertifikate & Profile
eas build -p android --profile production
eas submit -p ios                            # zu App Store Connect / TestFlight
eas submit -p android                        # in die Play Console (Track: internal, Entwurf)
```

Vor dem ersten Submit:

- In **App Store Connect** eine neue App anlegen: Name «EHC Visp», Bundle-ID `ch.ehcvisp.fanapp`.
  Die Apple-ID der App in `eas.json` bei `ascAppId` eintragen.
- In der **Play Console** eine App anlegen (Paketname `ch.ehcvisp.fanapp`) und einen
  Service-Account-Schlüssel für EAS Submit hinterlegen.
- Store-Texte, Screenshots und Datenschutzerklärung aus dem Ordner `store/` verwenden.

## Bevor die App öffentlich geht

Ohne diese Punkte würde Apple die App mit hoher Wahrscheinlichkeit ablehnen bzw. sie wäre nicht korrekt:

- **Echtes Login-Backend** statt Demo (z.B. Supabase oder Firebase Auth mit E-Mail-Code).
- **Abo-Abgleich** über SECANDA / Ticketing (E-Mail → Abo, Scans → «Treue lohnt sich»).
- **Datenschutzerklärung** online (Entwurf in `store/datenschutz.md`) und in der App verlinkt.
- **Bildrechte**: Fotos Christian Pfammatter; Nutzung der Gegner-Logos mit Liga/Clubs klären.
- Inhalte (Spielplan, News, Kader) über ein Backend/CMS pflegen statt fest im Code.
- Für die erste Store-Version: TestFlight / interner Test-Track mit einigen Fans.
