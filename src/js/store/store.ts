import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './store/authSlice';
import booking from './store/bookingSlice';
import property from './store/propertySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: booking,
    property: property
  }
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
