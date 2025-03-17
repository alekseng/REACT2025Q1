import { createSlice } from '@reduxjs/toolkit';

export interface Form {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  picture: string;
  country: string;
  terms: boolean;
}

interface formSlice {
  form: Form[];
}

const initialState: formSlice = {
  form: [],
};

const FormSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addForm: (state, action: { payload: Form }) => {
      state.form.push(action.payload);
    },
  },
});

export const { actions: formActions } = FormSlice;
export const { reducer: formReducer } = FormSlice;
