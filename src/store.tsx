import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

/*
 * App-Zustand. Im Prototyp lokal auf dem Gerät gespeichert.
 * Für die Store-Version: Konto, Tipps und Abo-Abgleich über ein Backend
 * (z.B. Supabase/Firebase + Schnittstelle zu SECANDA/Ticketing) ersetzen.
 */

export type Abo = { type: string; cat: string; sector: string; row: number; seat: number; nr: string; via: 'E-Mail' | 'Abo-Nummer' };
export type User = { first: string; last: string; email: string; news: boolean; abo: Abo | null };
type Tips = Record<string, { h: number; a: number }>;

type State = { user: User | null; accounts: Record<string, User>; tips: Tips; cart: Record<string, number> };
const KEY = 'ehcvisp-app-v1';
const initial: State = { user: null, accounts: {}, tips: {}, cart: {} };

// DEMO: ersetzt durch Abfrage beim Ticketing/SECANDA (E-Mail -> Abo)
export function findAboByEmail(email: string): Abo | null {
  const e = email.toLowerCase();
  if (/abo/.test(e) || e === 'info@ehc-visp.ch')
    return { type: 'Saisonabo 2026/27', cat: 'Abo All Inklusiv', sector: 'Tribüne B', row: 7, seat: 112, nr: '26-001871', via: 'E-Mail' };
  return null;
}
export const DEMO_CODE = '241941';
// Demo: Muster-Stand «Treue lohnt sich» für ein verknüpftes Abo
export const MY_VISITS = 3;

type Ctx = State & {
  set: (fn: (s: State) => State) => void;
  register: (u: Omit<User, 'abo'>) => User;
  login: (email: string) => boolean;
  logout: () => void;
  deleteAccount: () => void;
  linkAbo: (nr: string) => void;
  setTip: (id: string, side: 'h' | 'a', delta: number) => void;
  addToCart: (id: string, delta?: number) => void;
  clearCart: () => void;
};
const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [s, setS] = useState<State>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((raw) => { if (raw) try { setS({ ...initial, ...JSON.parse(raw) }); } catch {} }).finally(() => setReady(true));
  }, []);
  useEffect(() => { if (ready) AsyncStorage.setItem(KEY, JSON.stringify(s)).catch(() => {}); }, [s, ready]);

  const value = useMemo<Ctx>(() => ({
    ...s,
    set: (fn) => setS(fn),
    register: (u) => {
      const user: User = { ...u, abo: findAboByEmail(u.email) };
      setS((p) => ({ ...p, user, accounts: { ...p.accounts, [u.email.toLowerCase()]: user } }));
      return user;
    },
    login: (email) => {
      const u = s.accounts[email.toLowerCase()];
      if (!u) return false;
      setS((p) => ({ ...p, user: u }));
      return true;
    },
    logout: () => setS((p) => ({ ...p, user: null })),
    deleteAccount: () => setS((p) => {
      if (!p.user) return p;
      const accounts = { ...p.accounts }; delete accounts[p.user.email.toLowerCase()];
      return { ...p, user: null, accounts, tips: {} };
    }),
    linkAbo: (nr) => setS((p) => {
      if (!p.user) return p;
      const user = { ...p.user, abo: { type: 'Saisonabo 2026/27', cat: 'Abo All Inklusiv', sector: 'Tribüne B', row: 7, seat: 112, nr, via: 'Abo-Nummer' as const } };
      return { ...p, user, accounts: { ...p.accounts, [user.email.toLowerCase()]: user } };
    }),
    setTip: (id, side, delta) => setS((p) => {
      const t = p.tips[id] || { h: 0, a: 0 };
      return { ...p, tips: { ...p.tips, [id]: { ...t, [side]: Math.max(0, Math.min(15, t[side] + delta)) } } };
    }),
    addToCart: (id, delta = 1) => setS((p) => {
      const q = Math.max(0, (p.cart[id] || 0) + delta);
      const cart = { ...p.cart, [id]: q }; if (!q) delete cart[id];
      return { ...p, cart };
    }),
    clearCart: () => setS((p) => ({ ...p, cart: {} })),
  }), [s]);

  if (!ready) return null;
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error('useApp ausserhalb von AppProvider');
  return c;
}
