import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, View } from 'react-native';
import { LINKS, PHOTO_CREDIT, ROSTER, STAFF } from '@/src/data';
import { PLAYER_IMG, STAFF_IMG } from '@/src/images';
import { C, F } from '@/src/theme';
import { Btn, Card, Li, Muted, Screen, T, openUrl } from '@/src/ui';

export default function Spieler() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const staff = id?.startsWith('s-') ? STAFF.find((s) => 's-' + s.key === id) : undefined;
  const p = staff ? undefined : ROSTER.find((x) => String(x.n) === id);
  const img = staff ? STAFF_IMG[staff.key] : p ? PLAYER_IMG[String(p.n)] : undefined;
  const title = staff ? staff.name : p ? `#${p.n} ${p.name}` : 'Unbekannt';
  const rows: [string, string][] = staff
    ? ([['Funktion', staff.role], staff.born ? ['Geburtstag', staff.born] : null, staff.nat ? ['Nation', staff.nat] : null].filter(Boolean) as [string, string][])
    : p ? [['Position', p.pos], ['Jahrgang', String(p.y)], ['Grösse', `${p.h} cm`], ['Nation', p.nat]] : [];
  return (
    <Screen pad={false}>
      <Stack.Screen options={{ title }} />
      {img ? <Image source={img} style={{ width: '100%', aspectRatio: 3 / 4, maxHeight: 520 }} resizeMode="cover" /> : null}
      <View style={{ paddingHorizontal: 16, gap: 14 }}>
        <T style={{ fontFamily: F.black, fontSize: 22 }}>{title}</T>
        {p?.inj ? <T style={{ color: C.red, fontFamily: F.display }}>SAISONENDE (VERLETZT)</T> : null}
        <Card style={{ gap: 0 }}>{rows.map(([k, v], i) => <Li key={k} last={i === rows.length - 1}><T style={{ flex: 1 }}>{k}</T><T style={{ fontFamily: F.bodySemi }}>{v}</T></Li>)}</Card>
        {p ? <><Muted>Tore, Assists und Plus/Minus kommen in der fertigen App aus den SIHF-Statistiken.</Muted><Btn kind="line" title="Statistiken im SIHF Game Center ↗" onPress={() => openUrl(LINKS.live)} style={{ flex: 0 }} /></> : null}
        {img ? <Muted style={{ textAlign: 'center' }}>{PHOTO_CREDIT}</Muted> : null}
      </View>
    </Screen>
  );
}
