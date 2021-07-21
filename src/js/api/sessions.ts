import { AppDispatch } from 'CommunityApp/store/store';
import { LoginCredentials, setIsAuthenticated, setAuthError, setAuthLoading } from 'CommunityApp/store/authSlice';

import api from 'CommunityApp/api/client';

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
