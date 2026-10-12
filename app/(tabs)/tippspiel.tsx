import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { GAMES, SHORT, fmtDate, fmtTime } from '@/src/data';
import { useApp } from '@/src/store';
import { C, F } from '@/src/theme';
import { Badge, Btn, Card, Demo, H, Li, Muted, Screen, T, Tag } from '@/src/ui';

const RIVALS: [string, number][] = [['Sandra M.', 64], ['Pirmin Z.', 58], ['Löwe_1966', 55], ['Chantal B.', 49], ['Visper_Bueb', 41], ['Ramon I.', 37]];

function Stepper({ v, onMinus, onPlus, label }: { v: number; onMinus: () => void; onPlus: () => void; label: string }) {
  const b = { width: 32, height: 32, borderRadius: 9, borderWidth: 1, borderColor: C.line, backgroundColor: C.bg, alignItems: 'center' as const, justifyContent: 'center' as const };
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <Pressable style={b} onPress={onMinus} accessibilityLabel={`Tore ${label} minus`}><T style={{ fontSize: 18 }}>−</T></Pressable>
      <T style={{ fontFamily: F.black, fontSize: 26, width: 30, textAlign: 'center' }}>{v}</T>
      <Pressable style={b} onPress={onPlus} accessibilityLabel={`Tore ${label} plus`}><T style={{ fontSize: 18 }}>+</T></Pressable>
    </View>
  );
}

export default function Tippspiel() {
  const { tips, setTip, user } = useApp();
  const mine = 64;
  const board = [...RIVALS, ['Du', mine] as [string, number]].sort((a, b) => b[1] - a[1]);
  return (
    <ScreenWrap>
      <Card dark>
        <Tag color="#ffb3b5">Dein Stand</Tag>
        <View style={{ flexDirection: 'row', gap: 22 }}>
          {[[mine, 'Punkte'], [board.findIndex((r) => r[0] === 'Du') + 1 + '.', 'Rang Freunde'], [Object.keys(tips).length + '/4', 'getippt']].map(([v, l]) => (
            <View key={String(l)}><T style={{ color: '#fff', fontFamily: F.black, fontSize: 28 }}>{v}</T><T style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>{l}</T></View>
          ))}
        </View>
      </Card>
      <Muted>Exaktes Resultat 3 Pkt · richtige Tordifferenz 2 Pkt · richtiger Sieger 1 Pkt. Tipps schliessen bei Spielbeginn.</Muted>
      {!user && <Card style={{ flexDirection: 'row', alignItems: 'center' }}><T style={{ flex: 1, fontSize: 14 }}>Melde dich an, damit deine Tipps in der Rangliste zählen.</T><Btn title="Anmelden" onPress={() => router.push('/konto')} style={{ flex: 0 }} /></Card>}
      <H>Offene Tipps</H>
      {GAMES.slice(0, 4).map((g) => {
        const t = tips[g.id] || { h: 0, a: 0 };
        return (
          <Card key={g.id}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Muted>{fmtDate(g.d)} · {fmtTime(g.d)}</Muted>
              {tips[g.id] ? <T style={{ color: C.ok, fontFamily: F.bodySemi, fontSize: 13 }}>✓ Tipp gespeichert</T> : <Muted>noch offen</Muted>}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center', gap: 6, flex: 1 }}><Badge code={g.h} size={44} /><T style={{ fontFamily: F.bodySemi, fontSize: 13 }}>{SHORT[g.h]}</T>
                <Stepper v={t.h} label={SHORT[g.h]} onMinus={() => setTip(g.id, 'h', -1)} onPlus={() => setTip(g.id, 'h', 1)} /></View>
              <T style={{ fontFamily: F.black, fontSize: 22, color: C.muted }}>:</T>
              <View style={{ alignItems: 'center', gap: 6, flex: 1 }}><Badge code={g.a} size={44} /><T style={{ fontFamily: F.bodySemi, fontSize: 13 }}>{SHORT[g.a]}</T>
                <Stepper v={t.a} label={SHORT[g.a]} onMinus={() => setTip(g.id, 'a', -1)} onPlus={() => setTip(g.id, 'a', 1)} /></View>
            </View>
          </Card>
        );
      })}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><H>Rangliste</H><Demo>Beispiel</Demo></View>
      <Card style={{ gap: 0 }}>
        {board.map(([n, p], i) => (
          <Li key={n} last={i === board.length - 1}>
            <T style={{ width: 22, fontFamily: F.black, color: i < 3 ? C.red : C.muted }}>{i + 1}</T>
            <T style={{ flex: 1, fontFamily: n === 'Du' ? F.bodyBold : F.bodySemi }}>{n === 'Du' ? (user ? `${user.first} (du)` : 'Du') : n}</T>
            <T style={{ fontFamily: F.black }}>{p}</T>
          </Li>
        ))}
      </Card>
    </ScreenWrap>
  );
}
const ScreenWrap = Screen;
