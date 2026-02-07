import { Layout } from 'antd';
import { lazy } from 'react';

const AppFooter = lazy(() => import('../../components/app-footer/index.jsx'));
const AppNavbar = lazy(() => import('../../components/app-navbar/index.jsx'));

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppNavbar />
      <Layout.Content>{children}</Layout.Content>
      <Layout.Footer>
        <AppFooter />
      </Layout.Footer>
    </Layout>
  );
}
