import { Avatar, Flex, Tabs, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { useParams } from 'wouter';
import EmulatorList from '../../components/emulator-list/index.js';
import GameList from '../../components/game-list/index.js';
import User from '../../types/User.js';

export default function UserPage() {
  const { userId } = useParams();
  const { t } = useTranslation();
  const { data } = useFetch<User>(`/users/${userId}`);
  return (
    <Container>
      <Flex vertical align="center" style={{ paddingTop: 32 }}>
        <Avatar size={128} src={data?.avatar?.url} alt={data?.username || 'Avatar'} />
        <Typography.Title level={1}>{data?.username || '...'}</Typography.Title>
      </Flex>

      <Tabs
        centered
        items={[
          {
            key: 'games',
            label: t('games'),
            children: <GameList initialFilters={{ favoriteUserId: userId }} />,
          },
          {
            key: 'emulators',
            label: t('emulators'),
            children: <EmulatorList initialFilters={{ favoriteUserId: userId }} />,
          },
        ]}
      />
    </Container>
  );
}
