import { router } from 'expo-router';
import { Image, View } from 'react-native';
import { LINKS, TREUE } from '@/src/data';
import { CREST } from '@/src/images';
import { MY_VISITS, useApp } from '@/src/store';
import { C, F } from '@/src/theme';
import { Btn, Card, Li, Muted, Screen, T, Tag, openUrl } from '@/src/ui';
import { SecandaButtons } from '@/src/components';

export default function Abo() {
  const { user } = useApp();
  if (!user || !user.abo) {
    return (
      <Screen>
        <Card>
          <Tag>Saisonabo</Tag>
          <T style={{ fontFamily: F.bodyBold }}>{user ? 'Zu deinem Konto ist noch kein Abo verknüpft.' : 'Melde dich an, um dein Saisonabo zu verknüpfen.'}</T>
          <Btn title={user ? 'Abo verknüpfen' : 'Anmelden'} onPress={() => router.push('/konto')} style={{ flex: 0 }} />
        </Card>
        <Card><T style={{ fontFamily: F.bodyBold }}>Digitales Abo in der SECANDA-App</T><SecandaButtons /></Card>
      </Screen>
    );
  }
  const a = user.abo;
  return (
    <Screen>
      <Muted>Am Eingang zeigst du dein digitales Abo in der SECANDA-App vor. Hier siehst du deine Abo-Daten.</Muted>
      <View style={{ backgroundColor: C.night, borderRadius: 20, padding: 16, gap: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Image source={CREST} style={{ width: 40, height: 50 }} resizeMode="contain" />
          <View><T style={{ color: '#fff', fontFamily: F.black, fontSize: 18 }}>SAISONABO 2026/27</T><T style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Lonza Arena Visp · Swiss League</T></View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          {[['Sektor', a.sector], ['Reihe', String(a.row)], ['Platz', String(a.seat)]].map(([k, v]) => (
            <View key={k} style={{ flex: 1 }}><T style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, letterSpacing: 1.2 }}>{k.toUpperCase()}</T><T style={{ color: '#fff', fontFamily: F.display, fontSize: 16 }}>{v}</T></View>
          ))}
        </View>
        <T style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>{user.first} {user.last} · Abo-Nr. {a.nr}</T>
      </View>
      <T style={{ fontFamily: F.bodyBold }}>In der SECANDA-App öffnen</T>
      <SecandaButtons />
      <Btn kind="line" title="Im Browser bei SECANDA anmelden ↗" onPress={() => openUrl(LINKS.secandaWeb)} style={{ flex: 0 }} />
      <Card style={{ gap: 0 }}>
        <Li last onPress={() => router.push('/treue')}><T style={{ flex: 1 }}>Treue lohnt sich: besuchte Heimspiele</T><T style={{ fontFamily: F.black }}>{MY_VISITS} / {TREUE.total}</T><T style={{ color: C.muted }}> ›</T></Li>
      </Card>
    </Screen>
  );
}
