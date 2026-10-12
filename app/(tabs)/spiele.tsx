import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { GAMES, LINKS, RESULTS, TABLE, TEAMS, fmtDate, fmtTime } from '@/src/data';
import { C, F } from '@/src/theme';
import { Badge, Btn, Card, H, Li, Muted, Screen, Seg, T, Tag, openUrl } from '@/src/ui';
import { ResultRow } from '@/src/components';

export default function Spiele() {
  const [seg, setSeg] = useState<'plan' | 'table' | 'live'>('plan');
  const [all, setAll] = useState(false);
  return (
    <Screen>
      <Seg items={[['plan', 'Spielplan'], ['table', 'Tabelle'], ['live', 'Live']]} value={seg} onChange={setSeg} />
      {seg === 'plan' && (
        <>
          <H>Nächste Spiele</H>
          <Card style={{ gap: 0 }}>
            {GAMES.slice(0, all ? 99 : 6).map((g, i, arr) => {
              const home = g.h === 'VIS'; const opp = home ? g.a : g.h;
              return (
                <Li key={g.id} last={i === arr.length - 1}>
                  <Badge code={opp} />
                  <View style={{ flex: 1 }}>
                    <T style={{ fontFamily: F.bodySemi }}>{home ? 'vs' : '@'} {TEAMS[opp]}</T>
                    <Muted>{fmtDate(g.d)} · {fmtTime(g.d)} · {g.venue}</Muted>
                  </View>
                  {home ? <Btn title="Tickets" onPress={() => router.push('/tickets')} style={{ flex: 0, paddingVertical: 8, paddingHorizontal: 10 }} /> : <Tag color={C.muted}>Auswärts</Tag>}
                </Li>
              );
            })}
          </Card>
          <Btn kind="line" title={all ? 'Weniger anzeigen' : `Ganzen Spielplan anzeigen (${GAMES.length})`} onPress={() => setAll(!all)} style={{ flex: 0 }} />
          <H>Resultate</H>
          <Card style={{ gap: 0 }}>{RESULTS.map((r, i) => <ResultRow key={i} r={r} last={i === RESULTS.length - 1} />)}</Card>
        </>
      )}
      {seg === 'table' && (
        <Card style={{ gap: 0 }}>
          {TABLE.map(([c, p], i) => (
            <Li key={c} last={i === TABLE.length - 1}>
              <View style={{ width: 4, height: 18, borderRadius: 2, backgroundColor: i < 6 ? C.ok : C.gold }} />
              <T style={{ width: 22, fontFamily: F.black }}>{i + 1}</T>
              <Badge code={c} />
              <T style={{ flex: 1, fontFamily: c === 'VIS' ? F.bodyBold : F.body }}>{TEAMS[c]}</T>
              <T style={{ fontFamily: F.black }}>{p}</T>
            </Li>
          ))}
          <Muted style={{ marginTop: 8 }}>Grün: Playoff-Plätze · Gold: Play-In · Top 10, Stand 12.10.2026</Muted>
        </Card>
      )}
      {seg === 'live' && (
        <>
          <Card dark onPress={() => openUrl(LINKS.live)} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ flex: 1 }}><T style={{ color: '#fff', fontFamily: F.display }}>Offizieller Live-Ticker</T><T style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>SIHF Game Center · alle Swiss-League-Spiele</T></View>
            <T style={{ color: '#fff' }}>↗</T>
          </Card>
          <Muted>Ein eigener Ticker direkt in der App folgt: Tore, Strafen und Push-Mitteilungen live aus der Lonza Arena.</Muted>
        </>
      )}
    </Screen>
  );
}
