import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/auth';

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const { t } = useTranslation();

  if (!isAuthenticated) {
    return (
      <Flex justify="center" align="center" style={{ height: '(100vh)' }}>
        {t('please-login-to-access')}
      </Flex>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <Flex justify="center" align="center" style={{ height: '(100vh)' }}>
        Unauthorized
      </Flex>
    );
  }

  return <>{children}</>;
}
