import { App, Flex } from 'antd';
import Login from '../../components/login/index.js';
import Logout from '../../components/logout/index.js';
import Register from '../../components/register/index.js';
import { useAuth } from '../../contexts/auth/index.js';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  return (
    <App>
      <nav>
        <Flex gap={16}>
          {isAuthenticated ? (
            <>
              <span>Welcome, {user?.username}</span>
              <Logout />
            </>
          ) : (
            <>
              <Login />
              <Register />
            </>
          )}
        </Flex>
      </nav>
      {children}
    </App>
  );
}
