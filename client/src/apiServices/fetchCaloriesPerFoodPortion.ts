import axios from 'axios';

export const fetchCaloriesPerFoodPortion = async (query: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_NUTRITION_API_URL as string,
      {
        params: {
          query: query,
        },
        headers: {
          'X-Api-Key': process.env.NEXT_PUBLIC_NUTRITION_API_KEY as string,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error)
    throw(error)
  }
};