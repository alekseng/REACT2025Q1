import { createSlice } from '@reduxjs/toolkit';
import { Result } from '../api/types/types.ts';

interface cards {
  id: string;
  card: Result;
}

interface checkedCardsSlice {
  checkedCards: cards[];
}

const initialState: checkedCardsSlice = {
  checkedCards: [],
};

const checkedCardsSlice = createSlice({
  name: 'checkedCards',
  initialState,
  reducers: {
    addCard: (state, action) => {
      const index = state.checkedCards.findIndex(
        (card) => card.id === action.payload.id
      );

      if (index !== -1) {
        state.checkedCards.splice(index, 1);
      } else {
        state.checkedCards.push(action.payload);
      }
    },
  },
});

export const { actions: checkedCardsActions } = checkedCardsSlice;
export const { reducer: checkedCardsReducer } = checkedCardsSlice;
