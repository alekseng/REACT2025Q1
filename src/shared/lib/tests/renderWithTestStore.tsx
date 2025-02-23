import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { searchReducer } from '../../model/searchSlice.ts';
import { checkedCardsReducer } from '../../model/checkedCardsSlice.ts';
import { photosApi } from '../../api/fetchData/photosAPI.ts';

interface renderWithTestStoreProps {
  children: ReactNode;
  preloadedState?: object;
}

export const renderWithTestStore = ({
  children,
  preloadedState = {},
}: renderWithTestStoreProps) => {
  const store = configureStore({
    reducer: {
      search: searchReducer,
      checkedCards: checkedCardsReducer,
      [photosApi.reducerPath]: photosApi.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(photosApi.middleware),
  });

  return <Provider store={store}>{children}</Provider>;
};
