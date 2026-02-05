import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { productsApi } from '../features/products/productsApi';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([api.middleware]),
});

