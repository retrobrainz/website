import { App, Breadcrumb, Card, Typography, Upload } from 'antd';
import { Container } from 'antd-moe';
import xior from 'xior';
import { useAuth } from '../../contexts/auth/index.js';

export default function SettingsPage() {
  const { message } = App.useApp();
  const { user, setUser } = useAuth();

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[{ title: <a href="/">Home</a> }, { title: 'Settings' }]}
        style={{ marginTop: 32 }}
      />
      <Typography.Title level={1}>Settings</Typography.Title>

      <Card title="Avatar">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          customRequest={({ file, onSuccess, onError }) => {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('width', '128');
            formData.append('height', '128');
            formData.append('format', 'jpeg');
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
                  message.success('Avatar updated successfully');
                })
                .catch((e) => {
                  message.error(e.response?.data?.errors?.[0]?.message || e.message);
                });
            }
          }}
        >
          {user.avatar ? (
            <img
              draggable={false}
              src={user.avatar.url}
              alt="Avatar"
              style={{ width: '100%', borderRadius: 8 }}
            />
          ) : (
            <span>Upload</span>
          )}
        </Upload>
      </Card>
    </Container>
  );
}
