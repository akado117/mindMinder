const {
  VITE_FB_KEY,
  VITE_FB_AUTH_DOMAIN,
  VITE_FB_DATABASE_URL,
  VITE_FB_PROJECT_ID,
  VITE_FB_STORAGE_BUCKET,
  VITE_FB_MESSAGING_SENDER_ID,
  VITE_FB_APP_ID,
  VITE_MEASUREMENT_ID,
  VITE_ENABLE_SENTRY,
  VITE_SENTRY_DSN,
  VITE_RELEASE_LEVEL,
  VITE_BASE_API_URL,

} = import.meta.env

export const firebaseConfig = {
  apiKey: VITE_FB_KEY || "AIzaSyCPD4-gzebMQdgaYNPE81occRrRgfOb4zY",
  authDomain: VITE_FB_AUTH_DOMAIN || "cuminu-staging.firebaseapp.com",
  databaseURL: VITE_FB_DATABASE_URL || "https://cuminu-staging-default-rtdb.firebaseio.com",
  projectId: VITE_FB_PROJECT_ID || "cuminu-staging",
  storageBucket: VITE_FB_STORAGE_BUCKET || "cuminu-staging.appspot.com",
  messagingSenderId: VITE_FB_MESSAGING_SENDER_ID || "689452162387",
  appId: VITE_FB_APP_ID || "1:689452162387:web:2af54658f3ac6f4dfa95a6",
  measurementId: VITE_MEASUREMENT_ID || "G-PLYNY4NYXT"
}

export const enableSentry = VITE_ENABLE_SENTRY || false;
export const sentryDSN = VITE_SENTRY_DSN || "";
export const releaseLevel = VITE_RELEASE_LEVEL || "";
export const baseAPIURL = VITE_BASE_API_URL || "";