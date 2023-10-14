import { Exercise } from "./Exercise";
import { Recipe } from "./Recipe";

export interface UserAuth {
  user_id: string;
  username: string;
}

export interface RegistrationData {
  username: string;
  password: string;
  email: string;
  gender: string;
} 

export interface User {
  id: string;
  username: string;
  email: string;
  birthdate: null | string;
  gender: string;
  favoriteExercises: Exercise[];
  favoriteRecipes: Recipe[];
}

