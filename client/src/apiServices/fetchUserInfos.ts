import axios from 'axios';

const rootUrl = process.env.NEXT_PUBLIC_ROOT_URL;

export async function fetchUserInfos(token: string) {
  try {
    const graphqlEndpoint = `${rootUrl}`;
    const query = `{    user {      id      username      email      birthdate      gender      userMeasurements {     height          weight          bmi          waist          hips          whr          measurementUnit          createdAt         }      userGoals {          personalGoal          startDate          endDate            }      favoriteExercises {        exercise {          id          name          type          muscle          equipment          difficulty          instructions        }      }      favoriteRecipes {        recipe {          id          title          image          calories          protein          fat          carbs        }      }    }  }`
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
    
    return response.data.data.user;
  } catch (error) {
    throw error;
  }
}
