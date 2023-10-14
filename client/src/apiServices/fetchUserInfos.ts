import axios from 'axios';

export async function fetchUserInfos(token: string) {
  try {
    const graphqlEndpoint = process.env.NEXT_PUBLIC_BACKEND_API_URL as string;
    const query = `
    {user { id username email birthdate gender userMeasurements { height weight bmi waist hips whr measurementUnit createdAt} userGoals { personalGoal startDate endDate} favoriteExercises {exercise { id name type muscle equipment difficulty instructions}} favoriteRecipes { recipe { id title image calories protein fat carbs}}}}
    `;

    const response = await axios.post(
      graphqlEndpoint,
      {
        query: query,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data.data.user);
    return response.data.data.user;
  } catch (error) {
    throw error;
  }
}
