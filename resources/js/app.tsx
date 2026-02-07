import { App as AntApp, ConfigProvider, Flex, Spin } from 'antd';
import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { FetchProvider } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Route } from 'wouter';
import xior from 'xior';
import RequireAuth from './components/require-auth';
import './config/fetch';
import './config/i18n';
import { AuthProvider } from './contexts/auth';
import useAntdLocale from './hooks/use-antd-locale';
import AppLayout from './layouts/app';

const EmulatorEditPage = lazy(() => import('./pages/emulator-edit'));
const EmulatorNewPage = lazy(() => import('./pages/emulator-new'));
const EmulatorPage = lazy(() => import('./pages/emulator'));
const EmulatorsPage = lazy(() => import('./pages/emulators'));
const CompanyEditPage = lazy(() => import('./pages/company-edit'));
const CompanyNewPage = lazy(() => import('./pages/company-new'));
const CompanyPage = lazy(() => import('./pages/company'));
const CompaniesPage = lazy(() => import('./pages/companies'));
const FranchiseEditPage = lazy(() => import('./pages/franchise-edit'));
const FranchiseNewPage = lazy(() => import('./pages/franchise-new'));
const FranchiseTranslatePage = lazy(() => import('./pages/franchise-translate'));
const FranchisePage = lazy(() => import('./pages/franchise'));
const FranchisesPage = lazy(() => import('./pages/franchises'));
const FrontendEditPage = lazy(() => import('./pages/frontend-edit'));
const FrontendNewPage = lazy(() => import('./pages/frontend-new'));
const FrontendPage = lazy(() => import('./pages/frontend'));
const FrontendsPage = lazy(() => import('./pages/frontends'));
const GamePage = lazy(() => import('./pages/game'));
const GameTranslatePage = lazy(() => import('./pages/game-translate'));
const GenreEditPage = lazy(() => import('./pages/genre-edit'));
const GenreNewPage = lazy(() => import('./pages/genre-new'));
const GenreTranslatePage = lazy(() => import('./pages/genre-translate'));
const GenrePage = lazy(() => import('./pages/genre'));
const GenresPage = lazy(() => import('./pages/genres'));
const HomePage = lazy(() => import('./pages/home'));
const LoginPage = lazy(() => import('./pages/login'));
const PlatformPage = lazy(() => import('./pages/platform'));
const PlatformsPage = lazy(() => import('./pages/platforms'));
const RegisterPage = lazy(() => import('./pages/register'));
const SearchPage = lazy(() => import('./pages/search'));
const SettingsPage = lazy(() => import('./pages/settings'));
const UserPage = lazy(() => import('./pages/user'));

function App() {
  const { i18n } = useTranslation();

  xior.defaults.headers['Accept-Language'] = i18n.language;

  const locale = useAntdLocale(i18n.language);

  return (
    <FetchProvider fetcher={(url) => xior.get(url).then((res) => res.data)}>
      <ConfigProvider locale={locale}>
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

                <Route path="/companies">
                  <CompaniesPage />
                </Route>

                <Route path="/companies/new">
                  <RequireAuth>
                    <CompanyNewPage />
                  </RequireAuth>
                </Route>

                <Route path="/companies/:companyId/edit">
                  <RequireAuth>
                    <CompanyEditPage />
                  </RequireAuth>
                </Route>

                <Route path="/companies/:companyId">
                  <CompanyPage />
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
