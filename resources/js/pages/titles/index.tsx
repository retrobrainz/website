import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Flex, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import TitleList from '../../components/title-list';
import { useAuth } from '../../contexts/auth';

export default function TitlesPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const canCreateTitle = user?.role === 'admin' || user?.role === 'editor';

  return (
    <Container style={{ paddingTop: 24 }}>
      <Breadcrumb
        items={[{ title: <Link href="/">{t('home')}</Link> }, { title: t('titles') }]}
        style={{ marginBottom: 16 }}
      />

      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {t('titles')}
        </Typography.Title>
        {canCreateTitle && (
          <Link href="/titles/new">
            <Button icon={<PlusOutlined />}>{t('new')}</Button>
          </Link>
        )}
      </Flex>

      <TitleList showFilters={['search', 'platformId', 'franchiseId', 'genreId']} />
    </Container>
  );
}
