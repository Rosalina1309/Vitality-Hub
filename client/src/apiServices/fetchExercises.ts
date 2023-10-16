
import { Exercise } from "@/interfaces/Exercise";
import axios from "axios";

const rootUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function fetchExercises(): Promise<Exercise[]> {
  try {
    const graphqlEndpoint = `${rootUrl}`;
    const query = '{ exercises { id name type muscle equipment difficulty instructions} }';
    const response = await axios.post<{ data: { exercises : Exercise[] } }>(graphqlEndpoint, {
      query: query,
    });
    const exercisesData = response.data.data.exercises;
    return exercisesData;
  } catch (error) {
    throw error;
  }
}

export async function fetchExercisesByMuscle(muscle:string): Promise<Exercise[]> {
  try {
    const graphqlEndpoint = `${rootUrl}`;
    const query =
      `{ exercisesByMuscle(muscle: "${muscle}") { id name type muscle equipment difficulty instructions }}`
    const response = await axios.post<{
      data: { exercisesByMuscle: Exercise[] };
    }>(graphqlEndpoint, {
      query: query,
    });
    const exercisesData = response.data.data.exercisesByMuscle;
    console.log(exercisesData);
    return exercisesData;
  } catch (error) {
    throw error;
  }
}
