import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import { LINKS, PRODUCTS, chf } from '@/src/data';
import { SHOP_IMG } from '@/src/images';
import { useApp } from '@/src/store';
import { C, F } from '@/src/theme';
import { Btn, Card, Li, Muted, Screen, T, openUrl } from '@/src/ui';

const CATS = ['Alle', 'Trikots', 'Textilien', 'Accessoires', 'Sale'] as const;

export default function Shop() {
  const [cat, setCat] = useState<(typeof CATS)[number]>('Alle');
  const { addToCart, cart } = useApp();
  const { width } = useWindowDimensions();
  const w = (Math.min(width, 600) - 16 * 2 - 12) / 2;
  const list = PRODUCTS.filter((p) => cat === 'Alle' || p.cat === cat || (cat === 'Sale' && p.old));
  const n = Object.values(cart).reduce((a, b) => a + b, 0);
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <Screen>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }} style={{ marginHorizontal: -16 }}>
          {CATS.map((c) => (
            <Pressable key={c} onPress={() => setCat(c)} style={{ paddingHorizontal: 13, paddingVertical: 7, borderRadius: 999, borderWidth: 1, borderColor: cat === c ? C.fg : C.line, backgroundColor: cat === c ? C.fg : C.card }}>
              <T style={{ fontFamily: F.bodySemi, fontSize: 13, color: cat === c ? '#fff' : C.fg }}>{c}</T>
            </Pressable>
          ))}
        </ScrollView>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {list.map((p) => (
            <View key={p.id} style={{ width: w, backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.line, overflow: 'hidden' }}>
              <Pressable onPress={() => openUrl(LINKS.shop)} style={{ width: w, height: w, backgroundColor: C.tile }}>
                <Image source={SHOP_IMG[p.id]} style={{ width: '100%', height: '100%' }} />
                {p.badge ? <View style={{ position: 'absolute', top: 8, left: 8, backgroundColor: C.red, borderRadius: 5, paddingHorizontal: 6, paddingVertical: 3 }}><T style={{ color: '#fff', fontFamily: F.display, fontSize: 10 }}>{p.badge.toUpperCase()}</T></View> : null}
              </Pressable>
              <View style={{ padding: 10, gap: 6, flex: 1 }}>
                <T style={{ fontFamily: F.bodySemi, fontSize: 14 }} numberOfLines={2}>{p.n}</T>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <T style={{ fontFamily: F.bodyBold }}>{p.from ? 'ab ' : ''}{chf(p.p)}{p.old ? <T style={{ color: C.muted, textDecorationLine: 'line-through', fontSize: 12 }}> {chf(p.old)}</T> : null}</T>
                  <Pressable onPress={() => addToCart(p.id)} accessibilityLabel={`${p.n} in den Warenkorb`} style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: C.red, alignItems: 'center', justifyContent: 'center' }}>
                    <T style={{ color: '#fff', fontSize: 20 }}>+</T>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
        <Card style={{ gap: 0 }}>
          <Li><View style={{ flex: 1 }}><T style={{ fontFamily: F.bodySemi }}>Fanshop Geschäftsstelle</T><Muted>Torweg 3, 3930 Visp · Mo–Fr 14–17 Uhr</Muted></View></Li>
          <Li last><View style={{ flex: 1 }}><T style={{ fontFamily: F.bodySemi }}>An jedem Spiel</T><Muted>Fanshop bei Heim- und Auswärtsspielen der 1. Mannschaft</Muted></View></Li>
        </Card>
      </Screen>
      {n > 0 && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, paddingHorizontal: 16, backgroundColor: C.card, borderTopWidth: 1, borderTopColor: C.line }}>
          <View style={{ flex: 1 }}><T style={{ fontFamily: F.bodyBold }}>{n} Artikel</T><Muted>{chf(Object.entries(cart).reduce((a, [id, q]) => a + PRODUCTS.find((x) => x.id === id)!.p * q, 0))}</Muted></View>
          <Btn title="Zum Warenkorb" onPress={() => router.push('/warenkorb')} style={{ flex: 0 }} />
        </View>
      )}
    </View>
  );
}
