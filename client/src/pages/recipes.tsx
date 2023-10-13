import React from 'react';
import Recipes from '@/components/RecipesComponent';
import styles from '@/styles/recipes-page.module.css';
import NutritionComponent from '@/components/NutritionComponent';

export default function RecipesPage () {
  return (
    <main className={styles.main}>
      <Recipes />
      <NutritionComponent />
    </main>
  );
};

