import { FireOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GameList from '../../components/game-list/index.js';

export default function PopularGames() {
  const { t } = useTranslation();
  const [key, setKey] = useState(0);

  return (
    <div style={{ marginBottom: 48 }}>
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {t('popular-games')}
        </Typography.Title>
        <Button icon={<FireOutlined />} onClick={() => setKey((k) => k + 1)}>
          {t('refresh')}
        </Button>
      </Flex>
      <GameList
        key={key}
        initialFilters={{ orderBy: 'favorites_count' }}
        pageSize={12}
        hidePagination
      />
    </div>
  );
}
