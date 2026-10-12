import { View } from 'react-native';
import { GAMES, LINKS, TEAMS, fmtDate, fmtTime } from '@/src/data';
import { F } from '@/src/theme';
import { Badge, Btn, Card, Li, Muted, Screen, T, openUrl } from '@/src/ui';

export default function Tickets() {
  const home = GAMES.filter((g) => g.h === 'VIS').slice(0, 8);
  return (
    <Screen>
      <Muted>Tickets für die Heimspiele gibt es im offiziellen Onlineshop. Du wählst dort Sektor und Platz.</Muted>
      <Card style={{ gap: 0 }}>
        {home.map((g, i) => (
          <Li key={g.id} last={i === home.length - 1}>
            <Badge code={g.a} />
            <View style={{ flex: 1 }}><T style={{ fontFamily: F.bodySemi }}>vs {TEAMS[g.a]}</T><Muted>{fmtDate(g.d)} · {fmtTime(g.d)} · Lonza Arena</Muted></View>
            <Btn title="Tickets" onPress={() => openUrl(LINKS.tickets)} style={{ flex: 0, paddingVertical: 8, paddingHorizontal: 10 }} />
          </Li>
        ))}
      </Card>
      <Btn title="Zum Ticket-Onlineshop ↗" onPress={() => openUrl(LINKS.tickets)} style={{ flex: 0 }} />
    </Screen>
  );
}

