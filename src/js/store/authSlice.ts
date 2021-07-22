import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Admin } from 'api/types';
import { unwrapError, APIError } from './api/client';

type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  admin: Admin | undefined;
  error: APIError | null;
  isLoading: boolean;
};

export interface LoginCredentials {
  email: string;
  password: string;
}

const IS_AUTHENTICATED_STORAGE_KEY = 'accountAuthenticated';

const hydrateIsAuthenticated = () => localStorage.getItem(IS_AUTHENTICATED_STORAGE_KEY) === 'true';
const persistIsAuthenticated = (isAuthenticated: boolean) =>
  localStorage.setItem(IS_AUTHENTICATED_STORAGE_KEY, isAuthenticated ? 'true' : 'false');

const initialState: AuthState = {
  isAuthenticated: hydrateIsAuthenticated(),
  isInitialized: false,
  admin: undefined,
  error: null,
  isLoading: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      persistIsAuthenticated(action.payload);
      state.isAuthenticated = action.payload;
    },
    setIsInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setAdmin: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = unwrapError(action.payload);
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setIsAuthenticated, setIsInitialized, setAdmin, setAuthError, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;
