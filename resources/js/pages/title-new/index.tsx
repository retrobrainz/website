import { App, Breadcrumb, Card, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'wouter';
import xior from 'xior';
import TitleForm from '../../components/title-form';
import Title from '../../types/Title';

export default function TitleNewPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const handleSubmit = async (values: any) => {
    const response = await xior.post<Title>('/titles', values);
    message.success(t('create-success'));
    setLocation(`/titles/${response.data.id}`);
  };

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/titles">{t('titles')}</Link> },
          { title: t('new') },
        ]}
        style={{ marginTop: 32 }}
      />
      <Typography.Title level={1}>{t('new')}</Typography.Title>

      <Card>
        <TitleForm onSubmit={handleSubmit} submitText={t('create')} />
      </Card>
    </Container>
  );
}
