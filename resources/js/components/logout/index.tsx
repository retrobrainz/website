import { LogoutOutlined } from '@ant-design/icons';
import { App, Button, Tooltip } from 'antd';
import xior from 'xior';
import { useAuth } from '../../contexts/auth/index.js';

export default function Logout() {
  const { message } = App.useApp();
  const { setIsAuthenticated, setUser } = useAuth();
  return (
    <Tooltip title="Logout">
      <Button
        icon={<LogoutOutlined />}
        onClick={() => {
          xior.post('/logout').then(() => {
            localStorage.removeItem('authToken');
            delete xior.defaults.headers.Authorization;
            setIsAuthenticated(false);
            setUser(null);
            message.success('Logout succeeded');
          });
        }}
      />
    </Tooltip>
  );
}
