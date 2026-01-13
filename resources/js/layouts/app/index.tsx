import { App, Button, Flex } from 'antd';
import Login from '../../components/login/index.js';
import Register from '../../components/register/index.js';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <App>
      <nav>
        <Flex gap={16}>
          {false ? (
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
