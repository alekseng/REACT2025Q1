import { configureStore } from '@reduxjs/toolkit';
import { photosApi } from '../../../../shared/api/fetchData/photosAPI.ts';
import { searchReducer } from '../../../../shared/model/searchSlice.ts';

export function createReduxStore() {
  return configureStore({
    reducer: {
      search: searchReducer,
      [photosApi.reducerPath]: photosApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(photosApi.middleware),
  });
}

export type RootState = ReturnType<
  ReturnType<typeof createReduxStore>['getState']
>;
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
