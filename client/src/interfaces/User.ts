import { Exercise } from "./Exercise";
import { BMIMeasurements } from "./BMIMeasurements";

import { Recipe } from "./Recipe";
import { WHRMeasurement } from "./WHRMeasurements";
import { HealthLog, Loggable } from "./Loggable";


export interface User {
  id: string;
  username: string;
  email: string;
  birthdate: null | string;
  gender: string;
  favoriteExercises: Exercise[];
  favoriteRecipes: Recipe[];
  bmiMeasurements: BMIMeasurements[];
  whrMeasurements: WHRMeasurement[];
  healthLogs: HealthLog[];
}

export interface RegistrationData {
  username: string;
  password: string;
  email: string;
  gender: string;
}