import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { TeamCode } from './data';
import { CREST, LOGO_IMG } from './images';
import { C, F } from './theme';

export const openUrl = (url: string) => WebBrowser.openBrowserAsync(url).catch(() => {});

export function Screen({ children, pad = true }: { children: React.ReactNode; pad?: boolean }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ padding: pad ? 16 : 0, gap: 16, paddingBottom: 40 }}>
      {children}
    </ScrollView>
  );
}

export function T({ style, children, ...rest }: { style?: TextStyle | TextStyle[]; children: React.ReactNode; numberOfLines?: number }) {
  return <Text style={[{ fontFamily: F.body, fontSize: 15, color: C.fg }, style as any]} {...rest}>{children}</Text>;
}
export const Muted = ({ children, style }: { children: React.ReactNode; style?: TextStyle }) => <T style={[{ color: C.muted, fontSize: 13 }, style || {}]}>{children}</T>;

export function H({ children, right, onRight }: { children: React.ReactNode; right?: string; onRight?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: -6 }}>
      <T style={{ fontFamily: F.black, fontSize: 17, letterSpacing: 0.5, textTransform: 'uppercase' }}>{children}</T>
      {right ? <Pressable onPress={onRight} hitSlop={8}><T style={{ color: C.red, fontFamily: F.bodySemi, fontSize: 13 }}>{right}</T></Pressable> : null}
    </View>
  );
}

export function Card({ children, style, dark, onPress }: { children: React.ReactNode; style?: ViewStyle; dark?: boolean; onPress?: () => void }) {
  const st = [s.card, dark && { backgroundColor: C.night, borderColor: C.night }, style];
  return onPress ? <Pressable onPress={onPress} style={({ pressed }) => [...st, pressed && { opacity: 0.8 }]}>{children}</Pressable> : <View style={st}>{children}</View>;
}

export function Btn({ title, onPress, kind = 'red', icon, style, disabled }: { title: string; onPress?: () => void; kind?: 'red' | 'line' | 'white' | 'ghost'; icon?: keyof typeof Ionicons.glyphMap; style?: ViewStyle; disabled?: boolean }) {
  const bg = kind === 'red' ? C.red : kind === 'white' ? '#fff' : kind === 'ghost' ? 'rgba(255,255,255,0.14)' : 'transparent';
  const fg = kind === 'red' ? '#fff' : kind === 'white' ? C.redDeep : kind === 'ghost' ? '#fff' : C.fg;
  return (
    <Pressable disabled={disabled} onPress={onPress} accessibilityRole="button"
      style={({ pressed }) => [s.btn, { backgroundColor: bg, borderWidth: kind === 'line' || kind === 'ghost' ? 1.5 : 0, borderColor: kind === 'ghost' ? 'rgba(255,255,255,0.3)' : C.line, opacity: disabled ? 0.45 : pressed ? 0.8 : 1 }, style]}>
      {icon ? <Ionicons name={icon} size={17} color={fg} /> : null}
      <T style={{ color: fg, fontFamily: F.display, fontSize: 14, letterSpacing: 0.4 }}>{title}</T>
    </Pressable>
  );
}

export function Badge({ code, size = 30 }: { code: TeamCode; size?: number }) {
  if (code === 'VIS') return <Image source={CREST} style={{ width: size, height: size }} resizeMode="contain" />;
  const src = LOGO_IMG[code];
  return (
    <View style={{ width: size, height: size, borderRadius: size * 0.27, backgroundColor: '#fff', padding: size * 0.1, borderWidth: 1, borderColor: C.line }}>
      {src ? <Image source={src} style={{ width: size * 0.8 - 2, height: size * 0.8 - 2 }} resizeMode="contain" /> : <T style={{ fontFamily: F.black, fontSize: size * 0.33, textAlign: 'center' }}>{code}</T>}
    </View>
  );
}

export function Row({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[{ flexDirection: 'row', gap: 8 }, style]}>{children}</View>;
}

export function Li({ children, last, onPress }: { children: React.ReactNode; last?: boolean; onPress?: () => void }) {
  const st = [s.li, last && { borderBottomWidth: 0 }];
  return onPress ? <Pressable onPress={onPress} style={st}>{children}</Pressable> : <View style={st}>{children}</View>;
}

export function Tag({ children, color = C.red }: { children: React.ReactNode; color?: string }) {
  return <T style={{ fontFamily: F.display, fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase', color }}>{children}</T>;
}

export function Demo({ children }: { children: React.ReactNode }) {
  return <View style={s.demo}><T style={{ fontSize: 10.5, letterSpacing: 0.8, textTransform: 'uppercase', color: C.muted, fontFamily: F.bodySemi }}>{children}</T></View>;
}

export function Progress({ value, height = 10, track = C.line }: { value: number; height?: number; track?: string }) {
  return (
    <View style={{ height, borderRadius: height / 2, backgroundColor: track, overflow: 'hidden' }}>
      <View style={{ width: `${Math.max(0, Math.min(100, value * 100))}%`, height: '100%', backgroundColor: C.red }} />
    </View>
  );
}

export function Seg<T extends string>({ items, value, onChange }: { items: [T, string][]; value: T; onChange: (v: T) => void }) {
  return (
    <View style={s.seg}>
      {items.map(([k, l]) => (
        <Pressable key={k} onPress={() => onChange(k)} style={[s.segBtn, value === k && { backgroundColor: C.red }]} accessibilityState={{ selected: value === k }}>
          <Text style={{ fontFamily: F.display, fontSize: 13, color: value === k ? '#fff' : C.muted }}>{l}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export const s = StyleSheet.create({
  card: { backgroundColor: C.card, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: C.line, gap: 10 },
  btn: { flexDirection: 'row', gap: 7, alignItems: 'center', justifyContent: 'center', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, flex: 1 },
  li: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: C.line },
  demo: { borderWidth: 1, borderStyle: 'dashed', borderColor: C.line, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 1, alignSelf: 'flex-start' },
  seg: { flexDirection: 'row', backgroundColor: C.card, borderWidth: 1, borderColor: C.line, borderRadius: 12, padding: 4, gap: 4 },
  segBtn: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 9 },
  input: { fontFamily: F.body, fontSize: 16, padding: 12, borderRadius: 12, borderWidth: 1.5, borderColor: C.line, backgroundColor: C.card, color: C.fg },
});
