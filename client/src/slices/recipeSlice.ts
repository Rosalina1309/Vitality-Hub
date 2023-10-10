import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { Recipe } from '@/interfaces/Recipe';
import { fetchRecipes } from '@/apiServices/fetchRecipes';
import { mockRecipes } from '@/mock/recipes.mock';


export interface recipeState {
  recipes: Recipe[];
}

const initialState: recipeState = {
  recipes: [],
};

export const fetchRecipesAsync = createAsyncThunk<Recipe[]> (
  'recipes/fetchRecipes',
  async () => {
    try {
      const data = await fetchRecipes();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(
      fetchRecipesAsync.fulfilled, (state, action) => {
        state.recipes = action.payload;
      }
    ).addCase(
      fetchRecipesAsync.rejected, (state) => {
        state.recipes = mockRecipes;
      }
    );
  }
});

export const selectRecipe = (state: RootState) => state.recipes.recipes;

export default recipeSlice.reducer;
