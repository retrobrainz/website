import { Container } from 'antd-moe';
import PopularGames from './popular-games.js';
import RandomGames from './random-games.js';
import TopEmulators from './top-emulators.js';
import TopFranchises from './top-franchises.js';
import TopFrontends from './top-frontends.js';
import TopGenres from './top-genres.js';
import TopPlatforms from './top-platforms.js';

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
