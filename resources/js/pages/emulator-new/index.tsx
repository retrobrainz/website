import { App, Breadcrumb, Card, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import xior from 'xior';
import EmulatorForm from '../../components/emulator-form/index.js';
import Emulator from '../../types/Emulator.js';

export default function EmulatorNewPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const handleSubmit = async (values: any) => {
    const response = await xior.post<Emulator>('/emulators', values);
    message.success(t('emulator-created-successfully'));
    setLocation(`/emulators/${response.data.id}`);
  };

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[
          { title: <a href="/">{t('home')}</a> },
          { title: <a href="/emulators">{t('emulators')}</a> },
          { title: t('new') },
        ]}
        style={{ marginTop: 32 }}
      />
      <Typography.Title level={1}>{t('new-emulator')}</Typography.Title>

      <Card>
        <EmulatorForm onSubmit={handleSubmit} submitText={t('create')} />
      </Card>
    </Container>
  );
}
