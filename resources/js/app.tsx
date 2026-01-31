import { App as AntApp, ConfigProvider } from 'antd';
import de from 'antd/es/locale/de_DE.js';
import en from 'antd/es/locale/en_US.js';
import es from 'antd/es/locale/es_ES.js';
import fr from 'antd/es/locale/fr_FR.js';
import it from 'antd/es/locale/it_IT.js';
import ja from 'antd/es/locale/ja_JP.js';
import zh from 'antd/es/locale/zh_CN.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { FetchProvider } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Route } from 'wouter';
import xior from 'xior';
import RequireAuth from './components/require-auth/index.js';
import './config/fetch.js';
import './config/i18n.js';
import { AuthProvider } from './contexts/auth/index.js';
import AppLayout from './layouts/app/index.js';
import FrontendsPage from './pages/frontends/index.js';
import FrontendPage from './pages/frontend/index.js';
import FrontendNewPage from './pages/frontend-new/index.js';
import FrontendEditPage from './pages/frontend-edit/index.js';
import EmulatorsPage from './pages/emulators/index.js';
import EmulatorPage from './pages/emulator/index.js';
import EmulatorNewPage from './pages/emulator-new/index.js';
import EmulatorEditPage from './pages/emulator-edit/index.js';
import FranchisesPage from './pages/franchises/index.js';
import FranchisePage from './pages/franchise/index.js';
import FranchiseNewPage from './pages/franchise-new/index.js';
import FranchiseEditPage from './pages/franchise-edit/index.js';
import GamePage from './pages/game/index.js';
import HomePage from './pages/home/index.js';
import LoginPage from './pages/login/index.js';
import PlatformPage from './pages/platform/index.js';
import PlatformsPage from './pages/platforms/index.js';
import RegisterPage from './pages/register/index.js';
import SearchPage from './pages/search/index.js';
import SettingsPage from './pages/settings/index.js';
import UserPage from './pages/user/index.js';

const localeMap: Record<string, any> = {
  de,
  en,
  es,
  fr,
  it,
  ja,
  zh,
};

function App() {
  const { i18n } = useTranslation();

  xior.defaults.headers['Accept-Language'] = i18n.language;

  return (
    <FetchProvider fetcher={(url) => xior.get(url).then((res) => res.data)}>
      <ConfigProvider locale={localeMap[i18n.language]}>
        <AntApp>
          <AuthProvider>
            <AppLayout>
              <Route path="/">
                <HomePage />
              </Route>

              <Route path="/login">
                <LoginPage />
              </Route>

              <Route path="/register">
                <RegisterPage />
              </Route>

              <Route path="/platforms">
                <PlatformsPage />
              </Route>

              <Route path="/search">
                <SearchPage />
              </Route>

              <Route path="/frontends">
                <FrontendsPage />
              </Route>

              <Route path="/frontends/new">
                <RequireAuth>
                  <FrontendNewPage />
                </RequireAuth>
              </Route>

              <Route path="/frontends/:frontendId/edit">
                <RequireAuth>
                  <FrontendEditPage />
                </RequireAuth>
              </Route>

              <Route path="/frontends/:frontendId">
                <FrontendPage />
              </Route>

              <Route path="/platforms/:platformId">
                <PlatformPage />
              </Route>

              <Route path="/emulators">
                <EmulatorsPage />
              </Route>

              <Route path="/emulators/new">
                <RequireAuth>
                  <EmulatorNewPage />
                </RequireAuth>
              </Route>

              <Route path="/emulators/:emulatorId/edit">
                <RequireAuth>
                  <EmulatorEditPage />
                </RequireAuth>
              </Route>

              <Route path="/emulators/:emulatorId">
                <EmulatorPage />
              </Route>

              <Route path="/franchises">
                <FranchisesPage />
              </Route>

              <Route path="/franchises/new">
                <RequireAuth>
                  <FranchiseNewPage />
                </RequireAuth>
              </Route>

              <Route path="/franchises/:franchiseId/edit">
                <RequireAuth>
                  <FranchiseEditPage />
                </RequireAuth>
              </Route>

              <Route path="/franchises/:franchiseId">
                <FranchisePage />
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
        </AntApp>
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
