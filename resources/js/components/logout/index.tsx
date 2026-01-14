import { App, Button } from 'antd';
import xior from 'xior';
import { useAuth } from '../../contexts/auth/index.js';

export default function Logout() {
  const { message } = App.useApp();
  const { setIsAuthenticated, setUser } = useAuth();
  return (
    <Button
      onClick={() => {
        xior.post('/logout').then(() => {
          localStorage.removeItem('authToken');
          delete xior.defaults.headers.Authorization;
          setIsAuthenticated(false);
          setUser(null);
          message.success('Logout succeeded');
        });
      }}
    >
      Logout
    </Button>
  );
}
