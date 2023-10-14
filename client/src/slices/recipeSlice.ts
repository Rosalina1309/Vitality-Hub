import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Recipe } from '@/interfaces/Recipe';
import { fetchRecipes } from '@/apiServices/fetchRecipes';
import { mockRecipes } from '@/mock/recipes.mock';

export interface RecipeState {
  recipes: Recipe[];
  loadingMessage: string;
}

const initialState: RecipeState = {
  recipes: [],
  loadingMessage: '',
};

export const fetchRecipesAsync = createAsyncThunk<Recipe[]>(
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
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRecipesAsync.pending, (state) => {
        state.loadingMessage = 'Loading recipes...';
      })
      .addCase(fetchRecipesAsync.fulfilled, (state, action) => {
        state.loadingMessage = '';
        state.recipes = action.payload;
      })
      .addCase(fetchRecipesAsync.rejected, state => {
        state.loadingMessage = '';
        state.recipes = mockRecipes;
      });
  },
});

export default recipeSlice.reducer;
