import { createSlice } from '@reduxjs/toolkit';

export interface CaloriesChartState {
  consumedCalories: string;
}

const initialState: CaloriesChartState = {
  consumedCalories: '',
};

export const caloriesSlice = createSlice({
  name: 'caloriesChart',
  initialState,
  reducers: {
    setConsumedCalories: (state, action) => {
      state.consumedCalories = action.payload;
    },
  },
});

export const { setConsumedCalories } = caloriesSlice.actions;

export default caloriesSlice.reducer;
