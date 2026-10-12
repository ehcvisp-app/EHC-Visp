import { Image, Pressable, View } from 'react-native';
import { LINKS, PRODUCTS, chf } from '@/src/data';
import { SHOP_IMG } from '@/src/images';
import { useApp } from '@/src/store';
import { C, F } from '@/src/theme';
import { Btn, Card, Li, Muted, Screen, T, openUrl } from '@/src/ui';

export default function Warenkorb() {
  const { cart, addToCart } = useApp();
  const items = Object.entries(cart).filter(([, q]) => q > 0);
  const sum = items.reduce((a, [id, q]) => a + PRODUCTS.find((x) => x.id === id)!.p * q, 0);
  if (!items.length) return <Screen><Muted>Dein Warenkorb ist leer.</Muted></Screen>;
  const b = { width: 30, height: 30, borderRadius: 9, borderWidth: 1, borderColor: C.line, alignItems: 'center' as const, justifyContent: 'center' as const };
  return (
    <Screen>
      <Card style={{ gap: 0 }}>
        {items.map(([id, q], i) => {
          const p = PRODUCTS.find((x) => x.id === id)!;
          return (
            <Li key={id} last={i === items.length - 1}>
              <Image source={SHOP_IMG[id]} style={{ width: 52, height: 52, borderRadius: 10, backgroundColor: C.tile }} />
              <View style={{ flex: 1 }}><T style={{ fontFamily: F.bodySemi }}>{p.n}</T><Muted>{chf(p.p)}</Muted></View>
              <Pressable style={b} onPress={() => addToCart(id, -1)} accessibilityLabel="weniger"><T>−</T></Pressable>
              <T style={{ fontFamily: F.black, width: 20, textAlign: 'center' }}>{q}</T>
              <Pressable style={b} onPress={() => addToCart(id, 1)} accessibilityLabel="mehr"><T>+</T></Pressable>
            </Li>
          );
        })}
      </Card>
      <Card style={{ gap: 0 }}>
        <Li><T style={{ flex: 1 }}>Abholung Geschäftsstelle oder am Match</T><T>gratis</T></Li>
        <Li last><T style={{ flex: 1, fontFamily: F.bodyBold }}>Total</T><T style={{ fontFamily: F.bodyBold, fontSize: 18 }}>{chf(sum)}</T></Li>
      </Card>
      <Muted>Bestellt und bezahlt wird im Webshop von ehc-visp.ch. Ausgabe nach Zahlung.</Muted>
      <Btn title="Im Webshop bestellen ↗" onPress={() => openUrl(LINKS.shop)} style={{ flex: 0 }} />
    </Screen>
  );
}
