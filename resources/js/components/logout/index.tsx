import { LogoutOutlined } from '@ant-design/icons';
import { App, Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import xior from 'xior';
import { useAuth } from '../../contexts/auth';

export default function Logout() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { setIsAuthenticated, setUser } = useAuth();
  return (
    <Tooltip title={t('logout')}>
      <Button
        icon={<LogoutOutlined />}
        onClick={() => {
          xior.post('/logout').then(() => {
            localStorage.removeItem('authToken');
            delete xior.defaults.headers.Authorization;
            setIsAuthenticated(false);
            setUser(null);
            message.success(t('logout-success'));
          });
        }}
      />
    </Tooltip>
  );
}
