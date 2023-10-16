import { Exercise } from "@/interfaces/Exercise";
import axios from "axios";

const rootUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const fetchExercisesByMuscle = async (muscle: string): Promise<Exercise[]> => {
  try {
    const graphqlEndpoint = `${rootUrl}`;
    const query = `{
      exercisesByMuscle(muscle: "${muscle}") {
        id name type muscle equipment difficulty instructions
      }
    }`;
    const response = await axios.post<{ data: { exercisesByMuscle: Exercise[] } }>(graphqlEndpoint, {
      query: query,
    });
    const exercisesData = response.data.data.exercisesByMuscle;
    return exercisesData;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    throw error;
  }
};
