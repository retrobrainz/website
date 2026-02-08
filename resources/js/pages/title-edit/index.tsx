import { App, Breadcrumb, Card, Spin, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'wouter';
import xior from 'xior';
import TitleForm from '../../components/title-form';
import type Title from '../../types/Title';

export default function TitleEditPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { titleId } = useParams<{ titleId: string }>();
  const [, setLocation] = useLocation();
  const { data: title, loading } = useFetch<Title>(`/titles/${titleId}`);

  const handleSubmit = async (values: any) => {
    await xior.put(`/titles/${titleId}`, values);
    message.success(t('update-success'));
    setLocation(`/titles/${titleId}`);
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />
      </Container>
    );
  }

  if (!title) {
    return (
      <Container maxWidth="md">
        <Typography.Text>{t('not-found')}</Typography.Text>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/titles">{t('titles')}</Link> },
          { title: <Link href={`/titles/${titleId}`}>{title.name}</Link> },
          { title: t('edit') },
        ]}
        style={{ marginTop: 32 }}
      />
      <Typography.Title level={1}>
        {t('edit')}: {title.name}
      </Typography.Title>

      <Card>
        <TitleForm title={title} onSubmit={handleSubmit} submitText={t('save')} />
      </Card>
    </Container>
  );
}
