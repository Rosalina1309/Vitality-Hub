const rootUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const toggleFavoriteRecipe = async (recipeId: string) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${rootUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `mutation ToggleFavoriteRecipe {
            toggleFavorite(type: "recipe", itemId: "${recipeId}") {
              user {
                favoriteRecipes {
                  recipeId
                }
              }
            }
          }`,
      }),
    });

    const responseData = await response.json();
    const updatedFavorites =
      responseData.data.toggleFavorite.user.favoriteRecipes.map(
        (fav: { recipeId: string }) => fav.recipeId
      );
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    return updatedFavorites;
  } catch (error) {
    console.error('Error toggling favorite:', error);
  }
};
