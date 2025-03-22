import { useContext } from 'react';
import { CountryFilterContext } from './countryFilterContext.ts';

export const useCountryFilter = () => {
  const context = useContext(CountryFilterContext);
  if (!context) {
    throw new Error(
      'useCountryFilter must be used within a CountryFilterProvider'
    );
  }
  return context;
};
