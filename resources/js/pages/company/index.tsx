import { EditOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Flex, Tabs, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import GameList from '../../components/game-list';
import { useAuth } from '../../contexts/auth';
import Company from '../../types/Company';

export default function CompanyPage() {
  const { companyId } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: company } = useFetch<Company>(`/companies/${companyId}`);

  const canEdit = user?.role === 'admin' || user?.role === 'editor';

  return (
    <Container style={{ paddingTop: 24 }}>
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/companies">{t('companies')}</Link> },
          { title: company?.name || '...' },
        ]}
        style={{ marginBottom: 16 }}
      />

      <Flex align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {company?.name || '...'}
        </Typography.Title>

        <div style={{ flex: 1 }} />

        {canEdit && (
          <Link href={`/companies/${companyId}/edit`}>
            <Button icon={<EditOutlined />}>{t('edit')}</Button>
          </Link>
        )}
      </Flex>

      <Tabs
        items={[
          {
            key: 'developed-games',
            label: t('developed-games'),
            children: (
              <GameList
                initialFilters={{ developerId: Number(companyId) }}
                showFilters={['search', 'platformId', 'regionId', 'languageId']}
              />
            ),
          },
          {
            key: 'published-games',
            label: t('published-games'),
            children: (
              <GameList
                initialFilters={{ publisherId: Number(companyId) }}
                showFilters={['search', 'platformId', 'regionId', 'languageId']}
              />
            ),
          },
        ]}
      />
    </Container>
  );
}
