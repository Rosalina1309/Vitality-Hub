import React from 'react';
import ExercisesComponent from '@/components/ExercisesComponent';
import BurnedCaloriesComponent from '@/components/BurnedCaloriesComponent';
import styles from '@/styles/exercisePage.module.css';

const ExercisesPage = () => {
  return (
    <>
      <main className={styles.main}>
        <ExercisesComponent />
        <BurnedCaloriesComponent />
      </main>
    </>
  );
};

export default ExercisesPage;
