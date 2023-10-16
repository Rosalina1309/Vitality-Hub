'use client';

import React, { useState, useEffect } from 'react';
import { fetchRecipes } from '@/apiServices/fetchRecipes';
import { Recipe } from '@/interfaces/Recipe';
import styles from '../styles/recipesComponent.module.css';

const RecipesComponent: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<string[]>(
    typeof window !== 'undefined'
      ? localStorage.getItem('favorites')
        ? JSON.parse(localStorage.getItem('favorites')!)
        : []
      : []
  );
  const [token, setToken] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('token') || null : null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchData();
  }, []);
  const rootUrl = process.env.NEXT_PUBLIC_ROOT_URL;
  const toggleFavorite = async (recipeId: string) => {
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
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className={styles.recipesContainer}>
      <h1>Recipes</h1>
      {recipes &&
        recipes.map(recipe => (
          <div className={styles.recipeBox} key={recipe.id}>
            <h2>{recipe.title}</h2>
            <img
              src={recipe.image}
              alt={recipe.title}
              className={styles.recipeImage}
            />
            <p>Calories: {recipe.calories}</p>
            <p>Protein: {recipe.protein}</p>
            <p>Fat: {recipe.fat}</p>
            <p>Carbs: {recipe.carbs}</p>
            <button onClick={() => toggleFavorite(recipe.id)}>
              {favorites.includes(recipe.id)
                ? 'Remove from Favorites'
                : "Today's Favorite"}
            </button>
          </div>
        ))}
    </div>
  );
};

export default RecipesComponent;
