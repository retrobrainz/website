import { SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import LanguageMenu from '../../components/language-menu';
import Logout from '../../components/logout';
import SearchBar from '../../components/search-bar';
import { useAuth } from '../../contexts/auth';

export default function AppNavbar() {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();
  return (
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

      <SearchBar />

      <Link href="/franchises">
        <Button type="text">{t('franchises')}</Button>
      </Link>

      <Link href="/titles">
        <Button type="text">{t('titles')}</Button>
      </Link>

      <Link href="/genres">
        <Button type="text">{t('genres')}</Button>
      </Link>

      <Link href="/companies">
        <Button type="text">{t('companies')}</Button>
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

      {isAuthenticated && user ? (
        <>
          <Link href={`/users/${user.id}`}>
            <Avatar src={user.avatar?.url} style={{ marginRight: 4 }}>
              {user.username.substring(0, 1).toUpperCase()}
            </Avatar>
            {user.username}
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
          <Link href="/login">
            <Button>{t('login')}</Button>
          </Link>
          <Link href="/register">
            <Button type="primary">{t('register')}</Button>
          </Link>
        </>
      )}
    </Layout.Header>
  );
}
