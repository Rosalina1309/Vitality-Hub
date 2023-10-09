import React from 'react';
import Recipes from '@/components/RecipesComponent';
import styles from '@/styles/recipes-page.module.css';
import CaloriesChartComponent from '@/components/CaloriesChartComponent';
import CalculatorsComponent from '@/components/CalculatorsComponent';

const RecipesPage = () => {
  return (
    <>
      <div>
        <div className={styles.left}>
          waaa
          <Recipes />
        </div>
        <div className={styles.right}>
          <CaloriesChartComponent />
        </div>
        {/* <div>
          <BMICalComponent />
        </div>
        <div>
          < WHRCalComponent />
        </div> */}
        <CalculatorsComponent />
      </div>
    </>
  );
};

export default RecipesPage;
