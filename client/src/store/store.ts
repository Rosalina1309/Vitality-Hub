import { configureStore } from '@reduxjs/toolkit';
import menuSlice from '@/slices/menuSlice';
import chatbotSlice from '@/slices/chatbotSlice';
import quoteSlice from '@/slices/quoteSlice';
import recipeSlice from '@/slices/recipeSlice';
import bmiSlice from '@/slices/bmiSlice';
import calculatorsSlice from '@/slices/calculatorsSlice';
import caloriesChartSlice from '@/slices/caloriesChartSlice';
import exercisesSlice from '@/slices/exercisesSlice';
import nutritionSlice from '@/slices/nutritionSlice';
import whrSlice from '@/slices/whrSlice';
import authSlice from '@/slices/authSlice';
import burnedCaloriesSlice from '@/slices/burnedCaloriesSlice';
import calendarSlice from '@/slices/calendarSlice';

const store = configureStore({
  reducer: {
    menu: menuSlice,
    chatbot: chatbotSlice,
    quote: quoteSlice,
    recipes: recipeSlice,
    bmi: bmiSlice,
    calculators: calculatorsSlice,
    caloriesChart: caloriesChartSlice,
    exercises: exercisesSlice,
    nutrition: nutritionSlice,
    whr: whrSlice,
    auth: authSlice,
    burnedCalories: burnedCaloriesSlice,
    calendar: calendarSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
