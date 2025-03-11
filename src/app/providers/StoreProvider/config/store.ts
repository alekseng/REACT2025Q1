import { configureStore } from '@reduxjs/toolkit';
import { formReducer } from '../../../../shared/model/formSlice.ts';

export function createReduxStore() {
  return configureStore({
    reducer: {
      form: formReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
}

export type RootState = ReturnType<
  ReturnType<typeof createReduxStore>['getState']
>;
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
export const store = createReduxStore();
