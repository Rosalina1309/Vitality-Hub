'use client'
import React from "react";
import styles from '../styles/bmiCalComponent.module.css'
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setHeight, setWeight, calculateBmi } from '@/slices/BmiCalcSlice';

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
      <div>
        <label>Height (in cm):</label>
        <input
          type="text"
          value={height}
          onChange={(e) => dispatch(setHeight(e.target.value))}
        />
      </div>
      <div>
        <label>Weight (in kg):</label>
        <input
          type="text"
          value={weight}
          onChange={(e) => dispatch(setWeight(e.target.value))}
        />
      </div>
      <button onClick={bmiCalculator}>Calculate BMI</button>
      {errMessage && <p style={{ color: "red" }}>{errMessage}</p>}
      {bmi !== null && !errMessage && (
        <p>
          Your BMI: {bmi.toFixed(2)} - {advice && <span>{advice}</span>}
        </p>
      )}
    </div>
  );
};

export default MeasurementsCalComponent;
