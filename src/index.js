import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './components/app';
import '@fontsource/nunito';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './index.css';
import { BrowserRouter, HashRouter } from 'react-router-dom';

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);

const Router = process.env.REACT_APP_GH_PAGES !== 'true' ? BrowserRouter : HashRouter;

root.render(
    <Router>
        <App />
    </Router>
);
