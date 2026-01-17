import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { FetchProvider } from 'react-fast-fetch';
import { Route } from 'wouter';
import xior from 'xior';
import RequireAuth from './components/require-auth/index.js';
import { AuthProvider } from './contexts/auth/index.js';
import AppLayout from './layouts/app/index.js';
import GamePage from './pages/game/index.js';
import HomePage from './pages/home/index.js';
import PlatformPage from './pages/platform/index.js';
import SettingsPage from './pages/settings/index.js';
import UserPage from './pages/user/index.js';

const authToken = localStorage.getItem('authToken');

xior.defaults.baseURL = '/api';
xior.defaults.headers.Accept = 'application/json';
xior.defaults.headers.Authorization = `Bearer ${authToken}`;

function App() {
  return (
    <FetchProvider fetcher={(url) => xior.get(url).then((res) => res.data)}>
      <ConfigProvider>
        <AuthProvider>
          <AppLayout>
            <Route path="/">
              <HomePage />
            </Route>

            <Route path="/platforms/:platformId">
              <PlatformPage />
            </Route>

            <Route path="/platforms/:platformId/games/:gameId">
              <GamePage />
            </Route>

            <Route path="/users/:userId">
              <UserPage />
            </Route>

            <Route path="/settings">
              <RequireAuth>
                <SettingsPage />
              </RequireAuth>
            </Route>
          </AppLayout>
        </AuthProvider>
      </ConfigProvider>
    </FetchProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
