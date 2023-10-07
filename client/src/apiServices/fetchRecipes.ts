import { Recipe } from "@/interfaces/Recipe";
import axios from "axios";

const API_KEY = '4a1e5c2da5fd4db7821d61af075a2396'; 
const MIN_CARBS = 10;
const MAX_CARBS = 50;
const NUMBER_OF_RECIPES = 5;

const rootUrl = `https://api.spoonacular.com/recipes/findByNutrients?apiKey=${API_KEY}&minCarbs=${MIN_CARBS}&maxCarbs=${MAX_CARBS}&number=${NUMBER_OF_RECIPES}`;

export async function fetchRecipes(): Promise<Recipe[]> {
  try {
    const response = await axios.get<Recipe[]>(rootUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
}
