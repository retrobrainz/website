import { ProLayout } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useFetch } from 'react-fast-fetch';
import { Link, Route, useLocation } from 'wouter';
import HomePage from './pages/home/index.js';
import PlatformsPage from './pages/platforms/index.js';
import RegionsPage from './pages/regions/index.js';
import TitlesPage from './pages/titles/index.js';

function App() {
  const [pathname, navigate] = useLocation();
  const { data: platforms } = useFetch<any[]>('/api/platforms');

  return (
    <ConfigProvider>
      <ProLayout
        title="RetroBrainz"
        location={{ pathname }}
        onMenuHeaderClick={() => navigate('/')}
        route={{
          path: '/',
          routes: [
            {
              path: '/platforms',
              name: 'Platforms',
              routes:
                platforms?.map((platform: any) => ({
                  name: platform.name,
                  path: `/platforms/${platform.id}`,
                })) || [],
            },
          ],
        }}
        menuItemRender={(item, dom) => <Link href={item.path || '/'}>{dom}</Link>}
      >
        <Route path="/platforms/:platformId">
          <HomePage />
        </Route>

        <Route path="/platforms">
          <PlatformsPage />
        </Route>

        <Route path="/regions">
          <RegionsPage />
        </Route>

        <Route path="/titles">
          <TitlesPage />
        </Route>
      </ProLayout>
    </ConfigProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
