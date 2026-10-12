import { View } from 'react-native';
import { FORUM, LINKS, NEWS, RESULTS, TEAMS } from './data';
import { C, F } from './theme';
import { Badge, Btn, Card, Li, Muted, Row, Screen, T, openUrl } from './ui';

export function ResultRow({ r, last }: { r: (typeof RESULTS)[number]; last?: boolean }) {
  const home = r.h === 'VIS'; const opp = home ? r.a : r.h;
  const score = home ? r.s : r.s.split(':').reverse().join(':');
  return (
    <Li last={last}>
      <View style={{ width: 24, height: 24, borderRadius: 7, backgroundColor: r.abg ? C.line : r.w ? C.ok : C.muted, alignItems: 'center', justifyContent: 'center' }}>
        <T style={{ color: '#fff', fontFamily: F.black, fontSize: 12 }}>{r.abg ? '–' : r.w ? 'S' : 'N'}</T>
      </View>
      <Badge code={opp} />
      <View style={{ flex: 1 }}>
        <T style={{ fontFamily: F.bodySemi }}>{home ? 'vs' : '@'} {TEAMS[opp]}</T>
        <Muted>{r.abg ? 'Abgebrochen nach dem 1. Drittel' : home ? 'Heimspiel' : 'Auswärts'} · {r.d}</Muted>
      </View>
      <T style={{ fontFamily: F.black, fontSize: 17 }}>{score}</T>
    </Li>
  );
}


export function SecandaButtons() {
  return (
    <Row>
      <Btn kind="line" title="App Store ↗" onPress={() => openUrl(LINKS.secandaIOS)} />
      <Btn kind="line" title="Google Play ↗" onPress={() => openUrl(LINKS.secandaAndroid)} />
    </Row>
  );
}


export function NewsList() {
  return (
    <Screen>
      <Card style={{ gap: 0 }}>{NEWS.map((n, i) => <Li key={n.t} last={i === NEWS.length - 1}><View style={{ flex: 1 }}><T style={{ fontFamily: F.bodySemi }}>{n.t}</T><Muted>{n.c} · {n.d}</Muted></View></Li>)}</Card>
      <Btn kind="line" title="Alle Artikel auf ehc-visp.ch ↗" onPress={() => openUrl(LINKS.website)} style={{ flex: 0 }} />
    </Screen>
  );
}

export function ForumList() {
  return (
    <Screen>
      <Card style={{ gap: 0 }}>{FORUM.map(([t, n, d], i) => <Li key={t} last={i === FORUM.length - 1} onPress={() => openUrl(LINKS.forum)}><View style={{ flex: 1 }}><T style={{ fontFamily: F.bodySemi }}>{t}</T><Muted>{n} Antworten · letzter Beitrag {d}</Muted></View><T>↗</T></Li>)}</Card>
      <Btn title="Zum EHC Visp Forum ↗" onPress={() => openUrl(LINKS.forum)} style={{ flex: 0 }} />
      <Muted>Mitlesen und Schreiben geschieht auf hockeyfans.ch.</Muted>
    </Screen>
  );
}
