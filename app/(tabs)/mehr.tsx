import { Ionicons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { Pressable, View, useWindowDimensions } from 'react-native';
import { LINKS } from '@/src/data';
import { useApp } from '@/src/store';
import { C, F } from '@/src/theme';
import { Screen, T, openUrl } from '@/src/ui';

export default function Mehr() {
  const { user } = useApp();
  const { width } = useWindowDimensions();
  const w = (Math.min(width, 600) - 32 - 12) / 2;
  const tiles: [keyof typeof Ionicons.glyphMap, string, string, () => void][] = [
    ['person-outline', user ? 'Mein Konto' : 'Anmelden', user ? user.email : 'Konto erstellen, Abo verknüpfen', () => router.push('/konto')],
    ['ticket-outline', 'Treue lohnt sich', 'Heimspiele sammeln, Playoff-Plätze gewinnen', () => router.push('/treue')],
    ['card-outline', 'Mein Abo', 'Digitales Abo in der SECANDA-App', () => router.push('/abo')],
    ['pricetag-outline', 'Tickets', 'Matchtickets für die Lonza Arena', () => router.push('/tickets')],
    ['people-outline', 'Team', 'Kader und Staff', () => router.push('/team')],
    ['newspaper-outline', 'News', 'Berichte und Club-News', () => router.push('/news')],
    ['chatbubbles-outline', 'Forum', 'Fans auf hockeyfans.ch', () => router.push('/forum')],
    ['globe-outline', 'Website', 'ehc-visp.ch', () => openUrl(LINKS.website)],
  ];
  return (
    <Screen>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        {tiles.map(([ic, t, s, on]) => (
          <Pressable key={t} onPress={on} style={({ pressed }) => [{ width: w, minHeight: 118, backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.line, padding: 14, gap: 10, opacity: pressed ? 0.8 : 1 }]}>
            <View style={{ width: 38, height: 38, borderRadius: 11, backgroundColor: C.redSoft, alignItems: 'center', justifyContent: 'center' }}><Ionicons name={ic} size={21} color={C.red} /></View>
            <T style={{ fontFamily: F.display, fontSize: 15 }}>{t}</T>
            <T style={{ fontSize: 12.5, color: C.muted }} numberOfLines={2}>{s}</T>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
