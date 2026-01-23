import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/auth/index.js';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  if (!isAuthenticated) {
    return (
      <Flex justify="center" align="center" style={{ height: '(100vh)' }}>
        {t('please-login-to-access')}
      </Flex>
    );
  }

  return <>{children}</>;
}
