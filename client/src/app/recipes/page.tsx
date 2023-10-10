import React from 'react';
import Recipes from '@/components/RecipesComponent';
import styles from '@/styles/recipes-page.module.css';
import CaloriesChartComponent from '@/components/CaloriesChartComponent';
import CalculatorsComponent from '@/components/CalculatorsComponent';
import ExercisesComponent from '@/components/ExercisesComponent';
import NutritionComponent from '@/components/NutritionComponent';

const RecipesPage = () => {
  return (
    <>
      <div>
        <div className={styles.left}>
          <Recipes />
        </div>
        <div className={styles.right}>
          <CaloriesChartComponent />
        </div>
        <CalculatorsComponent />
        <ExercisesComponent />
        <NutritionComponent />
      </div>
    </>
  );
};

export default RecipesPage;
