'use client'
import React from "react";
import styles from '../styles/bmiCalComponent.module.css'
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setHeight, setWeight, calculateBmi } from '@/slices/bmiSlice';

const MeasurementsCalComponent: React.FC = () => {
  const height = useAppSelector(state => state.bmi.height);
  const weight = useAppSelector(state => state.bmi.weight);
  const bmi = useAppSelector(state => state.bmi.bmi);
  const errMessage = useAppSelector(state => state.bmi.errMessage);
  const advice = useAppSelector(state => state.bmi.advice);

  const dispatch = useAppDispatch();


  function bmiCalculator() {
    dispatch(calculateBmi());
  }

  return (
    <div className={styles.BMICalculator}>
      <h2>BMI Calculator</h2>
      <div className={styles['item-form']}>
        <label htmlFor='height'>Height (in cm):</label>
        <input
          id='height'
          type='text'
          value={height}
          onChange={e => dispatch(setHeight(e.target.value))}
        />
      </div>
      <div className={styles['item-form']}>
        <label htmlFor='weight'>Weight (in kg):</label>
        <input
          id='weight'
          type='text'
          value={weight}
          onChange={e => dispatch(setWeight(e.target.value))}
        />
      </div>
      <button id='calculateBMI' onClick={bmiCalculator}>Calculate BMI</button>
      {errMessage && <p className={styles.errMessage}>{errMessage}</p>}
      {bmi !== null && !errMessage && (
        <p>
          Your BMI: {bmi.toFixed(2)} - {advice && <span>{advice}</span>}
        </p>
      )}
    </div>
  );
};

export default MeasurementsCalComponent;
