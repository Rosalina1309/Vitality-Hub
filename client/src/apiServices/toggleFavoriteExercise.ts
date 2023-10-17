const rootUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const toggleFavoriteExercise = async (exerciseId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${rootUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `mutation ToggleFavoriteExercise {
            toggleFavorite(type: "exercise", itemId: "${exerciseId}") {
              user {
                favoriteExercises {
                  exerciseId
                }
              }
            }
          }`,
      }),
    });

    const responseData = await response.json();
    const updatedFavorites =
      responseData.data.toggleFavorite.user.favoriteExercises.map(
        (fav: { exerciseId: string }) => fav.exerciseId
      );
    localStorage.setItem('favoriteExercises', JSON.stringify(updatedFavorites));
    return updatedFavorites;

    console.log(localStorage);
  } catch (error) {
    console.error('Error toggling favorite:', error);
  }
};
