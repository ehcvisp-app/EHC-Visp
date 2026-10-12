import { Barlow_400Regular, Barlow_500Medium, Barlow_600SemiBold, Barlow_700Bold } from '@expo-google-fonts/barlow';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AppProvider } from '@/src/store';
import { C, F } from '@/src/theme';

export { ErrorBoundary } from 'expo-router';
export const unstable_settings = { initialRouteName: '(tabs)' };
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Akute-Regular': require('../assets/fonts/Akute-Regular.ttf'),
    'Akute-Bold': require('../assets/fonts/Akute-Bold.ttf'),
    'Akute-Black': require('../assets/fonts/Akute-Black.ttf'),
    Barlow_400Regular, Barlow_500Medium, Barlow_600SemiBold, Barlow_700Bold,
  });
  useEffect(() => { if (error) throw error; }, [error]);
  useEffect(() => { if (loaded) SplashScreen.hideAsync(); }, [loaded]);
  if (!loaded) return null;
  return (
    <AppProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{
        headerStyle: { backgroundColor: C.night }, headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: F.black, fontSize: 17 }, headerBackTitle: 'Zurück',
        contentStyle: { backgroundColor: C.bg },
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="konto" options={{ title: 'Mein Konto' }} />
        <Stack.Screen name="abo" options={{ title: 'Mein Saisonabo' }} />
        <Stack.Screen name="treue" options={{ title: 'Treue lohnt sich' }} />
        <Stack.Screen name="team" options={{ title: '1. Mannschaft' }} />
        <Stack.Screen name="spieler/[id]" options={{ title: 'Spieler', presentation: 'modal' }} />
        <Stack.Screen name="warenkorb" options={{ title: 'Warenkorb', presentation: 'modal' }} />
        <Stack.Screen name="tickets" options={{ title: 'Tickets' }} />
        <Stack.Screen name="news" options={{ title: 'News' }} />
        <Stack.Screen name="forum" options={{ title: 'Fan-Forum' }} />
      </Stack>
    </AppProvider>
  );
}
