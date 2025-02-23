import React from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store.ts';

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children } = props;

  const store = createReduxStore();

  return <Provider store={store}>{children}</Provider>;
};
