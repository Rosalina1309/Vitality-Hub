
import { Exercise } from "@/interfaces/Exercise";
import axios from "axios";

const rootUrl = process.env.NEXT_PUBLIC_ROOT_URL;

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
