import { Container } from 'antd-moe';
import { useSearchParams } from 'wouter';
import GameList from '../../components/game-list/index.js';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('q') || '';

  return (
    <Container style={{ paddingTop: 24 }}>
      <GameList
        initialFilters={{ search }}
        showFilters={['search', 'platformId', 'regionId', 'languageId']}
      />
    </Container>
  );
}
