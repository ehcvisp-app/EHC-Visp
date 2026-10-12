import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { C, F } from '@/src/theme';
import { T } from '@/src/ui';

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: 'Nicht gefunden' }} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, gap: 12, backgroundColor: C.bg }}>
        <T style={{ fontFamily: F.black, fontSize: 18 }}>Diese Seite gibt es nicht.</T>
        <Link href="/"><T style={{ color: C.red, fontFamily: F.bodySemi }}>Zur Startseite</T></Link>
      </View>
    </>
  );
}
