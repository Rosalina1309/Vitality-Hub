import axios from 'axios';

export async function fetchUserInfos(token: string) {
  try {
    const graphqlEndpoint = 'http://localhost:3001/graphql';
    const query = `
    {user{id username email gender userMeasurements{height weight measurementUnit bmi waist hips whr} userGoals{id personalGoal startDate endDate} favoriteExercises{exerciseId} favoriteRecipes{recipeId}}}
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
    console.log(response.data.data.user)
    return response.data.data.user;
  } catch (error) {
    throw error;
  }
}
