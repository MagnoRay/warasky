import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://urban-guacamole-jv54vgxvpv4fprx6-3001.app.github.dev', // cambia si tu backend tiene otra ruta
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
