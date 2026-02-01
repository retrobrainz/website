import { ArrowRightOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Row, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import EmulatorCard from '../../components/emulator-card/index.js';
import FranchiseCard from '../../components/franchise-card/index.js';
import FrontendCard from '../../components/frontend-card/index.js';
import GameCard from '../../components/game-card/index.js';
import GenreCard from '../../components/genre-card/index.js';
import PlatformCard from '../../components/platform-card/index.js';
import type Emulator from '../../types/Emulator.js';
import type Franchise from '../../types/Franchise.js';
import type Frontend from '../../types/Frontend.js';
import type Game from '../../types/Game.js';
import type Genre from '../../types/Genre.js';
import type Platform from '../../types/Platform.js';

export default function HomePage() {
  const { t } = useTranslation();

  const { data: randomGames, reload: reloadGames } = useFetch<{ data: Game[] }>('/games', {
    params: { orderBy: 'random', pageSize: 12 },
  });
  const { data: platforms } = useFetch<Platform[]>('/platforms');
  const { data: genres } = useFetch<{ data: Genre[] }>('/genres', {
    params: { page: 1, pageSize: 6 },
  });
  const { data: franchises } = useFetch<{ data: Franchise[] }>('/franchises', {
    params: { page: 1, pageSize: 6 },
  });
  const { data: emulators } = useFetch<Emulator[]>('/emulators');
  const { data: frontends } = useFetch<Frontend[]>('/frontends');

  const topPlatforms = platforms
    ?.sort((a, b) => (b.gamesCount || 0) - (a.gamesCount || 0))
    .slice(0, 6);
  const topEmulators = emulators?.slice(0, 6);
  const topFrontends = frontends?.slice(0, 6);

  return (
    <Container style={{ paddingTop: 24, paddingBottom: 24 }}>
      {/* Random Games */}
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {t('random-games')}
        </Typography.Title>
        <Button icon={<ReloadOutlined />} onClick={() => reloadGames()}>
          {t('refresh')}
        </Button>
      </Flex>
      <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
        {randomGames?.data.map((game) => (
          <Col key={game.id} xs={24} sm={12} lg={8} xl={6} xxl={4}>
            <GameCard game={game} />
          </Col>
        ))}
      </Row>

      {/* Top Platforms */}
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {t('top-platforms')}
        </Typography.Title>
        <Link href="/platforms">
          <Button type="text" icon={<ArrowRightOutlined />}>
            {t('more')}
          </Button>
        </Link>
      </Flex>
      <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
        {topPlatforms?.map((platform) => (
          <Col key={platform.id} xs={24} md={12} xl={8} xxl={4}>
            <PlatformCard platform={platform} />
          </Col>
        ))}
      </Row>

      {/* Top Genres */}
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {t('genres')}
        </Typography.Title>
        <Link href="/genres">
          <Button type="text" icon={<ArrowRightOutlined />}>
            {t('more')}
          </Button>
        </Link>
      </Flex>
      <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
        {genres?.data.map((genre) => (
          <Col key={genre.id} xs={24} md={12} xl={8} xxl={4}>
            <GenreCard genre={genre} />
          </Col>
        ))}
      </Row>

      {/* Top Franchises */}
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {t('franchises')}
        </Typography.Title>
        <Link href="/franchises">
          <Button type="text" icon={<ArrowRightOutlined />}>
            {t('more')}
          </Button>
        </Link>
      </Flex>
      <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
        {franchises?.data.map((franchise) => (
          <Col key={franchise.id} xs={24} md={12} xl={8} xxl={4}>
            <FranchiseCard franchise={franchise} />
          </Col>
        ))}
      </Row>

      {/* Top Emulators */}
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {t('emulators')}
        </Typography.Title>
        <Link href="/emulators">
          <Button type="text" icon={<ArrowRightOutlined />}>
            {t('more')}
          </Button>
        </Link>
      </Flex>
      <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
        {topEmulators?.map((emulator) => (
          <Col key={emulator.id} xs={24} md={12} xl={8} xxl={4}>
            <EmulatorCard emulator={emulator} />
          </Col>
        ))}
      </Row>

      {/* Top Frontends */}
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {t('frontends')}
        </Typography.Title>
        <Link href="/frontends">
          <Button type="text" icon={<ArrowRightOutlined />}>
            {t('more')}
          </Button>
        </Link>
      </Flex>
      <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
        {topFrontends?.map((frontend) => (
          <Col key={frontend.id} xs={24} md={12} xl={8} xxl={4}>
            <FrontendCard frontend={frontend} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
