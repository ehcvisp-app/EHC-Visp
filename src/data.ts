// Inhalte Stand 12.10.2026 (Quelle: ehc-visp.ch). In der fertigen App kommen sie aus einem Backend/CMS.

export type TeamCode = 'VIS' | 'CHU' | 'THU' | 'BEL' | 'SIE' | 'BAS' | 'LCF' | 'GCK' | 'OLT' | 'ARO';

export const TEAMS: Record<TeamCode, string> = {
  VIS: 'EHC Visp', CHU: 'EHC Chur', THU: 'HC Thurgau', BEL: 'GDT Bellinzona Snakes', SIE: 'HC Sierre',
  BAS: 'EHC Basel', LCF: 'HC La Chaux-de-Fonds', GCK: 'GCK Lions', OLT: 'EHC Olten', ARO: 'EHC Arosa',
};
export const SHORT: Record<TeamCode, string> = {
  VIS: 'Visp', CHU: 'Chur', THU: 'Thurgau', BEL: 'Bellinzona', SIE: 'Sierre', BAS: 'Basel',
  LCF: 'La Chaux-de-Fonds', GCK: 'GCK Lions', OLT: 'Olten', ARO: 'Arosa',
};
const VENUE: Record<TeamCode, string> = {
  VIS: 'Lonza Arena', SIE: 'Patinoire Graben, Sierre', ARO: 'Sport- und Kongresszentrum Arosa', OLT: 'Eisbahn Kleinholz, Olten',
  CHU: 'Thomas Domenig Stadion, Chur', THU: 'Güttingersreuti, Weinfelden', BEL: 'Centro Sportivo, Bellinzona',
  GCK: 'Kunsteisbahn Küsnacht', BAS: 'St. Jakob Arena, Basel', LCF: 'Patinoire des Mélèzes, La Chaux-de-Fonds',
};

export type Game = { id: string; h: TeamCode; a: TeamCode; d: string; venue: string };
const RAW = `13.10.2026 19:30 VIS CHU|17.10.2026 19:00 VIS THU|20.10.2026 19:30 VIS BEL|24.10.2026 18:00 SIE VIS|31.10.2026 19:00 VIS GCK|10.11.2026 19:30 ARO VIS|13.11.2026 19:30 VIS BAS|15.11.2026 17:30 OLT VIS|17.11.2026 19:30 VIS LCF|20.11.2026 20:00 CHU VIS|21.11.2026 18:00 THU VIS|27.11.2026 19:30 VIS SIE|29.11.2026 17:00 BEL VIS|01.12.2026 20:00 GCK VIS|04.12.2026 19:30 VIS ARO|06.12.2026 16:30 BAS VIS|15.12.2026 19:30 VIS OLT|18.12.2026 19:45 LCF VIS|20.12.2026 17:00 VIS CHU|23.12.2026 19:45 THU VIS|27.12.2026 16:00 SIE VIS|29.12.2026 19:30 VIS SIE|03.01.2027 17:00 VIS GCK|05.01.2027 19:30 ARO VIS|09.01.2027 19:00 VIS BAS|12.01.2027 19:45 OLT VIS|15.01.2027 19:30 VIS LCF|17.01.2027 14:00 VIS CHU|23.01.2027 18:30 CHU VIS|24.01.2027 17:00 BEL VIS|29.01.2027 19:45 SIE VIS|31.01.2027 17:00 VIS GCK|02.02.2027 19:30 VIS OLT|04.02.2027 20:15 BEL VIS|07.02.2027 17:00 VIS BAS|14.02.2027 17:00 VIS THU|18.02.2027 19:45 VIS LCF|20.02.2027 19:00 ARO VIS`;
export const GAMES: Game[] = RAW.split('|').map((s, i) => {
  const [d, t, h, a] = s.split(' ');
  const [dd, mm, yy] = d.split('.');
  const summer = yy === '2026' && (+mm < 10 || (mm === '10' && +dd < 25));
  return { id: 'g' + (i + 1), h: h as TeamCode, a: a as TeamCode, d: `${yy}-${mm}-${dd}T${t}:00${summer ? '+02:00' : '+01:00'}`, venue: VENUE[h as TeamCode] };
});

export const RESULTS = [
  { h: 'LCF', a: 'VIS', s: '1:0', w: false, d: 'Sa 10.10.', abg: true },
  { h: 'VIS', a: 'OLT', s: '11:2', w: true, d: 'Di 06.10.' },
  { h: 'BAS', a: 'VIS', s: '1:0', w: false, d: 'Sa 03.10.' },
  { h: 'VIS', a: 'ARO', s: '5:0', w: true, d: 'Di 29.09.' },
  { h: 'GCK', a: 'VIS', s: '4:3', w: false, d: 'Sa 26.09.' },
  { h: 'VIS', a: 'BEL', s: '5:2', w: true, d: 'Di 22.09.' },
  { h: 'THU', a: 'VIS', s: '0:1', w: true, d: 'Fr 18.09.' },
] as { h: TeamCode; a: TeamCode; s: string; w: boolean; d: string; abg?: boolean }[];

export const TABLE: [TeamCode, number][] = [['BAS', 21], ['SIE', 20], ['VIS', 13], ['BEL', 11], ['CHU', 10], ['LCF', 9], ['THU', 8], ['GCK', 7], ['OLT', 6], ['ARO', 6]];

export const NEWS = [
  { t: 'Den Gegner von A – Z dominiert', d: '06.10.2026', c: 'Matchbericht' },
  { t: 'Zurück auf die Siegerstrasse', d: '29.09.2026', c: 'Matchbericht' },
  { t: 'Die Tormaschine ist noch am Stocken', d: '22.09.2026', c: 'Matchbericht' },
  { t: '41 Dinge, die du zum Saisonstart über den EHC Visp wissen musst!', d: '22.09.2026', c: 'Club' },
  { t: 'Saisonende für Oliver Heinen', d: '21.09.2026', c: 'Team' },
];

export type Player = { n: number; name: string; pos: 'Goalie' | 'Verteidiger' | 'Stürmer'; y: number; h: number; nat: string; inj?: boolean };
export const ROSTER: Player[] = [
  { n: 30, name: 'Juho Markkanen', pos: 'Goalie', y: 2002, h: 188, nat: 'FIN' }, { n: 60, name: 'Matia Nico Birchler', pos: 'Goalie', y: 2007, h: 195, nat: 'SUI' },
  { n: 5, name: 'Angel Anthony Lovecchio', pos: 'Verteidiger', y: 2004, h: 178, nat: 'SUI' }, { n: 14, name: 'Colin Gerber', pos: 'Verteidiger', y: 1998, h: 191, nat: 'SUI' },
  { n: 33, name: 'Marco Forrer', pos: 'Verteidiger', y: 1996, h: 190, nat: 'SUI' }, { n: 38, name: 'Oliver Heinen', pos: 'Verteidiger', y: 2000, h: 183, nat: 'SUI', inj: true },
  { n: 45, name: 'Jorden Gähler', pos: 'Verteidiger', y: 1993, h: 182, nat: 'SUI' }, { n: 48, name: 'Nick Meile', pos: 'Verteidiger', y: 2004, h: 191, nat: 'SUI' },
  { n: 64, name: 'Daniel Eigenmann', pos: 'Verteidiger', y: 1992, h: 180, nat: 'SUI' },
  { n: 4, name: 'Jonathan Hazen', pos: 'Stürmer', y: 1990, h: 183, nat: 'CAN' }, { n: 8, name: 'Joel Marchon', pos: 'Stürmer', y: 2003, h: 180, nat: 'SUI' },
  { n: 10, name: 'Yannick Brüschweiler', pos: 'Stürmer', y: 1999, h: 178, nat: 'SUI' }, { n: 11, name: 'Vincent Ryser', pos: 'Stürmer', y: 2002, h: 183, nat: 'SUI' },
  { n: 12, name: 'Andy Ritz', pos: 'Stürmer', y: 1996, h: 174, nat: 'SUI' }, { n: 15, name: 'Philéas Perrenoud', pos: 'Stürmer', y: 2004, h: 179, nat: 'FRA/SUI' },
  { n: 18, name: 'Alessandro Lurati', pos: 'Stürmer', y: 2004, h: 184, nat: 'SUI' }, { n: 22, name: 'Adam Brodecki', pos: 'Stürmer', y: 1995, h: 180, nat: 'SWE' },
  { n: 24, name: 'Nico Lehmann', pos: 'Stürmer', y: 2001, h: 175, nat: 'SUI' }, { n: 36, name: 'Sander Jansen', pos: 'Stürmer', y: 2004, h: 178, nat: 'SUI' },
  { n: 55, name: 'Dario Burgener', pos: 'Stürmer', y: 1996, h: 184, nat: 'SUI' }, { n: 67, name: 'Jacob Nilsson', pos: 'Stürmer', y: 1993, h: 179, nat: 'SWE' },
  { n: 70, name: 'Matteo Romanenghi', pos: 'Stürmer', y: 1995, h: 178, nat: 'SUI' }, { n: 71, name: 'Simon Wüest', pos: 'Stürmer', y: 2000, h: 188, nat: 'SUI' },
  { n: 78, name: 'Stéphane Patry', pos: 'Stürmer', y: 2000, h: 181, nat: 'SUI' }, { n: 85, name: 'Sandro Forrer', pos: 'Stürmer', y: 1997, h: 178, nat: 'SUI' },
];

export const STAFF = [
  { key: 'gianinazzi', name: 'Luca Gianinazzi', role: 'Head Coach', nat: 'SUI', born: '05.05.1993' },
  { key: 'hecquefeuille', name: 'Kevin Hecquefeuille', role: 'Co-Assistant Coach', nat: 'FRA', born: '20.11.1984' },
  { key: 'fodor', name: 'Tamás Fodor', role: 'Co-Assistant & Conditioning Coach', nat: 'HUN', born: '11.05.1998' },
  { key: 'zalevsky', name: 'Alexander Zalevsky', role: 'Goalie- & Video-Coach', nat: 'RUS/ISR', born: '19.03.1988' },
  { key: 'vist', name: 'Johan Vist', role: 'Equipment Manager' },
  { key: 'schmidt', name: 'Dominik Schmidt', role: 'Assistant Equipment' },
  { key: 'kamano', name: 'Saa Kamano', role: 'Masseur' },
] as { key: string; name: string; role: string; nat?: string; born?: string }[];

export const SHOP_URL = 'https://www.ehc-visp.ch/de/fancorner/fanshop/';
export type Product = { id: string; n: string; p: number; from?: boolean; old?: number; cat: 'Trikots' | 'Textilien' | 'Accessoires'; badge?: string };
export const PRODUCTS: Product[] = [
  { id: 'fandress-home-107', n: 'Fandress Home', p: 120, from: true, cat: 'Trikots', badge: 'Neu' },
  { id: 'fandress-away-108', n: 'Fandress Away', p: 120, from: true, cat: 'Trikots', badge: 'Neu' },
  { id: 'spezial-fandress-home-118', n: 'Spezial Fandress Home', p: 169, cat: 'Trikots' },
  { id: 'schal-zaemu-meischtru-100', n: 'Schal «Zämu meischtru»', p: 25, cat: 'Textilien', badge: 'Bestseller' },
  { id: 'hoodie-25-26-122', n: 'Hoodie 25/26', p: 64, cat: 'Textilien' },
  { id: 'hoodie-jr-25-26-128', n: 'Hoodie JR 25/26', p: 64, cat: 'Textilien' },
  { id: 't-shirt-104', n: 'T-Shirt', p: 25, cat: 'Textilien' },
  { id: 't-shirt-kids-105', n: 'T-Shirt Kids', p: 24, cat: 'Textilien' },
  { id: 'kinder-t-shirt-113', n: 'Kinder-T-Shirt', p: 24, cat: 'Textilien' },
  { id: 'polo-shirt-112', n: 'Polo-Shirt', p: 45, cat: 'Textilien' },
  { id: 'wintermuetze-rot-110', n: 'Wintermütze rot', p: 25, cat: 'Textilien' },
  { id: 'wintermuetze-schwarz-111', n: 'Wintermütze schwarz', p: 25, cat: 'Textilien' },
  { id: 'cap-114', n: 'Cap', p: 25, cat: 'Textilien' },
  { id: 'strickschal-135', n: 'Strickschal', p: 25, cat: 'Textilien' },
  { id: 'badetuch-132', n: 'Badetuch', p: 40, cat: 'Textilien' },
  { id: 'schal-playoff-final-25-115', n: 'Schal «Playoff Final 25»', p: 10, old: 20, cat: 'Textilien', badge: 'Sale' },
  { id: '2025-meister-t-shirt-116', n: '2025 Meister T-Shirt', p: 10, old: 20, cat: 'Textilien', badge: 'Sale' },
  { id: '2025-meister-cap-117', n: '2025 Meister Cap', p: 15, old: 25, cat: 'Textilien', badge: 'Sale' },
  { id: 'minidress-home-139', n: 'Minidress Home', p: 15, cat: 'Accessoires' },
  { id: 'minidress-away-138', n: 'Minidress Away', p: 15, cat: 'Accessoires' },
  { id: 'puck-102', n: 'Puck', p: 7, cat: 'Accessoires' },
  { id: '2025-meister-puck-119', n: '2025 Meister Puck', p: 5, old: 7, cat: 'Accessoires', badge: 'Sale' },
  { id: 'tasse-103', n: 'Tasse', p: 16, cat: 'Accessoires' },
  { id: 'wimpel-97', n: 'Wimpel', p: 15, cat: 'Accessoires' },
  { id: 'club-wimpel-98', n: 'Club-Wimpel', p: 35, cat: 'Accessoires' },
  { id: 'fahne-129', n: 'Fahne', p: 5, cat: 'Accessoires' },
  { id: 'kissen-99', n: 'Kissen', p: 25, cat: 'Accessoires' },
  { id: 'sitzkissen-133', n: 'Sitzkissen', p: 25, cat: 'Accessoires' },
  { id: 'gym-bag-101', n: 'Gym-Bag', p: 25, cat: 'Accessoires' },
  { id: 'lanyard-106', n: 'Lanyard', p: 10, cat: 'Accessoires' },
  { id: 'keychain-130', n: 'Keychain', p: 12, cat: 'Accessoires' },
  { id: 'aufnaeher-121', n: 'Aufnäher', p: 5, cat: 'Accessoires' },
  { id: 'feuerzeug-131', n: 'Feuerzeug', p: 5, cat: 'Accessoires' },
];
export const productUrl = (p: Product) => SHOP_URL + p.cat.toLowerCase() + '/' + p.id;

export const LINKS = {
  secandaWeb: 'https://www.secanda.app/login',
  secandaIOS: 'https://apps.apple.com/de/app/secanda/id6444959047',
  secandaAndroid: 'https://play.google.com/store/apps/details?id=app.secanda.www&hl=de-CH',
  tickets: 'https://www.ticket-onlineshop.com/ols/ehcv/de/meisterschaft/channel/shop/index',
  shop: 'https://www.ehc-visp.ch/de/fancorner/fanshop',
  forum: 'https://www.hockeyfans.ch/ubbthreads/ubbthreads.php?ubb=postlist&Board=20&page=1',
  team: 'https://www.ehc-visp.ch/de/team/1-mannschaft',
  live: 'https://www.sihf.ch/de/game-center/',
  website: 'https://www.ehc-visp.ch/de',
};

export const FORUM: [string, number, string][] = [
  ['Saison 2026/2027', 26, '07.10.2026'], ['Kader 2026/2027', 66, '04.10.2026'],
  ['offtopic and fun', 680, '19.06.2026'], ['Was machen ehemalige Visper Löwen', 59, '18.03.2026'],
];

// «Treue lohnt sich»: nur Summen aus den Eingangs-Scans, keine Personendaten
export const TREUE = {
  total: 23,
  abos: 1693,
  played: [
    { d: 'Di 22.09.', opp: 'BEL' as TeamCode, abos: 665, scans: 871 },
    { d: 'Di 29.09.', opp: 'ARO' as TeamCode, abos: 736, scans: 935 },
    { d: 'Di 06.10.', opp: 'OLT' as TeamCode, abos: 708, scans: 981 },
  ],
  dist: { 3: 398, 2: 314, 1: 287 } as Record<number, number>,
  tiers: [
    { min: 15, label: 'Stehplatz Playoffs' },
    { min: 20, label: 'Sitzplatz Playoffs' },
    { min: 23, label: 'Superfan-Schal' },
  ],
};

export const PARTNERS = ['ACW Group', 'BCVS', 'EnAlpin', 'MGBahn', 'Raiffeisen', 'Valaisanne', 'Lauber IWISA', 'ten23 health'];
export const PHOTO_CREDIT = 'Fotos © Christian Pfammatter';

export const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('de-CH', { weekday: 'short', day: '2-digit', month: '2-digit', timeZone: 'Europe/Zurich' });
export const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Zurich' });
export const chf = (n: number) => 'CHF ' + n.toFixed(2).replace('.00', '.–');
