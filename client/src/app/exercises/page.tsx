import React from 'react';
import CaloriesChartComponent from '@/components/CaloriesChartComponent';
import ExercisesComponent from '@/components/ExercisesComponent';
import LoginComponent from '@/components/LoginComponent';

const ExercisesPage = () => {
  return (
    <>
      <div>
        <div >
          <CaloriesChartComponent />
        </div>
         <div>
          <ExercisesComponent />
        </div>
        <LoginComponent />
      </div>
    </>
  );
};

export default ExercisesPage;
