import { App, Button, Flex } from 'antd';
import { useFetch } from 'react-fast-fetch';
import Login from '../../components/login/index.js';
import Register from '../../components/register/index.js';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: user } = useFetch('/api/me');

  return (
    <App>
      <nav>
        <Flex gap={16}>
          {user ? (
            <>
              <Button>Logout</Button>
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
