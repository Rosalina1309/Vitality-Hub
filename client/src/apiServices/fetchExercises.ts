
import { Exercise } from "@/interfaces/Exercise";
import axios from "axios";

export async function fetchExercises(): Promise<Exercise[]> {
  try {
    const graphqlEndpoint = 'http://localhost:3001/graphql';
    const query = '{ exercises { id name type muscle equipment difficulty instructions} }';
    const response = await axios.post<{ data: { exercises : Exercise[] } }>(graphqlEndpoint, {
      query: query,
    });
    const exercisesData = response.data.data.exercises;
    console.log(exercisesData)
    return exercisesData;
  } catch (error) {
    throw error;
  }
}
