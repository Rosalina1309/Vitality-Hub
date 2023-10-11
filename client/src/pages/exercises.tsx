import React from 'react';
import CaloriesChartComponent from '@/components/CaloriesChartComponent';
import ExercisesComponent from '@/components/ExercisesComponent';
import CalculatorsComponent from '@/components/CalculatorsComponent';

const ExercisesPage = () => {
  return (
    <>
      <div>
        <div>
          <CaloriesChartComponent />
        </div>
        <div>
          <ExercisesComponent />
          <CalculatorsComponent />
        </div>
      </div>
    </>
  );
};

export default ExercisesPage;
