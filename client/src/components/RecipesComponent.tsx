'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchRecipesAsync } from '@/slices/recipeSlice';
import React, { useEffect } from 'react';
import styles from '../styles/recipesComponent.module.css';

const RecipesComponent: React.FC = () => {
  const recipes = useAppSelector(state => state.recipes.recipes);
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
            <h2>{recipe.title}</h2>
            <img
              src={recipe.image}
              alt={recipe.title}
              className={styles.recipeImage}
            />
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
    </section>
  );
};

export default RecipesComponent;
