import React from 'react';
import Recipes from '@/components/RecipesComponent';
import styles from '@/styles/recipes-page.module.css';
import CaloriesChartComponent from '@/components/CaloriesChartComponent';

export default function RecipesPage () {
  return (
    <main className={styles.main}>
      <CaloriesChartComponent />
      <Recipes />
    </main>
  );
};

