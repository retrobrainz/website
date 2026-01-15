import { SettingOutlined } from '@ant-design/icons';
import { App, Avatar, Button, Tooltip } from 'antd';
import { Link } from 'wouter';
import Login from '../../components/login/index.js';
import Logout from '../../components/logout/index.js';
import Register from '../../components/register/index.js';
import { useAuth } from '../../contexts/auth/index.js';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  return (
    <App>
      <nav
        style={{
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          position: 'sticky',
          top: 0,
          background: 'rgba(255, 255, 255, 0.5)',
          zIndex: 1000,
          borderBottom: '1px solid #eee',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
          <img
            src="/logo.svg"
            alt="Logo"
            width={512}
            height={512}
            style={{ height: 40, width: 40, marginRight: 8 }}
          />
          <div style={{ fontSize: 18, fontWeight: 500 }}>RetroBrainz</div>
        </Link>

        <div style={{ flex: 1 }} />

        {isAuthenticated ? (
          <>
            <Link href={`/users/${user?.id}`}>
              <Avatar src={user?.avatar?.url} style={{ marginRight: 4 }} />
              {user?.username}
            </Link>
            <Link href="/settings">
              <Tooltip title="Settings">
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
      </nav>
      {children}
    </App>
  );
}
