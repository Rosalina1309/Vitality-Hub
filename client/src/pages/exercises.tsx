import React from 'react';
import ExercisesComponent from '@/components/ExercisesComponent';
import BurnedCaloriesComponent from '@/components/BurnedCaloriesComponent';
import CalendarComponent from '@/components/CalendarComponent';
import styles from '@/styles/exercisePage.module.css';

const ExercisesPage = () => {
  return (
    <main className={styles.main}>
      <BurnedCaloriesComponent />
      <CalendarComponent  />
      <ExercisesComponent />
    </main>
  );
};

export default ExercisesPage;
