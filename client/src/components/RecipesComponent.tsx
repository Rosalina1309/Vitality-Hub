'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/recipesComponent.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchRecipesAsync } from '@/slices/recipeSlice';

const RecipesComponent: React.FC = () => {
  const recipes = useAppSelector(state => state.recipes.recipes);
  const loadingMessage = useAppSelector(state => state.recipes.loadingMessage);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchRecipesAsync());
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchData();
  }, []);

  const toggleFavorite = async (recipeId: string) => {
    try {
      const response = await fetch('http://localhost:3001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
          }`
        })
      });

      const responseData = await response.json();
      const updatedFavorites = responseData.data.toggleFavorite.user.favoriteRecipes.map((fav: { recipeId: string }) => fav.recipeId);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <section className={styles.recipesContainer}>
      <h1>Recipes</h1>
      {recipes &&
        recipes.map(recipe => (
          <div className={styles.recipeBox} key={recipe.id}>
            <img
              src={recipe.image}
              alt={recipe.title}
              className={styles.recipeImage}
            />
            <h2>{recipe.title}</h2>
            <ul>
              <li>
                <span>Calories: </span>
                {recipe.calories}
              </li>
              <li>
                <span>Protein: </span>
                {recipe.protein}
              </li>
              <li>
                <span>Fat: </span>
                {recipe.fat}
              </li>
              <li>
                <span>Carbs: </span>
                {recipe.carbs}
              </li>
            </ul>
            <button onClick={() => toggleFavorite(recipe.id)}>
              {favorites.includes(recipe.id) ? 'Remove from Favorites' : 'Today\'s Favorite'}
            </button>
          </div>
        ))}
      {loadingMessage && (
        <p className={styles.loading}>{loadingMessage}</p>
      )}
    </section>
  );
};

export default RecipesComponent;
