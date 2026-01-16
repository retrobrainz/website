import { Avatar, Flex, Tabs, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useParams } from 'wouter';
import User from '../../types/User.js';

export default function UserPage() {
  const { userId } = useParams();
  const { data } = useFetch<User>(`/users/${userId}`);
  return (
    <Container maxWidth="md">
      <Flex vertical align="center" style={{ paddingTop: 32 }}>
        <Avatar size={128} src={data?.avatar?.url} alt={data?.username || 'Avatar'} />
        <Typography.Title level={1}>{data?.username || '...'}</Typography.Title>
      </Flex>

      <Tabs
        centered
        items={[
          { key: 'favorites', label: 'Favorites' },
          { key: 'reviews', label: 'Reviews' },
        ]}
      />
    </Container>
  );
}
