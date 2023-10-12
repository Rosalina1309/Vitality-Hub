import { createSlice } from "@reduxjs/toolkit";

interface BurnedCaloriesState {
  duration: string;
  selectedActivity: string;
  weight: string;
  totalCalories: number | null;
}

const initialState: BurnedCaloriesState = {
  duration: '',
  selectedActivity: '',
  weight: '',
  totalCalories: null,
};

const burnedCaloriesSlice = createSlice({
  name: 'burnedCalories',
  initialState,
  reducers: {
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setSelectedActivity: (state, action) => {
      state.selectedActivity = action.payload;
    },
    setWeight: (state, action) => {
      state.weight = action.payload;
    },
    setTotalCalories: (state, action) => {
      state.totalCalories = action.payload;
    },
  },
});

export const {
  setDuration,
  setSelectedActivity,
  setWeight,
  setTotalCalories,
} = burnedCaloriesSlice.actions;

export default burnedCaloriesSlice.reducer;
