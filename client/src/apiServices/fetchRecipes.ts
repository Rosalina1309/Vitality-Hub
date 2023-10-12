import { Recipe } from "@/interfaces/Recipe";
import axios from "axios";

export async function fetchRecipes(): Promise<Recipe[]> {
  try {
    const graphqlEndpoint = 'http://localhost:3001/graphql';
    const query = '{ recipes { id title image calories protein fat carbs } }';
    const response = await axios.post<{ data: { recipes: Recipe[] } }>(graphqlEndpoint, {
      query: query,
    });
    const recipesData = response.data.data.recipes;
    console.log(recipesData)
    return recipesData;
  } catch (error) {
    throw error;
  }
}





