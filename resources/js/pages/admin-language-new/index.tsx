import { App, Breadcrumb, Card, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'wouter';
import xior from 'xior';
import LanguageForm from '../../components/language-form';
import type Language from '../../types/Language';

export default function AdminLanguageNewPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const handleSubmit = async (values: { code: string; name: string }) => {
    const response = await xior.post<Language>('/admin/languages', values);
    message.success(t('create-success'));
    setLocation(`/admin/languages/${response.data.id}/edit`);
  };

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/settings">{t('settings')}</Link> },
          { title: <Link href="/admin/languages">{t('languages')}</Link> },
          { title: t('new') },
        ]}
        style={{ marginTop: 32 }}
      />

      <Typography.Title level={1}>{t('new')}</Typography.Title>

      <Card>
        <LanguageForm onSubmit={handleSubmit} submitText={t('create')} />
      </Card>
    </Container>
  );
}
