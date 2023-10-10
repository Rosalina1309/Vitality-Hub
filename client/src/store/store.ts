import { configureStore } from '@reduxjs/toolkit';
import menuSlice from '@/slices/menuSlice';
import chatbotSlice from '@/slices/chatbotSlice';
import quoteSlice from '@/slices/quoteSlice';
import recipeSlice from '@/slices/recipeSlice';

const store = configureStore({
  reducer: {
    menu: menuSlice,
    chatbot: chatbotSlice,
    quote: quoteSlice,
    recipes: recipeSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
