import { api } from '../../services/api'; // tu base api

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/product',
      providesTags: ['Products'],
    }),
    getProductById: builder.query({
      query: (id) => `/product/${id}`,
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
