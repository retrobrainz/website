import { Container } from 'antd-moe';
import PopularGames from './popular-games';
import RandomGames from './random-games';
import TopEmulators from './top-emulators';
import TopFranchises from './top-franchises';
import TopFrontends from './top-frontends';
import TopGenres from './top-genres';
import TopPlatforms from './top-platforms';

export default function HomePage() {
  return (
    <Container style={{ paddingTop: 24, paddingBottom: 24 }}>
      <RandomGames />
      <PopularGames />
      <TopPlatforms />
      <TopGenres />
      <TopFranchises />
      <TopEmulators />
      <TopFrontends />
    </Container>
  );
}
