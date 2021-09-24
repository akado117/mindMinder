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
  apiKey: VITE_FB_KEY || 'AIzaSyCLx0QXS8exex7irzomhGd8emTiVao6ff8',
  authDomain: VITE_FB_AUTH_DOMAIN || 'mindminder-4008f.firebaseapp.com',
  databaseURL: VITE_FB_DATABASE_URL || 'https://cuminu-staging-default-rtdb.firebaseio.com',
  projectId: VITE_FB_PROJECT_ID || 'mindminder-4008f',
  storageBucket: VITE_FB_STORAGE_BUCKET || 'mindminder-4008f.appspot.com',
  messagingSenderId: VITE_FB_MESSAGING_SENDER_ID || '173597978124',
  appId: VITE_FB_APP_ID || '1:173597978124:web:243cd2ddee21e242e04829',
  measurementId: VITE_MEASUREMENT_ID || 'G-VK23BQ0PLM',
}

export const enableSentry = VITE_ENABLE_SENTRY || false
export const sentryDSN = VITE_SENTRY_DSN || ''
export const releaseLevel = VITE_RELEASE_LEVEL || ''
export const baseAPIURL = VITE_BASE_API_URL || ''
