import React, { useState, useEffect } from 'react';
import { fetchRecipes } from '@/apiServices/fetchRecipes';
import { Recipe } from '@/interfaces/Recipe';
import styles from '../styles/recipesComponent.module.css';
import { toggleFavoriteRecipe } from '@/apiServices/toggleFavoriteRecipe';

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
    try {
      const updatedFavorites = await toggleFavoriteRecipe(recipeId);
      setFavorites(updatedFavorites);
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
