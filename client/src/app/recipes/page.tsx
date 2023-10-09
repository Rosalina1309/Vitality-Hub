import React from 'react';
import Recipes from '@/components/RecipesComponent';
import styles from '@/styles/recipes-page.module.css';
import CaloriesChartComponent from '@/components/CaloriesChartComponent';

const RecipesPage = () => {
  return (
    <main className={styles.main}>
      <CaloriesChartComponent />
      <Recipes />
    </main>
  );
};

export default RecipesPage;
