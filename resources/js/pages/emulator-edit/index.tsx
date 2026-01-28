import { App, Breadcrumb, Card, Spin, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'wouter';
import xior from 'xior';
import EmulatorForm from '../../components/emulator-form/index.js';
import { useFetch } from 'react-fast-fetch';
import type Emulator from '../../types/Emulator.js';

export default function EmulatorEditPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { emulatorId } = useParams<{ emulatorId: string }>();
  const [, setLocation] = useLocation();
  const { data: emulator, isLoading } = useFetch<Emulator>(`/api/emulators/${emulatorId}`);

  const handleSubmit = async (values: any) => {
    const response = await xior.put(`/api/emulators/${emulatorId}`, values);
    message.success(t('emulator-updated-successfully'));
    setLocation(`/emulators`);
    return response.data;
  };

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />
      </Container>
    );
  }

  if (!emulator) {
    return (
      <Container maxWidth="md">
        <Typography.Text>{t('emulator-not-found')}</Typography.Text>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[
          { title: <a href="/">{t('home')}</a> },
          { title: <a href="/emulators">{t('emulators')}</a> },
          { title: emulator.name },
          { title: t('edit') },
        ]}
        style={{ marginTop: 32 }}
      />
      <Typography.Title level={1}>
        {t('edit-emulator')}: {emulator.name}
      </Typography.Title>

      <Card>
        <EmulatorForm emulator={emulator} onSubmit={handleSubmit} submitText={t('save')} />
      </Card>
    </Container>
  );
}
