import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './components/app';
import '@fontsource/nunito/300.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/500.css';
import '@fontsource/nunito/700.css';

import './index.css';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
