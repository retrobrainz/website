import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <ConfigProvider>
      <div>Hello, RetroBrainz!</div>
    </ConfigProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
