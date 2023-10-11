import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NutritionsOfFood } from '@/interfaces/NutritionsOfFood';
import { fetchCaloriesPerFoodPortion } from '@/apiServices/fetchCaloriesPerFoodPortion';

export interface NutritionState {
  foodQuery: string;
  nutritionData: NutritionsOfFood | null;
  loading: boolean;
  error: string;
}

const initialState: NutritionState = {
  foodQuery: '',
  nutritionData: null,
  loading: false,
  error: '',
};

export const fetchNutritionsAsync = createAsyncThunk(
  'nutrition/fetchNutritions',
  async (foodQuery: string): Promise<NutritionsOfFood[]> => {
    try {
      const response = await fetchCaloriesPerFoodPortion(foodQuery);
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const nutritionSlice = createSlice({
  name: 'nutrition',
  initialState,
  reducers: {
    setFoodQuery: (state, action) => {
      state.foodQuery = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNutritionsAsync.pending, state => {
        state.loading = true;
        state.error = '';
        state.nutritionData = null;
      })
      .addCase(fetchNutritionsAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload[0]) {
          state.nutritionData = action.payload[0];
          state.error = '';
        } else {
          state.error = 'Sorry, we could not find any food nutritions.';
        }
      })
      .addCase(fetchNutritionsAsync.rejected, (state, action) => {
        state.loading = false;
        state.nutritionData = null;
        state.error = 'Error fetching nutrition data.';
        console.error(action.error);
      });
  },
});

export const { setFoodQuery } = nutritionSlice.actions;

export default nutritionSlice.reducer;
