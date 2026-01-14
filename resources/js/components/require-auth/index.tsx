import { Flex } from 'antd';
import { useAuth } from '../../contexts/auth/index.js';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Flex justify="center" align="center" style={{ height: '(100vh)' }}>
        Please log in to access this page.
      </Flex>
    );
  }

  return <>{children}</>;
}
