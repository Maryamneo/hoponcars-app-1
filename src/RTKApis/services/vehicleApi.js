import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const vehicleApi = createApi({
  reducerPath: 'vehicleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hoponcar-production.up.railway.app/api/v1/' }),
  endpoints: (builder) => ({
    getVehicles: builder.query({
      query: () => 'vehicles/getall-vehicles',
    }),
  }),
});

export const { useGetVehiclesQuery } = vehicleApi;
// vehicleApi.js

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const hoponBaseUrl = 'https://hoponcar-production.up.railway.app/api/v1/';

// export const vehicleApi = createApi({
//   reducerPath: 'vehicleApi',
//   baseQuery: fetchBaseQuery({ baseUrl: hoponBaseUrl }),
//   endpoints: (builder) => ({
//     getVehicles: builder.query({
//       query: () => 'vehicles/getall-vehicles',
//     }),
//   }),
// });

// export const { useGetVehiclesQuery } = vehicleApi;

// export default vehicleApi;
