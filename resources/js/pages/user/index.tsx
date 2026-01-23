import { Avatar, Flex, Tabs, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { useParams } from 'wouter';
import User from '../../types/User.js';
import FavoriteList from './FavoriteList.js';

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
          { key: 'favorites', label: t('favorites'), children: <FavoriteList /> },
          { key: 'reviews', label: t('reviews') },
        ]}
      />
    </Container>
  );
}
