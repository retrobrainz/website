import { App, Breadcrumb, Card, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'wouter';
import xior from 'xior';
import EmulatorForm from '../../components/emulator-form';
import Emulator from '../../types/Emulator';

export default function EmulatorNewPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const handleSubmit = async (values: any) => {
    const response = await xior.post<Emulator>('/emulators', values);
    message.success(t('create-success'));
    setLocation(`/emulators/${response.data.id}`);
  };

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/emulators">{t('emulators')}</Link> },
          { title: t('new') },
        ]}
        style={{ marginTop: 32 }}
      />
      <Typography.Title level={1}>{t('new')}</Typography.Title>

      <Card>
        <EmulatorForm onSubmit={handleSubmit} submitText={t('create')} />
      </Card>
    </Container>
  );
}
