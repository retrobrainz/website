import { SettingOutlined } from '@ant-design/icons';
import { App, Avatar, Button, Flex, Layout, Tooltip } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import LanguageMenu from '../../components/language-menu/index.js';
import Login from '../../components/login/index.js';
import Logout from '../../components/logout/index.js';
import Register from '../../components/register/index.js';
import { useAuth } from '../../contexts/auth/index.js';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { modal } = App.useApp();
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const instance = modal.warning({
      title: t('alpha-notice'),
      content: <div>{t('alpha-notice-message')}</div>,
      okText: t('got-it'),
    });
    return () => {
      instance.destroy();
    };
  }, [modal, t]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header
        style={{
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          position: 'sticky',
          top: 0,
          background: 'rgba(255, 255, 255, 0.6)',
          zIndex: 1000,
          borderBottom: '1px solid #eee',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
          <img
            src="/logo.svg"
            alt={t('logo')}
            width={512}
            height={512}
            style={{ height: 40, width: 40, marginRight: 8 }}
          />
          <div style={{ fontSize: 18, fontWeight: 500 }}>RetroBrainz</div>
        </Link>

        <Link href="/platforms">
          <Button type="text">{t('platforms')}</Button>
        </Link>

        <Link href="/emulators">
          <Button type="text">{t('emulators')}</Button>
        </Link>

        <Link href="/frontends">
          <Button type="text">{t('frontends')}</Button>
        </Link>

        <div style={{ flex: 1 }} />

        <LanguageMenu />

        {isAuthenticated ? (
          <>
            <Link href={`/users/${user?.id}`}>
              <Button type="text" icon={<Avatar src={user?.avatar?.url} alt={user?.username} />}>
                {user?.username}
              </Button>
            </Link>
            <Link href="/settings">
              <Tooltip title={t('settings')}>
                <Button icon={<SettingOutlined />} />
              </Tooltip>
            </Link>
            <Logout />
          </>
        ) : (
          <>
            <Login />
            <Register />
          </>
        )}
      </Layout.Header>
      <Layout.Content>{children}</Layout.Content>
      <Layout.Footer>
        <Flex gap={16}>
          <span>{t('copyright', { year: new Date().getFullYear() })}</span>
          <span style={{ flex: 1 }} />
          <a href="https://github.com/retrobrainz/website">{t('github')}</a>
          <a href="https://t.me/retrobrainz">{t('telegram')}</a>
        </Flex>
      </Layout.Footer>
    </Layout>
  );
}
