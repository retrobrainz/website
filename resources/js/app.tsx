import { ConfigProvider, Flex } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link, Route } from 'wouter';
import HomePage from './pages/home/index.js';
import PlatformsPage from './pages/platforms/index.js';
import RegionsPage from './pages/regions/index.js';
import TitlesPage from './pages/titles/index.js';

function App() {
  return (
    <ConfigProvider>
      <Flex gap={16}>
        <Link to="/">Home</Link>
        <Link to="/platforms">Platforms</Link>
        <Link to="/titles">Titles</Link>
        <Link to="/games">Games</Link>
        <Link to="/regions">Regions</Link>
        <Link to="/genres">Genres</Link>
      </Flex>

      <Route path="/">
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
    </ConfigProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
