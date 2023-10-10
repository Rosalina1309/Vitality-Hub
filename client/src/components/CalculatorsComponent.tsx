'use client';
import React from 'react';
import WHRCalculator from './WHRCalComponent';
import BMICalculator from './BMICalComponent';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setShowBMI, setShowWHR} from '@/slices/calculatorsSlice';


const CalculatorsComponent: React.FC = () => {
  const showBMI = useAppSelector(state => state.calculators.showBMI);
  const showWHR = useAppSelector(state => state.calculators.showWHR);

  const dispatch = useAppDispatch();

  function handleShowBMI() {
    dispatch(setShowBMI());
  }

  function handleShowWHR() {
    dispatch(setShowWHR());
  }
  return (
    <div>
      <div>
        <button onClick={handleShowWHR}>WHR Calculator</button>
        <button onClick={handleShowBMI}>BMI Calculator</button>
      </div>

      {showWHR && <WHRCalculator />}
      {showBMI && <BMICalculator />}
    </div>
  );
};

export default CalculatorsComponent;
