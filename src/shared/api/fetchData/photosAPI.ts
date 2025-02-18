import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchData } from '../types/types.ts';
import { ID } from './fetchData.ts';

interface QueryParams {
  page: string | undefined;
  query: string;
  per_page?: number;
  orientation?: 'string';
}

export const photosApi = createApi({
  reducerPath: 'photosAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.unsplash.com/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Client-ID ${ID}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchPhotos: builder.query<FetchData, QueryParams>({
      query: ({ page, query, per_page = 10, orientation = 'landscape' }) => ({
        url: 'search/photos',
        params: { page, query, per_page, orientation },
      }),
    }),
  }),
});

export const { useFetchPhotosQuery } = photosApi;
