import React, { createContext } from 'react';
import { PurpleArray } from '../api/types/types.ts';

export type Population = 'ascending' | 'descending' | '';

export interface CountryFilterState {
  region: string;
  country: string;
  population: Population;
  data: PurpleArray[];
}

export const initialState: CountryFilterState = {
  region: '',
  country: '',
  population: '',
  data: [],
};

type CountryFilterAction =
  | { type: 'SET_REGION'; payload: string }
  | { type: 'SET_COUNTRY'; payload: string }
  | { type: 'SET_POPULATION'; payload: Population }
  | { type: 'SET_DATA'; payload: PurpleArray[] };

export const filterReducer = (
  state: CountryFilterState,
  action: CountryFilterAction
): CountryFilterState => {
  switch (action.type) {
    case 'SET_REGION':
      return { ...state, region: action.payload };
    case 'SET_COUNTRY':
      return { ...state, country: action.payload };
    case 'SET_POPULATION':
      return { ...state, population: action.payload };
    case 'SET_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export const CountryFilterContext = createContext<
  | { state: CountryFilterState; dispatch: React.Dispatch<CountryFilterAction> }
  | undefined
>(undefined);
