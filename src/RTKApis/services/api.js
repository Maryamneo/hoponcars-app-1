// services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL for your API
const baseUrl = 'https://backend.halla.sa/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    // Define your endpoints here
    getCards: builder.query({
      query: () => 'cards?order=ASC&page=1&take=10',
    }),
    // Example POST endpoint
    createCard: builder.mutation({
      query: (newCard) => ({
        url: 'cards',
        method: 'POST',
        body: newCard,
      }),
    }),
    // Example GET endpoint with parameters
    getCardById: builder.query({
      query: (id) => `cards/${id}`,
    }),
    // Example PUT endpoint
    updateCard: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `cards/${id}`,
        method: 'PUT',
        body: updateData,
      }),
    }),
    // Example DELETE endpoint
    deleteCard: builder.mutation({
      query: (id) => ({
        url: `cards/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCardsQuery,
  useCreateCardMutation,
  useGetCardByIdQuery,
  useUpdateCardMutation,
  useDeleteCardMutation,
} = api;
