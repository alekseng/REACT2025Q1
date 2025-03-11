import { createSlice } from '@reduxjs/toolkit';

interface Form {
  name: string | undefined;
  age: number | undefined;
  email: string | undefined;
  password: string | undefined;
  gender: string | undefined;
  picture: string;
  country: string | undefined;
  terms: boolean | undefined;
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
