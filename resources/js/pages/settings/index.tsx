import { App, Breadcrumb, Card, Typography, Upload } from 'antd';
import { Container } from 'antd-moe';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import xior from 'xior';
import { useAuth } from '../../contexts/auth';

export default function SettingsPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { user, setUser } = useAuth();

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[{ title: <Link href="/">{t('home')}</Link> }, { title: t('settings') }]}
        style={{ marginTop: 32 }}
      />
      <Typography.Title level={1}>{t('settings')}</Typography.Title>

      <Card title={t('avatar')}>
        <Upload
          accept="image/*"
          listType="picture-card"
          showUploadList={false}
          customRequest={({ file, onSuccess, onError }) => {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('width', '256');
            formData.append('height', '256');
            formData.append('format', 'avif');
            xior
              .post('/images', formData)
              .then((res) => onSuccess?.(res.data))
              .catch((e) => onError?.(e, e.response?.data));
          }}
          onChange={(info) => {
            if (info.file.status === 'done') {
              xior
                .put('/me', { avatarId: info.file.response.id })
                .then((res) => {
                  setUser(res.data);
                  message.success(t('update-success'));
                })
                .catch((e) => {
                  message.error(e.response?.data?.errors?.[0]?.message || e.message);
                });
            }
          }}
        >
          {user?.avatar ? (
            <img
              draggable={false}
              src={user.avatar.url}
              alt={t('avatar')}
              style={{ width: '100%', borderRadius: 8 }}
            />
          ) : (
            <span>{t('upload')}</span>
          )}
        </Upload>
      </Card>
    </Container>
  );
}
