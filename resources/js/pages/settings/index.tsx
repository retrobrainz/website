import { App, Card, Upload } from 'antd';
import xior from 'xior';
import { useAuth } from '../../contexts/auth/index.js';

export default function SettingsPage() {
  const { message } = App.useApp();
  const { user, setUser } = useAuth();

  return (
    <div>
      <h1>Settings</h1>

      <Card title="Avatar">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          customRequest={({ file, onSuccess, onError }) => {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('width', '64');
            formData.append('height', '64');
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
            <img draggable={false} src={user.avatar.url} alt="Avatar" style={{ width: '100%' }} />
          ) : (
            <span>Upload</span>
          )}
        </Upload>
      </Card>
    </div>
  );
}
