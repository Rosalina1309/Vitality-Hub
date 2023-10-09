const axios = require('axios');

export const fetchExercises = async (muscle: string) => {
  try {
    const response = await axios.get('https://api.api-ninjas.com/v1/exercises', {
      params: {
        muscle: muscle,
      },
      headers: {
        'X-Api-Key': 'u1MqE9OcSe2ROpt0Tl+7HQ==domWx22TnqrwssW3', 
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error)
    throw(error)
  }
};