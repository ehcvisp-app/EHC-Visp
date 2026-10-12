import { router } from 'expo-router';
import { View } from 'react-native';
import { GAMES, SHORT, TEAMS, TREUE, fmtDate, fmtTime } from '@/src/data';
import { MY_VISITS, useApp } from '@/src/store';
import { C, F } from '@/src/theme';
import { Badge, Btn, Card, H, Li, Muted, Progress, Screen, T, Tag } from '@/src/ui';

function Stats() {
  const T2 = TREUE, played = T2.played.length;
  return (
    <>
      <H>Die Fans im Rennen</H>
      <Card>
        {T2.played.map((g) => (
          <View key={g.d} style={{ gap: 4 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <T style={{ fontSize: 13 }}>{g.d} vs {SHORT[g.opp]}</T>
              <T style={{ fontSize: 13 }}><T style={{ fontFamily: F.bodyBold, fontSize: 13 }}>{g.abos}</T> Abos · {g.scans} Scans</T>
            </View>
            <Progress value={g.abos / T2.abos} height={8} />
          </View>
        ))}
        <View>
          <Li><T style={{ flex: 1 }}>Alle {played} Heimspiele besucht</T><T style={{ fontFamily: F.black }}>{T2.dist[3]} Abos</T></Li>
          <Li><T style={{ flex: 1 }}>{played - 1} von {played} besucht</T><T style={{ fontFamily: F.black }}>{T2.dist[2]} Abos</T></Li>
          <Li last><T style={{ flex: 1 }}>1 von {played} besucht</T><T style={{ fontFamily: F.black }}>{T2.dist[1]} Abos</T></Li>
        </View>
        <Muted>Noch {T2.dist[3]} Abos sind auf Kurs für den Superfan-Schal. Stand 12.10.2026.</Muted>
      </Card>
    </>
  );
}

export default function Treue() {
  const { user } = useApp();
  const c = MY_VISITS, left = TREUE.total - TREUE.played.length;
  if (!user || !user.abo) {
    return (
      <Screen>
        <Card>
          <Tag>Treue lohnt sich</Tag>
          <T style={{ fontFamily: F.bodyBold }}>{user ? 'Zu deinem Konto ist noch kein Saisonabo verknüpft.' : 'Melde dich an. Hast du ein Saisonabo, siehst du hier deine gesammelten Heimspiele.'}</T>
          <Btn title={user ? 'Abo verknüpfen' : 'Anmelden oder Konto erstellen'} onPress={() => router.push('/konto')} style={{ flex: 0 }} />
        </Card>
        <H>Belohnungen</H>
        <Card style={{ gap: 0 }}>
          {TREUE.tiers.map((x, i) => (
            <Li key={x.min} last={i === 2}>
              <View style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: C.red, alignItems: 'center', justifyContent: 'center' }}><T style={{ color: '#fff', fontFamily: F.black, fontSize: 12 }}>{x.min}</T></View>
              <View style={{ flex: 1 }}><T style={{ fontFamily: F.bodySemi }}>{x.label}</T><Muted>ab {x.min} besuchten Heimspielen</Muted></View>
            </Li>
          ))}
        </Card>
        <Stats />
      </Screen>
    );
  }
  const next = TREUE.tiers.find((x) => c < x.min);
  const best = TREUE.tiers.filter((x) => c + left >= x.min).pop();
  return (
    <Screen>
      <Card dark style={{ gap: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Tag color="#ffb3b5">Deine Heimspiele</Tag><T style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>{TREUE.played.length} von {TREUE.total} gespielt</T></View>
        <T style={{ color: '#fff', fontFamily: F.black, fontSize: 44 }}>{c}<T style={{ color: 'rgba(255,255,255,0.6)', fontSize: 20 }}> / {TREUE.total}</T></T>
        <View>
          <Progress value={c / TREUE.total} track="rgba(255,255,255,0.18)" />
          <View style={{ height: 16 }}>
            {TREUE.tiers.map((x) => <T key={x.min} style={{ position: 'absolute', left: `${(x.min / TREUE.total) * 100 - 4}%`, color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>{x.min}</T>)}
          </View>
        </View>
        <T style={{ color: '#fff', fontSize: 14 }}>Noch {next ? next.min - c : 0} Heimspiele bis zum {next?.label}. Mit allen {left} restlichen Spielen schaffst du sogar den {best?.label}.</T>
      </Card>
      <H>Belohnungen</H>
      <Card style={{ gap: 0 }}>
        {TREUE.tiers.map((x, i) => (
          <Li key={x.min} last={i === 2}>
            <View style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: c >= x.min ? C.ok : C.red, alignItems: 'center', justifyContent: 'center' }}><T style={{ color: '#fff', fontFamily: F.black, fontSize: 12 }}>{x.min}</T></View>
            <View style={{ flex: 1 }}><T style={{ fontFamily: F.bodySemi }}>{x.label}</T><Muted>{c >= x.min ? 'erreicht' : `ab ${x.min} besuchten Heimspielen · noch ${x.min - c}`}</Muted></View>
          </Li>
        ))}
      </Card>
      <H>Deine Matchbesuche</H>
      <Card style={{ gap: 0 }}>
        {TREUE.played.map((g) => (
          <Li key={g.d}><T style={{ color: C.ok, fontFamily: F.black }}>✓</T><Badge code={g.opp} /><View style={{ flex: 1 }}><T style={{ fontFamily: F.bodySemi }}>vs {TEAMS[g.opp]}</T><Muted>{g.d} · Abo am Eingang gescannt</Muted></View></Li>
        ))}
        {GAMES.filter((g) => g.h === 'VIS').slice(0, 2).map((g, i) => (
          <Li key={g.id} last={i === 1}><T style={{ color: C.muted }}>·</T><Badge code={g.a} /><View style={{ flex: 1 }}><T style={{ fontFamily: F.bodySemi }}>vs {TEAMS[g.a]}</T><Muted>{fmtDate(g.d)} · {fmtTime(g.d)} · zählt, wenn dein Abo gescannt wird</Muted></View></Li>
        ))}
      </Card>
      <Muted>Es zählen die {TREUE.total} Heimspiele der Qualifikation. Testspiele zählen nicht.</Muted>
      <Stats />
    </Screen>
  );
}
