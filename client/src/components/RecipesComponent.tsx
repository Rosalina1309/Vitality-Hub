'use client';

import React, { useEffect } from 'react';
import styles from '../styles/recipesComponent.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchRecipesAsync } from '@/slices/recipeSlice';

const RecipesComponent: React.FC = () => {
  const recipes = useAppSelector(state => state.recipes.recipes);
  const loadingMessage = useAppSelector(state => state.recipes.loadingMessage);

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
            <button>Today's Favourite</button>
          </div>
        ))}
      {loadingMessage && (
        <p className={styles.loading}>{loadingMessage}</p>
      )}
    </section>
  );
};

export default RecipesComponent;
