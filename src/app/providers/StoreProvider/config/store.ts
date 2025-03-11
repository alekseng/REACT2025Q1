import { configureStore } from '@reduxjs/toolkit';
import { photosApi } from '../../../../shared/api/fetchData/photosAPI.ts';
import { searchReducer } from '../../../../shared/model/searchSlice.ts';
import { checkedCardsReducer } from '../../../../shared/model/checkedCardsSlice.ts';

export function createReduxStore() {
  return configureStore({
    reducer: {
      search: searchReducer,
      checkedCards: checkedCardsReducer,
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
export const store = createReduxStore();
