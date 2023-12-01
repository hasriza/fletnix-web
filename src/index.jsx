/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import FontFaceObserver from 'fontfaceobserver';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

// Use consistent styling
import 'sanitize.css/sanitize.css';

// Import root app
import { App } from 'app';

import { HelmetProvider } from 'react-helmet-async';

import { configureAppStore } from 'store/configureStore';

import reportWebVitals from 'reportWebVitals';

// Initialize languages
import './locales/i18n';

const store = configureAppStore();
const root = ReactDOM.createRoot(document.getElementById('root'));

// Observe loading of Source Sans Pro (to remove 'Source Sans Pro', remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Source Sans Pro', {});

// When Source Sans Pro is loaded, add a font-family using Source Sans Pro to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

root.render(
  <Provider store={store}>
    <HelmetProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1f8067',
            colorTextSecondary: '#161520',
            fontFamily: 'Source Sans Pro',
          },
        }}
      >
        <App />
      </ConfigProvider>
    </HelmetProvider>
  </Provider>,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
