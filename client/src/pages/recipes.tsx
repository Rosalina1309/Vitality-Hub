
import React from 'react';
import Recipes from '../components/RecipesComponent';
import Navbar from '@/components/Navbar';
import styles from '../styles/recipes-page.module.css'
 import CaloriesChartComponent from '@/components/CaloriesChartComponent';

const RecipesPage = () => {
  return (
    <>
      <div >
      <h1>Vitality Hub</h1>
        <Navbar />
      <div className={styles.left}>
        <Recipes />
      </div>
      <div className={styles.right}>
        <CaloriesChartComponent />
      </div>
    </div>
    </>
  )
  
};

export default RecipesPage;
