import { Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import GameList from '../../components/game-list';

export default function RandomGames() {
  const { t } = useTranslation();

  return (
    <div style={{ marginBottom: 48 }}>
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {t('random-games')}
        </Typography.Title>
      </Flex>
      <GameList initialFilters={{ orderBy: 'random' }} pageSize={12} hidePagination />
    </div>
  );
}
