import { App, Breadcrumb, Card, Spin, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'wouter';
import xior from 'xior';
import EmulatorForm from '../../components/emulator-form';
import type Emulator from '../../types/Emulator';

export default function EmulatorEditPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { emulatorId } = useParams<{ emulatorId: string }>();
  const [, setLocation] = useLocation();
  const { data: emulator, loading } = useFetch<Emulator>(`/emulators/${emulatorId}`);

  const handleSubmit = async (values: any) => {
    await xior.put(`/emulators/${emulatorId}`, values);
    message.success(t('update-success'));
    setLocation(`/emulators/${emulatorId}`);
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />
      </Container>
    );
  }

  if (!emulator) {
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
          { title: <Link href="/emulators">{t('emulators')}</Link> },
          { title: <Link href={`/emulators/${emulatorId}`}>{emulator.name}</Link> },
          { title: t('edit') },
        ]}
        style={{ marginTop: 32 }}
      />
      <Typography.Title level={1}>
        {t('edit')}: {emulator.name}
      </Typography.Title>

      <Card>
        <EmulatorForm emulator={emulator} onSubmit={handleSubmit} submitText={t('save')} />
      </Card>
    </Container>
  );
}
