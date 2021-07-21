import 'normalize.css';
import './index.css'
import './main.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import App from './js/App'
// import * as Sentry from '@sentry/browser';

const history = createBrowserHistory();

if (import.meta.env.PROD) {
  // if (!process.env.DISABLE_SENTRY) {
  //   Sentry.init({
  //     dsn: process.env.SENTRY_DSN,
  //     environment: process.env.RELEASE_LEVEL
  //   });
  // }

  ReactGA.initialize(import.meta.env.GOOGLE_ANALYTICS_TRACKING_CODE as string);
  // Initialize google analytics page view tracking
  history.listen((location) => {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
