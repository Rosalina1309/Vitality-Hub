import React from 'react';
import ExercisesComponent from '@/components/ExercisesComponent';
import BurnedCaloriesComponent from '@/components/BurnedCaloriesComponent';

const ExercisesPage = () => {
  return (
    <>
      <div>
      <div>
          <BurnedCaloriesComponent />
        </div>
         <div>
          <ExercisesComponent />
        </div>
       
      </div>
    </>
  );
};

export default ExercisesPage;
