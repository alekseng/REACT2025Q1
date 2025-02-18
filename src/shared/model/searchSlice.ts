import { createSlice } from '@reduxjs/toolkit';

interface SearchSlice {
  query: string;
}

const initialState: SearchSlice = {
  query: localStorage.getItem('aleksengQuery') || 'cheetah',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
      localStorage.setItem('aleksengQuery', action.payload);
    },
  },
});

export const { actions: searchActions } = searchSlice;
export const { reducer: searchReducer } = searchSlice;
