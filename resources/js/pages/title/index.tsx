import { EditOutlined, TranslationOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Descriptions, Flex, Row, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import GameList from '../../components/game-list';
import TitleMergeButton from '../../components/title-merge-button';
import WikipediaExcerpt from '../../components/wikipedia-excerpt';
import { useAuth } from '../../contexts/auth';
import Title from '../../types/Title';

export default function TitlePage() {
  const { titleId } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: title } = useFetch<Title>(`/titles/${titleId}`);

  const canEdit = user?.role === 'admin' || user?.role === 'editor';
  const canMerge = user?.role === 'admin';

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
          {canEdit && (
            <>
              {canMerge && <TitleMergeButton titleId={Number(titleId)} />}
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

      <Card style={{ marginBottom: 24 }}>
        <Row gutter={16}>
          <Col xs={24} md={10} lg={8} xxl={7}>
            <Descriptions
              column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 1, xxl: 1 }}
              items={[
                {
                  label: t('franchises'),
                  children:
                    title?.franchises && title.franchises.length > 0
                      ? title.franchises.map((franchise, index, arr) => (
                          <span key={franchise.id}>
                            <Link href={`/franchises/${franchise.id}`}>
                              {franchise.translations?.[0]?.name || franchise.name}
                            </Link>
                            {index < arr.length - 1 ? ', ' : ''}
                          </span>
                        ))
                      : 'N/A',
                },
                {
                  label: t('release-date'),
                  children: title?.releaseDate || 'N/A',
                },
                {
                  label: t('genres'),
                  children:
                    title?.genres && title.genres.length > 0
                      ? title.genres.map((genre, index, arr) => (
                          <span key={genre.id}>
                            <Link href={`/genres/${genre.id}`}>
                              {genre.translations?.[0]?.name || genre.name}
                            </Link>
                            {index < arr.length - 1 ? ', ' : ''}
                          </span>
                        ))
                      : 'N/A',
                },
                ...(title?.mobygames
                  ? [
                      {
                        label: 'MobyGames',
                        children: (
                          <a href={title.mobygames} target="_blank" rel="noreferrer">
                            {title.mobygames}
                          </a>
                        ),
                      },
                    ]
                  : []),
              ]}
            />
          </Col>
          <Col xs={24} md={14} lg={16} xxl={17}>
            <WikipediaExcerpt url={title?.wikipedia} />
          </Col>
        </Row>
      </Card>

      <GameList
        initialFilters={{ titleId: Number(titleId) }}
        showFilters={[
          'search',
          'platformId',
          'regionId',
          'languageId',
          'noDeveloper',
          'noPublisher',
          'noReleaseDate',
          'noLanguage',
        ]}
      />
    </Container>
  );
}
