import { createSlice } from '@reduxjs/toolkit';

export interface CaloriesChartState {
  consumedCalories: string;
}

const initialState: CaloriesChartState = {
  consumedCalories: '',
};

export const caloriesChartSlice = createSlice({
  name: 'caloriesChart',
  initialState,
  reducers: {
    setConsumedCalories: (state, action) => {
      state.consumedCalories = action.payload;
    },
  },
});

export const { setConsumedCalories } = caloriesChartSlice.actions;

export default caloriesChartSlice.reducer;
