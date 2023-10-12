// Define interface for exercise object
export interface UserExercise {
  exerciseId: string;
}

// Define interface for recipe object
export interface UserRecipe {
  recipeId: string;
}

// Define interface for user data
export interface User {
  id: string;
  username: string;
  email: string;
  gender: string;
  userMeasurements?: any[]; 
  userGoals?: any[]; 
  favoriteExercises?: UserExercise[];
  favoriteRecipes?: UserRecipe[];
}


