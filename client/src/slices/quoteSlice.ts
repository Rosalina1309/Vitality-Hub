import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { Quote } from '@/interfaces/Quotes';

export interface menuState {
  quote: Quote;
}

const initialState: menuState = {
  quote: {
    id: '',
    quote: '',
    author: '',
  },
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setQuote: (state, action) => {
      state.quote = action.payload;
    },
  },
});

export const selectQuote = (state: RootState) => state.quote.quote;
export const { setQuote } = quoteSlice.actions;

export default quoteSlice.reducer;
