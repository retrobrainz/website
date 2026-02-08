import { EditOutlined, TranslationOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Flex, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import GameList from '../../components/game-list';
import { useAuth } from '../../contexts/auth';
import Franchise from '../../types/Franchise';

export default function FranchisePage() {
  const { franchiseId } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: franchise } = useFetch<Franchise>(`/franchises/${franchiseId}`);

  const canEdit = user?.role === 'admin' || user?.role === 'editor';

  const displayName = franchise?.translations?.[0]?.name || franchise?.name || '...';

  return (
    <Container style={{ paddingTop: 24 }}>
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/franchises">{t('franchises')}</Link> },
          { title: displayName },
        ]}
        style={{ marginBottom: 16 }}
      />

      <Flex align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {displayName}
        </Typography.Title>

        <div style={{ flex: 1 }} />

        {canEdit && (
          <Flex gap="small">
            <Link href={`/franchises/${franchiseId}/translate`}>
              <Button icon={<TranslationOutlined />}>{t('translate')}</Button>
            </Link>
            <Link href={`/franchises/${franchiseId}/edit`}>
              <Button icon={<EditOutlined />}>{t('edit')}</Button>
            </Link>
          </Flex>
        )}
      </Flex>

      <GameList
        initialFilters={{ franchiseId: Number(franchiseId) }}
        showFilters={['search', 'platformId', 'regionId', 'languageId']}
      />
    </Container>
  );
}
