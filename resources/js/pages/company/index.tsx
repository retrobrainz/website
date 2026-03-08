import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { App, Breadcrumb, Button, Flex, Popconfirm, Tabs, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'wouter';
import xior from 'xior';
import GameList from '../../components/game-list';
import { useAuth } from '../../contexts/auth';
import Company from '../../types/Company';

export default function CompanyPage() {
  const { message } = App.useApp();
  const { companyId } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const { data: company } = useFetch<Company>(`/companies/${companyId}`);

  const canEdit = user?.role === 'admin' || user?.role === 'editor';
  const canDelete = user?.role === 'admin';

  const handleDelete = async () => {
    try {
      await xior.delete(`/companies/${companyId}`);
      message.success(t('delete-success'));
      setLocation('/companies');
    } catch (error: any) {
      message.error(error.response?.data?.message || error.message);
    }
  };

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

        {company?.parent && (
          <Typography.Text type="secondary" style={{ marginLeft: 12 }}>
            {t('parent')}:{' '}
            <Link href={`/companies/${company.parent.id}`}>{company.parent.name}</Link>
          </Typography.Text>
        )}

        <div style={{ flex: 1 }} />

        {canEdit && (
          <Link href={`/companies/${companyId}/edit`}>
            <Button icon={<EditOutlined />}>{t('edit')}</Button>
          </Link>
        )}

        {canDelete && (
          <Popconfirm
            title={t('delete-company')}
            description={t('delete-company-confirm')}
            onConfirm={handleDelete}
            okText={t('delete')}
            cancelText={t('cancel')}
          >
            <Button danger icon={<DeleteOutlined />} style={{ marginLeft: 8 }}>
              {t('delete')}
            </Button>
          </Popconfirm>
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
