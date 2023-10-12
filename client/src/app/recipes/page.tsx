import React from 'react';
import Recipes from '@/components/RecipesComponent';
import styles from '@/styles/recipes-page.module.css';


const RecipesPage = () => {
  return (
    <>
      <div>
        <div className={styles.left}>
          <Recipes />
        </div>
      </div>
    </>
  );
};

export default RecipesPage;
