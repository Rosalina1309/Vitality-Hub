import { Exercise } from "./Exercise";
import { Recipe } from "./Recipe";

export interface User {
  id: string;
  username: string;
  email: string;
  birthdate: null | string;
  gender: string;
  favoriteExercises: Exercise[];
  favoriteRecipes: Recipe[];
}

export interface RegistrationData {
  username: string;
  password: string;
  email: string;
  gender: string;
}