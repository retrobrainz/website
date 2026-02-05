import { Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import GameList from '../../components/game-list/index.js';

export default function PopularGames() {
  const { t } = useTranslation();

  return (
    <div style={{ marginBottom: 48 }}>
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {t('popular-games')}
        </Typography.Title>
      </Flex>
      <GameList initialFilters={{ orderBy: 'favoritesCount' }} pageSize={12} hidePagination />
    </div>
  );
}
