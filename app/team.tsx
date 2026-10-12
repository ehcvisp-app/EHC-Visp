import { router } from 'expo-router';
import { Image, Pressable, View, useWindowDimensions } from 'react-native';
import { LINKS, PHOTO_CREDIT, ROSTER, STAFF } from '@/src/data';
import { PLAYER_IMG, STAFF_IMG } from '@/src/images';
import { C, F } from '@/src/theme';
import { Btn, H, Muted, Screen, T, openUrl } from '@/src/ui';

function PhotoCard({ img, title, sub, num, w, onPress, inj }: { img?: any; title: string; sub: string; num?: number; w: number; onPress: () => void; inj?: boolean }) {
  return (
    <Pressable onPress={onPress} style={{ width: w, height: w * 4 / 3, borderRadius: 14, overflow: 'hidden', backgroundColor: img ? C.redDeep : C.card, borderWidth: img ? 0 : 1, borderColor: C.line, justifyContent: img ? 'flex-end' : 'center', alignItems: img ? 'stretch' : 'center' }}>
      {img ? <Image source={img} style={{ position: 'absolute', width: '100%', height: '100%' }} /> : null}
      {inj ? <View style={{ position: 'absolute', top: 8, left: 8, backgroundColor: C.red, borderRadius: 5, paddingHorizontal: 6, paddingVertical: 3 }}><T style={{ color: '#fff', fontFamily: F.display, fontSize: 10 }}>VERLETZT</T></View> : null}
      <View style={{ padding: 10, paddingTop: 30, backgroundColor: img ? 'rgba(10,10,12,0.72)' : 'transparent', flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
        {num !== undefined ? <T style={{ color: img ? '#fff' : C.red, fontFamily: F.black, fontSize: 26 }}>{num}</T> : null}
        <View style={{ flex: 1 }}>
          <T style={{ color: img ? '#fff' : C.fg, fontFamily: F.bodyBold, fontSize: 13 }} numberOfLines={2}>{title}</T>
          <T style={{ color: img ? 'rgba(255,255,255,0.75)' : C.muted, fontSize: 11 }} numberOfLines={2}>{sub}</T>
        </View>
      </View>
    </Pressable>
  );
}

export default function Team() {
  const { width } = useWindowDimensions();
  const w = (Math.min(width, 600) - 32 - 12) / 2;
  const groups: ['Goalie' | 'Verteidiger' | 'Stürmer', string][] = [['Goalie', 'Goalies'], ['Verteidiger', 'Verteidiger'], ['Stürmer', 'Stürmer']];
  return (
    <Screen>
      {groups.map(([g, label]) => (
        <View key={g} style={{ gap: 16 }}>
          <H>{label}</H>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {ROSTER.filter((p) => p.pos === g).map((p) => (
              <PhotoCard key={p.n} w={w} img={PLAYER_IMG[String(p.n)]} num={p.n} title={p.name} sub={`${p.pos} · ${p.nat}`} inj={p.inj} onPress={() => router.push(`/spieler/${p.n}`)} />
            ))}
          </View>
        </View>
      ))}
      <H>Trainer & Staff</H>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        {STAFF.map((s) => <PhotoCard key={s.key} w={w} img={STAFF_IMG[s.key]} title={s.name} sub={s.role} onPress={() => router.push(`/spieler/s-${s.key}`)} />)}
      </View>
      <Btn kind="line" title="Team auf ehc-visp.ch ↗" onPress={() => openUrl(LINKS.team)} style={{ flex: 0 }} />
      <Muted style={{ textAlign: 'center' }}>{PHOTO_CREDIT}</Muted>
    </Screen>
  );
}
