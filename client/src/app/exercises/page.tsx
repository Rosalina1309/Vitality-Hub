import React from 'react';
import CaloriesChartComponent from '@/components/CaloriesChartComponent';
import ExercisesComponent from '@/components/ExercisesComponent';

const ExercisesPage = () => {
  return (
    <>
      <div>
        <div>
          <CaloriesChartComponent />
        </div>
        <div>
          <ExercisesComponent />
        </div>
      </div>
    </>
  );
};

export default ExercisesPage;
