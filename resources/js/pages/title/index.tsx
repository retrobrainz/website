import { EditOutlined, GlobalOutlined, TranslationOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Flex, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import GameList from '../../components/game-list';
import { useAuth } from '../../contexts/auth';
import Title from '../../types/Title';

export default function TitlePage() {
  const { titleId } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: title } = useFetch<Title>(`/titles/${titleId}`);

  const canEdit = user?.role === 'admin' || user?.role === 'editor';

  const displayName = title?.translations?.[0]?.name || title?.name || '...';

  return (
    <Container style={{ paddingTop: 24 }}>
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/titles">{t('titles')}</Link> },
          { title: displayName },
        ]}
        style={{ marginBottom: 16 }}
      />

      <Flex align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {displayName}
        </Typography.Title>

        <div style={{ flex: 1 }} />

        <Flex gap="small">
          {title?.wikipedia && (
            <a href={title.wikipedia} target="_blank" rel="noopener noreferrer">
              <Button icon={<GlobalOutlined />}>Wikipedia</Button>
            </a>
          )}
          {canEdit && (
            <>
              <Link href={`/titles/${titleId}/translate`}>
                <Button icon={<TranslationOutlined />}>{t('translate')}</Button>
              </Link>
              <Link href={`/titles/${titleId}/edit`}>
                <Button icon={<EditOutlined />}>{t('edit')}</Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>

      <GameList
        initialFilters={{ titleId: Number(titleId) }}
        showFilters={['search', 'platformId', 'regionId', 'languageId']}
      />
    </Container>
  );
}
