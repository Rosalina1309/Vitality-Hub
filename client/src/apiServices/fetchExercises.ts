// const axios = require('axios');

// export const fetchExercises = async (muscle: string) => {
//   try {
//     const response = await axios.get('https://api.api-ninjas.com/v1/exercises', {
//       params: {
//         muscle: muscle,
//       },
//       headers: {
//         'X-Api-Key': 'u1MqE9OcSe2ROpt0Tl+7HQ==domWx22TnqrwssW3', 
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error)
//     throw(error)
//   }
// };

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
