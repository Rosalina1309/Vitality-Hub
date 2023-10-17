import React, { useState, useEffect } from 'react';
import { fetchRecipes } from '@/apiServices/fetchRecipes';
import { Recipe } from '@/interfaces/Recipe';
import styles from '../styles/recipesComponent.module.css';
import { toggleFavoriteRecipe } from '@/apiServices/toggleFavoriteRecipe';
import { useAppSelector } from '@/hooks/hooks';

const RecipesComponent: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<string[]>(
    typeof window !== 'undefined'
      ? localStorage.getItem('favorites')
        ? JSON.parse(localStorage.getItem('favorites')!)
        : []
      :
      []
  );

  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

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

  const toggleFavorite = async (recipeId: string) => {
    if (isAuthenticated) {
      try {
        const updatedFavorites = await toggleFavoriteRecipe(recipeId);
        setFavorites(updatedFavorites);
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    }
  };

  return (
    <div className={styles.recipesContainer}>
      <h1>Recipes</h1>
      {recipes &&
        recipes.map(recipe => (
          <div className={styles.recipeBox} key={recipe.id}>
            <div className={styles.imgContainer}>
              <img
                src={recipe.image}
                alt={recipe.title}
                className={styles.recipeImage}
              />
              <span>Calories: {recipe.calories}</span>
            </div>
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
