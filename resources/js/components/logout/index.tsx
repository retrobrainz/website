import { LogoutOutlined } from '@ant-design/icons';
import { App, Button, Tooltip } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import xior from 'xior';
import { useAuth } from '../../contexts/auth';

export default function Logout() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { setIsAuthenticated, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  return (
    <Tooltip title={t('logout')}>
      <Button
        icon={<LogoutOutlined />}
        loading={loading}
        onClick={() => {
          setLoading(true);
          xior
            .post('/logout')
            .then(() => {
              localStorage.removeItem('authToken');
              delete xior.defaults.headers.Authorization;
              setIsAuthenticated(false);
              setUser(null);
              message.success(t('logout-success'));
            })
            .catch((error) => {
              message.error(error.response?.data?.message || error.message);
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      />
    </Tooltip>
  );
}
