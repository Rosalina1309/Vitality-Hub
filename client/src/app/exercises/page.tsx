import React from 'react';
import ExercisesComponent from '@/components/ExercisesComponent';
import BurnedCaloriesComponent from '@/components/BurnedCaloriesComponent';

const ExercisesPage = () => {
  return (
    <>
      <div>
         <div>
          <ExercisesComponent />
        </div>
        <div>
          <BurnedCaloriesComponent />
        </div>
      </div>
    </>
  );
};

export default ExercisesPage;
