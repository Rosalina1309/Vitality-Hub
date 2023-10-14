import { Recipe } from "@/interfaces/Recipe";
import axios from "axios";

export async function fetchRecipes(): Promise<Recipe[]> {
  try {
    const graphqlEndpoint = process.env.NEXT_PUBLIC_BACKEND_API_URL as string;
    const query = '{ recipes { id title image calories protein fat carbs } }';
    const response = await axios.post<{ data: { recipes: Recipe[] } }>(graphqlEndpoint, {
      query: query,
    });
    const recipesData = response.data.data.recipes;
    return recipesData;
  } catch (error) {
    throw error;
  }
}





