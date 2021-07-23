import { AppDispatch, dispatch as appDispatch, dispatch } from '../store/store';
import { LoginCredentials, setIsAuthenticated, setAuthError, setAuthLoading } from '../store/authSlice';
import { auth } from './firebase'

import api from '../api/client';

auth.onAuthStateChanged(userAuth => {
  if (userAuth) {
    appDispatch(setIsAuthenticated(true));
  } else {
    appDispatch(setIsAuthenticated(false));
  }
});

export const login = (loginCreds: LoginCredentials) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAuthLoading(true));
    api
      .post('/api/sessions', { session: loginCreds })
      .then((_response) => {
        dispatch(setAuthLoading(false));
        dispatch(setIsAuthenticated(true));
      })
      .catch((e) => {
        dispatch(setAuthLoading(false));
        dispatch(setIsAuthenticated(false));
        // Report error to common error notification reducer?
        dispatch(setAuthError(e.message));
      });
  };
};

export const logout = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setAuthLoading(true));
    auth.signOut().finally(() => {
      dispatch(setAuthLoading(false));
    })
  }
}

export const logoutRaw = async () => {
  return auth.signOut()
}


export default {
  login,
  logout,
  logoutRaw
}
