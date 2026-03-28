import { App, Breadcrumb, Card, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'wouter';
import xior from 'xior';
import LanguageForm from '../../components/language-form';
import type Language from '../../types/Language';

export default function AdminLanguageEditPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { languageId } = useParams<{ languageId: string }>();
  const [, setLocation] = useLocation();
  const { data: language } = useFetch<Language>(`/admin/languages/${languageId}`);

  const handleSubmit = async (values: { code: string; name: string }) => {
    await xior.put(`/admin/languages/${languageId}`, values);
    message.success(t('update-success'));
    setLocation('/admin/languages');
  };

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/settings">{t('settings')}</Link> },
          { title: <Link href="/admin/languages">{t('languages')}</Link> },
          { title: language?.name || '...' },
          { title: t('edit') },
        ]}
        style={{ marginTop: 32 }}
      />

      <Typography.Title level={1}>
        {t('edit')}: {language?.name || '...'}
      </Typography.Title>

      <Card>
        <LanguageForm language={language} onSubmit={handleSubmit} submitText={t('save')} />
      </Card>
    </Container>
  );
}
