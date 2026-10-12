import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { GAMES, NEWS, PARTNERS, RESULTS, ROSTER, SHORT, TEAMS, TREUE, fmtDate, fmtTime, LINKS } from '@/src/data';
import { PLAYER_IMG } from '@/src/images';
import { MY_VISITS, useApp } from '@/src/store';
import { C, F } from '@/src/theme';
import { Badge, Btn, Card, H, Muted, Progress, Row, Screen, T, Tag, openUrl } from '@/src/ui';
import { ResultRow } from '@/src/components';

function useCountdown(iso: string) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  let ms = Math.max(0, new Date(iso).getTime() - now);
  const d = Math.floor(ms / 864e5); ms -= d * 864e5;
  const h = Math.floor(ms / 36e5); ms -= h * 36e5;
  const m = Math.floor(ms / 6e4); const s = Math.floor((ms - m * 6e4) / 1000);
  return [[d, 'Tage'], [h, 'Std'], [m, 'Min'], [s, 'Sek']] as [number, string][];
}

export default function Home() {
  const g = GAMES[0];
  const cd = useCountdown(g.d);
  const { user } = useApp();
  return (
    <Screen>
      <View style={{ backgroundColor: C.redDeep, borderRadius: 20, padding: 16, gap: 14 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Tag color="#fff">Nächstes Heimspiel</Tag><Tag color="#fff">Swiss League</Tag>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <View style={{ alignItems: 'center', gap: 6 }}><Badge code={g.h} size={60} /><T style={{ color: '#fff', fontFamily: F.display }}>{SHORT[g.h]}</T></View>
          <T style={{ color: '#fff', fontFamily: F.black, fontSize: 28 }}>VS</T>
          <View style={{ alignItems: 'center', gap: 6 }}><Badge code={g.a} size={60} /><T style={{ color: '#fff', fontFamily: F.display }}>{SHORT[g.a]}</T></View>
        </View>
        <T style={{ color: '#fff', textAlign: 'center', fontFamily: F.bodySemi }}>{fmtDate(g.d)} · {fmtTime(g.d)} · {g.venue}</T>
        <Row>
          {cd.map(([v, l]) => (
            <View key={l} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.22)', borderRadius: 10, paddingVertical: 7, alignItems: 'center' }}>
              <T style={{ color: '#fff', fontFamily: F.black, fontSize: 22 }}>{String(v).padStart(2, '0')}</T>
              <T style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10, letterSpacing: 1 }}>{l.toUpperCase()}</T>
            </View>
          ))}
        </Row>
        <Row>
          <Btn kind="white" icon="ticket-outline" title="Tickets" onPress={() => router.push('/tickets')} />
          <Btn kind="ghost" icon="time-outline" title="Jetzt tippen" onPress={() => router.push('/tippspiel')} />
        </Row>
      </View>

      <Card onPress={() => router.push('/spiele')} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: C.red, alignItems: 'center', justifyContent: 'center' }}><View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#fff' }} /></View>
        <View style={{ flex: 1 }}><T style={{ fontFamily: F.display }}>Live-Ticker</T><Muted>Tore, Strafen und Spielstand in Echtzeit</Muted></View>
        <T style={{ color: C.muted }}>›</T>
      </Card>

      <H right="Alle Spiele" onRight={() => router.push('/spiele')}>Letzte Resultate</H>
      <Card style={{ gap: 0 }}>{RESULTS.slice(0, 3).map((r, i) => <ResultRow key={i} r={r} last={i === 2} />)}</Card>

      <H right="Alle News" onRight={() => router.push('/news')}>News</H>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }} style={{ marginHorizontal: -16 }}>
        {NEWS.map((n) => (
          <Pressable key={n.t} onPress={() => openUrl(LINKS.website)} style={{ width: 230, backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.line, overflow: 'hidden' }}>
            <View style={{ height: 90, backgroundColor: C.night, justifyContent: 'flex-end', padding: 10 }}>
              <View style={{ backgroundColor: C.red, alignSelf: 'flex-start', paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6 }}><Tag color="#fff">{n.c}</Tag></View>
            </View>
            <View style={{ padding: 12, gap: 4 }}><T style={{ fontFamily: F.display, fontSize: 15 }} numberOfLines={2}>{n.t}</T><Muted>{n.d}</Muted></View>
          </Pressable>
        ))}
      </ScrollView>

      <H right="Ganzer Kader" onRight={() => router.push('/team')}>Das Team</H>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }} style={{ marginHorizontal: -16 }}>
        {ROSTER.filter((p) => PLAYER_IMG[String(p.n)] && !p.inj).map((p) => (
          <Pressable key={p.n} onPress={() => router.push(`/spieler/${p.n}`)} style={{ width: 112, gap: 6 }}>
            <View style={{ width: 112, height: 150, borderRadius: 14, overflow: 'hidden', backgroundColor: C.redDeep }}>
              <Image source={PLAYER_IMG[String(p.n)]} style={{ width: '100%', height: '100%' }} />
              <T style={{ position: 'absolute', left: 8, bottom: 4, color: '#fff', fontFamily: F.black, fontSize: 22 }}>{p.n}</T>
            </View>
            <T style={{ fontFamily: F.bodySemi, fontSize: 12.5 }} numberOfLines={2}>{p.name}</T>
          </Pressable>
        ))}
      </ScrollView>

      <Card>
        <Tag>Treue lohnt sich</Tag>
        {user?.abo ? (
          <Pressable onPress={() => router.push('/treue')} style={{ gap: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
              <T style={{ fontFamily: F.black, fontSize: 30 }}>{MY_VISITS}</T><Muted style={{ fontSize: 15 }}>von {TREUE.total} Heimspielen besucht</Muted>
            </View>
            <Progress value={MY_VISITS / TREUE.total} />
            <T style={{ fontSize: 13 }}>Noch {TREUE.tiers[0].min - MY_VISITS} Heimspiele bis zum Stehplatz für die Playoffs</T>
          </Pressable>
        ) : (
          <>
            <T style={{ fontSize: 14 }}>Mit Saisonabo sammelst du Heimspiele: ab 15 gibt es einen Stehplatz für die Playoffs, ab 20 einen Sitzplatz, bei allen 23 den Superfan-Schal.</T>
            <Btn title={user ? 'Abo verknüpfen' : 'Anmelden und Abo verknüpfen'} onPress={() => router.push('/konto')} style={{ flex: 0 }} />
          </>
        )}
      </Card>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6, columnGap: 14 }}>
        {PARTNERS.map((p) => <T key={p} style={{ fontFamily: F.display, fontSize: 12, color: C.muted, letterSpacing: 0.6 }}>{p.toUpperCase()}</T>)}
      </View>
    </Screen>
  );
}
