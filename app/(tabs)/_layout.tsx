import { Ionicons } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import { TREUE } from '@/src/data';
import { CREST } from '@/src/images';
import { MY_VISITS, useApp } from '@/src/store';
import { C, F } from '@/src/theme';

function HeaderTitle() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <Image source={CREST} style={{ width: 34, height: 44 }} resizeMode="contain" />
      <View>
        <Text style={{ fontFamily: F.black, fontSize: 18, color: '#fff', letterSpacing: 0.6 }}>EHC VISP</Text>
        <Text style={{ fontFamily: F.display, fontSize: 10, color: '#AEB4BD', letterSpacing: 1.6 }}>FAN-APP · SAISON 26/27</Text>
      </View>
    </View>
  );
}
function AccountChip() {
  const { user } = useApp();
  const label = !user ? 'Anmelden' : user.abo ? `${MY_VISITS}/${TREUE.total}` : user.first;
  return (
    <Pressable onPress={() => router.push(user?.abo ? '/treue' : '/konto')} accessibilityLabel="Mein Konto"
      style={{ marginRight: 14, backgroundColor: C.red, borderRadius: 999, paddingHorizontal: 11, paddingVertical: 6, flexDirection: 'row', gap: 6, alignItems: 'center' }}>
      <Ionicons name={user?.abo ? 'ticket-outline' : 'person-outline'} size={14} color="#fff" />
      <Text style={{ fontFamily: F.display, color: '#fff', fontSize: 13 }}>{label}</Text>
    </Pressable>
  );
}
const icon = (n: keyof typeof Ionicons.glyphMap) => ({ color }: { color: any }) => <Ionicons name={n} size={23} color={color} />;

export default function TabLayout() {
  const { cart } = useApp();
  const n = Object.values(cart).reduce((a, b) => a + b, 0);
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: C.red, tabBarInactiveTintColor: C.muted,
      tabBarLabelStyle: { fontFamily: F.bodySemi, fontSize: 11 },
      headerStyle: { backgroundColor: C.night, borderBottomWidth: 3, borderBottomColor: C.red }, headerTitleAlign: 'left',
      headerTitle: () => <HeaderTitle />, headerRight: () => <AccountChip />,
    }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: icon('home-outline') }} />
      <Tabs.Screen name="spiele" options={{ title: 'Spiele', tabBarIcon: icon('calendar-outline') }} />
      <Tabs.Screen name="tippspiel" options={{ title: 'Tippspiel', tabBarIcon: icon('time-outline') }} />
      <Tabs.Screen name="shop" options={{ title: 'Shop', tabBarIcon: icon('bag-outline'), tabBarBadge: n || undefined, tabBarBadgeStyle: { backgroundColor: C.red } }} />
      <Tabs.Screen name="mehr" options={{ title: 'Mehr', tabBarIcon: icon('ellipsis-horizontal') }} />
    </Tabs>
  );
}
