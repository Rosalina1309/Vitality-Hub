import React from 'react';
import CaloriesChartComponent from '@/components/CaloriesChartComponent';
import ExercisesComponent from '@/components/ExercisesComponent';
import CalculatorsComponent from '@/components/CalculatorsComponent';
import BurnedCaloriesComponent from '@/components/BurnedCaloriesComponent';
import styles from '@/styles/exercisePage.module.css';

const ExercisesPage = () => {
  return (
    <>
      <main className={styles.main}>
        <CaloriesChartComponent />
        <ExercisesComponent />
        <CalculatorsComponent />
        <BurnedCaloriesComponent />
      </main>
    </>
  );
};

export default ExercisesPage;
