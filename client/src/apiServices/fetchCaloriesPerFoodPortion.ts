const axios = require('axios');

export const fetchCaloriesPerFoodPortion = async (query: string) => {
  try {
    const response = await axios.get('https://api.api-ninjas.com/v1/nutrition', {
      params: {
        query: query
      },
      headers: {
        'X-Api-Key': 'u1MqE9OcSe2ROpt0Tl+7HQ==domWx22TnqrwssW3', 
      },
    });
    return response.data;
  } catch (error) {
    console.log(error)
    throw(error)
  }
};