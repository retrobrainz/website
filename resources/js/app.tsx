import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route } from 'wouter';
import xior from 'xior';
import RequireAuth from './components/require-auth/index.js';
import { AuthProvider } from './contexts/auth/index.js';
import AppLayout from './layouts/app/index.js';
import GamePage from './pages/game/index.js';
import HomePage from './pages/home/index.js';
import PlatformPage from './pages/platform/index.js';
import PlatformsPage from './pages/platforms/index.js';
import RegionsPage from './pages/regions/index.js';
import SettingsPage from './pages/settings/index.js';
import TitlesPage from './pages/titles/index.js';

const authToken = localStorage.getItem('authToken');

xior.defaults.baseURL = '/api';
xior.defaults.headers.Accept = 'application/json';
xior.defaults.headers.Authorization = `Bearer ${authToken}`;

function App() {
  return (
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

          <Route path="/platforms">
            <PlatformsPage />
          </Route>

          <Route path="/regions">
            <RegionsPage />
          </Route>

          <Route path="/titles">
            <TitlesPage />
          </Route>

          <Route path="/settings">
            <RequireAuth>
              <SettingsPage />
            </RequireAuth>
          </Route>
        </AppLayout>
      </AuthProvider>
    </ConfigProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
