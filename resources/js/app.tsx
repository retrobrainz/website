import { App as AntApp, ConfigProvider, Flex, Spin } from 'antd';
import de from 'antd/es/locale/de_DE';
import en from 'antd/es/locale/en_US';
import es from 'antd/es/locale/es_ES';
import fr from 'antd/es/locale/fr_FR';
import it from 'antd/es/locale/it_IT';
import ja from 'antd/es/locale/ja_JP';
import zh from 'antd/es/locale/zh_CN';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { FetchProvider } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Route } from 'wouter';
import xior from 'xior';
import RequireAuth from './components/require-auth';
import './config/fetch';
import './config/i18n';
import { AuthProvider } from './contexts/auth';
import AppLayout from './layouts/app';

const EmulatorEditPage = React.lazy(() => import('./pages/emulator-edit'));
const EmulatorNewPage = React.lazy(() => import('./pages/emulator-new'));
const EmulatorPage = React.lazy(() => import('./pages/emulator'));
const EmulatorsPage = React.lazy(() => import('./pages/emulators'));
const FranchiseEditPage = React.lazy(() => import('./pages/franchise-edit'));
const FranchiseNewPage = React.lazy(() => import('./pages/franchise-new'));
const FranchiseTranslatePage = React.lazy(() => import('./pages/franchise-translate'));
const FranchisePage = React.lazy(() => import('./pages/franchise'));
const FranchisesPage = React.lazy(() => import('./pages/franchises'));
const FrontendEditPage = React.lazy(() => import('./pages/frontend-edit'));
const FrontendNewPage = React.lazy(() => import('./pages/frontend-new'));
const FrontendPage = React.lazy(() => import('./pages/frontend'));
const FrontendsPage = React.lazy(() => import('./pages/frontends'));
const GamePage = React.lazy(() => import('./pages/game'));
const GameTranslatePage = React.lazy(() => import('./pages/game-translate'));
const GenreEditPage = React.lazy(() => import('./pages/genre-edit'));
const GenreNewPage = React.lazy(() => import('./pages/genre-new'));
const GenreTranslatePage = React.lazy(() => import('./pages/genre-translate'));
const GenrePage = React.lazy(() => import('./pages/genre'));
const GenresPage = React.lazy(() => import('./pages/genres'));
const HomePage = React.lazy(() => import('./pages/home'));
const LoginPage = React.lazy(() => import('./pages/login'));
const PlatformPage = React.lazy(() => import('./pages/platform'));
const PlatformsPage = React.lazy(() => import('./pages/platforms'));
const RegisterPage = React.lazy(() => import('./pages/register'));
const SearchPage = React.lazy(() => import('./pages/search'));
const SettingsPage = React.lazy(() => import('./pages/settings'));
const UserPage = React.lazy(() => import('./pages/user'));

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
              <React.Suspense
                fallback={
                  <Flex justify="center" align="center" style={{ padding: 100 }}>
                    <Spin size="large" />
                  </Flex>
                }
              >
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

                <Route path="/franchises/:franchiseId/translate">
                  <RequireAuth>
                    <FranchiseTranslatePage />
                  </RequireAuth>
                </Route>

                <Route path="/franchises/:franchiseId">
                  <FranchisePage />
                </Route>
                <Route path="/genres">
                  <GenresPage />
                </Route>

                <Route path="/genres/new">
                  <RequireAuth>
                    <GenreNewPage />
                  </RequireAuth>
                </Route>

                <Route path="/genres/:genreId">
                  <GenrePage />
                </Route>

                <Route path="/genres/:genreId/edit">
                  <RequireAuth>
                    <GenreEditPage />
                  </RequireAuth>
                </Route>

                <Route path="/genres/:genreId/translate">
                  <RequireAuth>
                    <GenreTranslatePage />
                  </RequireAuth>
                </Route>

                <Route path="/platforms/:platformId/games/:gameId/translate">
                  <RequireAuth>
                    <GameTranslatePage />
                  </RequireAuth>
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
              </React.Suspense>
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
