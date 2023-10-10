import { createSlice } from '@reduxjs/toolkit';
import { Quote } from '@/interfaces/Quotes';

export interface QuoteState {
  quote: Quote;
}

const initialState: QuoteState = {
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

export const { setQuote } = quoteSlice.actions;

export default quoteSlice.reducer;
