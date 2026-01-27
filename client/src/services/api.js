import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/', // cambia si tu backend tiene otra ruta
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      console.log(getState());

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Products'],
  endpoints: () => ({}),
});
