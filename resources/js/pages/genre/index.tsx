import { EditOutlined, TranslationOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Flex, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import GameList from '../../components/game-list/index.js';
import { useAuth } from '../../contexts/auth/index.js';
import Genre from '../../types/Genre.js';

export default function GenrePage() {
  const { genreId } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: genre } = useFetch<Genre>(`/genres/${genreId}`);

  const canEdit = user?.role === 'admin' || user?.role === 'editor';

  const displayName = genre ? genre.translations?.[0]?.name || genre.name : '...';

  return (
    <Container style={{ paddingTop: 24 }}>
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/genres">{t('genres')}</Link> },
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
            <Link href={`/genres/${genreId}/translate`}>
              <Button icon={<TranslationOutlined />}>{t('translate')}</Button>
            </Link>
            <Link href={`/genres/${genreId}/edit`}>
              <Button icon={<EditOutlined />}>{t('edit')}</Button>
            </Link>
          </Flex>
        )}
      </Flex>

      <GameList initialFilters={{ genreId: Number(genreId) }} />
    </Container>
  );
}
