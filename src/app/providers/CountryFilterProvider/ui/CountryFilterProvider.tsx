import { ReactNode, useReducer } from 'react';
import {
  CountryFilterContext,
  filterReducer,
  initialState,
} from '../../../../shared/context/countryFilterContext.ts';

export const CountryFilterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  return (
    <CountryFilterContext.Provider value={{ state, dispatch }}>
      {children}
    </CountryFilterContext.Provider>
  );
};
