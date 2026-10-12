import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Switch, TextInput, View } from 'react-native';
import { LINKS, TREUE } from '@/src/data';
import { DEMO_CODE, MY_VISITS, findAboByEmail, useApp } from '@/src/store';
import { C, F } from '@/src/theme';
import { Btn, Card, Demo, Li, Muted, Row, Screen, Seg, T, Tag, openUrl, s } from '@/src/ui';
import { SecandaButtons } from '@/src/components';

const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

function Field({ label, ...p }: { label: string } & React.ComponentProps<typeof TextInput>) {
  return (
    <View style={{ gap: 5, flex: 1 }}>
      <T style={{ fontSize: 12, fontFamily: F.bodySemi, color: C.muted }}>{label}</T>
      <TextInput style={s.input} placeholderTextColor={C.muted} {...p} />
    </View>
  );
}

export default function Konto() {
  const app = useApp();
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [step, setStep] = useState<'form' | 'code' | 'check' | 'done'>('form');
  const [f, setF] = useState({ first: '', last: '', email: '', terms: false, news: false, code: '', nr: '' });
  const [err, setErr] = useState('');
  const [confirm, setConfirm] = useState<'' | 'logout' | 'delete'>('');
  const up = (k: keyof typeof f) => (v: any) => setF((o) => ({ ...o, [k]: v }));

  // Eingeloggt
  if (app.user && step !== 'check') {
    const u = app.user, a = u.abo;
    return (
      <Screen>
        {step === 'done' && (
          <Card style={{ borderColor: a ? C.ok : C.line }}>
            <Tag color={a ? C.ok : C.muted}>{a ? '✓ Saisonabo gefunden' : 'Kein Abo gefunden'}</Tag>
            <T style={{ fontFamily: F.bodyBold, fontSize: 18 }}>{a ? `Hallo ${u.first}, dein Abo ist verknüpft.` : `Willkommen, ${u.first}! Dein Konto ist erstellt.`}</T>
            {!a && <T style={{ fontSize: 14 }}>Zu {u.email} haben wir kein Saisonabo gefunden. Du kannst trotzdem tippen und im Fanshop einkaufen.</T>}
          </Card>
        )}
        <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: C.red, alignItems: 'center', justifyContent: 'center' }}>
            <T style={{ color: '#fff', fontFamily: F.black, fontSize: 20 }}>{(u.first[0] || '') + (u.last[0] || '')}</T>
          </View>
          <View style={{ flex: 1 }}>
            <T style={{ fontFamily: F.bodyBold, fontSize: 17 }}>{u.first} {u.last}</T>
            <Muted>{u.email}</Muted>
            <T style={{ color: C.ok, fontSize: 13, fontFamily: F.bodySemi }}>✓ E-Mail bestätigt</T>
          </View>
        </Card>
        {a ? (
          <Card style={{ borderColor: C.ok }}>
            <Tag color={C.ok}>Abo verknüpft · über {a.via}</Tag>
            <T style={{ fontFamily: F.bodyBold, fontSize: 16 }}>{a.type}</T>
            <View>
              <Li><T style={{ flex: 1 }}>Kategorie</T><T style={{ fontFamily: F.bodySemi }}>{a.cat}</T></Li>
              <Li><T style={{ flex: 1 }}>Platz</T><T style={{ fontFamily: F.bodySemi }}>{a.sector} · R{a.row} · P{a.seat}</T></Li>
              <Li last><T style={{ flex: 1 }}>Abo-Nr.</T><T style={{ fontFamily: F.bodySemi }}>{a.nr}</T></Li>
            </View>
            <Row>
              <Btn title={`Treue · ${MY_VISITS}/${TREUE.total}`} onPress={() => router.push('/treue')} />
              <Btn kind="line" title="Abo anzeigen" onPress={() => router.push('/abo')} />
            </Row>
          </Card>
        ) : (
          <Card>
            <Tag color={C.muted}>Kein Abo verknüpft</Tag>
            <T style={{ fontSize: 14 }}>Hast du dein Abo mit einer anderen E-Mail gekauft? Dann verknüpfe es mit der Abo-Nummer.</T>
            <Field label="Abo-Nummer (Abokarte oder SECANDA-App)" value={f.nr} onChangeText={up('nr')} placeholder="z.B. 26-001871" keyboardType="numbers-and-punctuation" />
            {err ? <T style={{ color: C.red, fontSize: 13, fontFamily: F.bodySemi }}>{err}</T> : null}
            <Row>
              <Btn title="Abo verknüpfen" onPress={() => { if (f.nr.replace(/\D/g, '').length < 6) return setErr('Bitte die Abo-Nummer vollständig eingeben (mindestens 6 Ziffern).'); setErr(''); app.linkAbo(f.nr); }} />
              <Btn kind="line" title="Abo kaufen ↗" onPress={() => openUrl(LINKS.tickets)} />
            </Row>
          </Card>
        )}
        <Card>
          <T style={{ fontFamily: F.bodyBold }}>Digitales Abo</T>
          <T style={{ fontSize: 14 }}>Dein digitales Abo öffnest du in der SECANDA-App. Dort zeigst du es am Eingang vor, und jeder Scan zählt für «Treue lohnt sich».</T>
          <SecandaButtons />
        </Card>
        {confirm === 'logout' ? <Btn kind="line" title="Wirklich abmelden?" onPress={() => { app.logout(); setConfirm(''); setStep('form'); setMode('login'); }} style={{ flex: 0, borderColor: C.red }} />
          : <Btn kind="line" title="Abmelden" onPress={() => setConfirm('logout')} style={{ flex: 0 }} />}
        {confirm === 'delete' ? <Btn kind="line" title="Konto und Daten endgültig löschen" onPress={() => { app.deleteAccount(); setConfirm(''); setStep('form'); }} style={{ flex: 0, borderColor: C.red }} />
          : <Pressable onPress={() => setConfirm('delete')}><T style={{ color: C.red, textAlign: 'center', fontSize: 13, fontFamily: F.bodySemi }}>Konto löschen</T></Pressable>}
        <Muted>Prototyp: Das Konto wird nur auf diesem Gerät gespeichert, der Abo-Abgleich ist simuliert.</Muted>
      </Screen>
    );
  }

  if (step === 'check') {
    return (
      <Screen>
        <Card style={{ alignItems: 'center', paddingVertical: 30, gap: 14 }}>
          <ActivityIndicator size="large" color={C.red} />
          <T style={{ fontFamily: F.bodyBold, textAlign: 'center' }}>Wir prüfen, ob zu deiner E-Mail ein Saisonabo gehört …</T>
          <Muted>{f.email}</Muted>
        </Card>
      </Screen>
    );
  }

  if (step === 'code') {
    return (
      <Screen>
        <Card>
          <T style={{ fontFamily: F.black, fontSize: 18 }}>E-Mail bestätigen</T>
          <T style={{ fontSize: 14 }}>Wir haben einen 6-stelligen Code an {f.email} geschickt.</T>
          <TextInput style={[s.input, { fontFamily: F.black, fontSize: 24, letterSpacing: 8, textAlign: 'center' }]} value={f.code} onChangeText={up('code')}
            keyboardType="number-pad" maxLength={6} autoComplete="one-time-code" textContentType="oneTimeCode" placeholder="••••••" placeholderTextColor={C.muted} autoFocus />
          {err ? <T style={{ color: C.red, fontSize: 13, fontFamily: F.bodySemi }}>{err}</T> : null}
          <Btn title="Bestätigen" style={{ flex: 0 }} onPress={() => {
            if (f.code.trim() !== DEMO_CODE) return setErr('Der Code stimmt nicht. Prüfe die E-Mail und versuche es nochmals.');
            setErr('');
            if (mode === 'login') { app.login(f.email); setStep('form'); return; }
            setStep('check');
            setTimeout(() => { app.register({ first: f.first, last: f.last, email: f.email, news: f.news }); setStep('done'); }, 1600);
          }} />
          <Demo>Demo-Code: {DEMO_CODE}</Demo>
          <Pressable onPress={() => { setStep('form'); setErr(''); }}><T style={{ color: C.red, fontFamily: F.bodySemi }}>‹ Andere E-Mail verwenden</T></Pressable>
        </Card>
      </Screen>
    );
  }

  const reg = mode === 'register';
  const submit = () => {
    const email = f.email.trim();
    if (reg && (!f.first.trim() || !f.last.trim())) return setErr('Bitte Vor- und Nachname angeben.');
    if (!validEmail(email)) return setErr('Bitte eine gültige E-Mail-Adresse eingeben, z.B. name@beispiel.ch.');
    if (reg && !f.terms) return setErr('Bitte akzeptiere die Nutzungsbedingungen, um ein Konto zu erstellen.');
    const known = app.accounts[email.toLowerCase()];
    if (!reg && !known) return setErr('Zu dieser E-Mail gibt es noch kein Konto. Erstelle zuerst eines.');
    if (reg && known) return setErr('Zu dieser E-Mail gibt es schon ein Konto. Melde dich an.');
    setErr(''); setF((o) => ({ ...o, email, code: '' })); setStep('code');
  };
  return (
    <Screen>
      <Seg items={[['register', 'Konto erstellen'], ['login', 'Anmelden']]} value={mode} onChange={(m) => { setMode(m); setErr(''); }} />
      <Card style={{ gap: 12 }}>
        <T style={{ fontFamily: F.black, fontSize: 18 }}>{reg ? 'Werde Teil der Visper Löwen' : 'Willkommen zurück'}</T>
        <Muted>{reg ? 'Mit deinem Konto sammelst du Heimspiele für «Treue lohnt sich», tippst mit und kaufst schneller im Fanshop.' : 'Gib deine E-Mail ein. Wir schicken dir einen Code, ein Passwort brauchst du nicht.'}</Muted>
        {reg && <Row style={{ gap: 10 }}><Field label="Vorname" value={f.first} onChangeText={up('first')} autoComplete="given-name" textContentType="givenName" /><Field label="Nachname" value={f.last} onChangeText={up('last')} autoComplete="family-name" textContentType="familyName" /></Row>}
        <Field label="E-Mail" value={f.email} onChangeText={up('email')} placeholder="name@beispiel.ch" keyboardType="email-address" autoCapitalize="none" autoComplete="email" textContentType="emailAddress" />
        {reg && (
          <>
            <Muted>Wir prüfen automatisch, ob zu dieser E-Mail ein Saisonabo gehört, und verknüpfen es mit deinem Konto.</Muted>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><Switch value={f.terms} onValueChange={up('terms')} trackColor={{ true: C.red, false: C.line }} /><T style={{ flex: 1, fontSize: 13 }}>Ich akzeptiere die Nutzungsbedingungen und die Datenschutzerklärung.</T></View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><Switch value={f.news} onValueChange={up('news')} trackColor={{ true: C.red, false: C.line }} /><T style={{ flex: 1, fontSize: 13 }}>Fan-Newsletter mit News und Aktionen erhalten</T></View>
          </>
        )}
        {err ? <T style={{ color: C.red, fontSize: 13, fontFamily: F.bodySemi }}>{err}</T> : null}
        <Btn title={reg ? 'Konto erstellen' : 'Code anfordern'} onPress={submit} style={{ flex: 0 }} />
        <Demo>Demo: E-Mails mit «abo» haben ein Saisonabo</Demo>
      </Card>
    </Screen>
  );
}
