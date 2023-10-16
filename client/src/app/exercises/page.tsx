import React from 'react';
import ExercisesComponent from '@/components/ExercisesComponent';
import BurnedCaloriesComponent from '@/components/BurnedCaloriesComponent';
import CalendarComponent from '@/components/CalenderComponent';

const ExercisesPage = () => {
  return (
    <>
      <div>
      <div>
          <BurnedCaloriesComponent />
        </div>
        <div>
          <CalendarComponent  />
        </div>
         <div>
          <ExercisesComponent />
        </div>

       
      </div>
    </>
  );
};

export default ExercisesPage;
