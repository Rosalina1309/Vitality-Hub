import React, { useEffect, useState } from 'react';
import styles from '../styles/bmiCalComponent.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setHeight, setWeight, calculateBmi, setSuccess } from '@/slices/bmiSlice';
import { addBMIToProfile } from '../apiServices/setBMIMeasurements';
import Link from 'next/link';

const MeasurementsCalComponent: React.FC = () => {
  const height = useAppSelector(state => state.bmi.height);
  const weight = useAppSelector(state => state.bmi.weight);
  const bmi = useAppSelector(state => state.bmi.bmi);
  const errMessage = useAppSelector(state => state.bmi.errMessage);
  const advice = useAppSelector(state => state.bmi.advice);
  const success = useAppSelector(state => state.bmi.success);

  const dispatch = useAppDispatch();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  function bmiCalculator() {
    dispatch(calculateBmi());
  }

  function addToProfileHandler() {
    if (token) {
      addBMIToProfile(height, weight, bmi, token)
        .then(data => {
          dispatch(setSuccess(true));
          setTimeout(() => {
            dispatch(setSuccess(false));
          }, 2000);
          console.log('Record added successfully!', data);
        })
        .catch(error => {
          console.error('Error adding record:', error);
        });
    } else {
      console.error('Token is not available.');
    }
  }

  return (
    <>
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
        <button id='calculateBMI' onClick={bmiCalculator}>
          Calculate
        </button>
        {errMessage && <p className={styles.errMessage}>{errMessage}</p>}
        {bmi !== null && !errMessage && (
          <div className={styles.result}>
            <p>
              Your BMI: {bmi.toFixed(2)} - {advice && <span>{advice}</span>}
            </p>
            {token ? (
              <button onClick={addToProfileHandler}>Add to Profile</button>
            ) : (
              <div className={styles.goToLogin}>
                <p>Log in to add your BMI to your profile</p>
                <Link href='/login'>Login</Link>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={`${styles.success} ${ success ? styles.open : ''}`} >
        Your BMI calculation was added successfully to your profile!
      </div>
    </>
  );
};

export default MeasurementsCalComponent;
