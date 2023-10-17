import React from 'react';
import WHRCalculator from './WHRCalComponent';
import BMICalculator from './BMICalComponent';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setShowBMI, setShowWHR } from '@/slices/calculatorsSlice';
import styles from '@/styles/calculators.module.css';

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
    <div className={styles.calculators}>
      <ul className={styles.tabs}>
        <li>
          <button
            id='BMIButton'
            onClick={handleShowBMI}
            className={`${showBMI ? styles.active : ''}`}>
            BMI Calculator
          </button>
        </li>
        <li>
          <button
            id='WHRButton'
            onClick={handleShowWHR}
            className={`${showWHR ? styles.active : ''}`}>
            WHR Calculator
          </button>
        </li>
      </ul>
      <div>
        {showBMI && <BMICalculator />}
        {showWHR && <WHRCalculator />}
      </div>
    </div>
  );
};

export default CalculatorsComponent;
