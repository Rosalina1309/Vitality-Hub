import React, { useEffect, useState } from 'react';
import styles from '../styles/whrCalComponent.module.css';
import getAdviceForWHR from '@/helpers/getAdviceForWHR';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { calculateWhr, setGender, setHip, setSuccess, setWaist } from '@/slices/whrSlice';
import { addWHRToProfile } from '../apiServices/setWHRMeasurements';
import Link from 'next/link';

const MeasurementsCalComponent: React.FC = () => {
  const gender = useAppSelector(state => state.whr.gender);
  const waist = useAppSelector(state => state.whr.waist);
  const hip = useAppSelector(state => state.whr.hip);
  const whr = useAppSelector(state => state.whr.whr);
  const errMessage = useAppSelector(state => state.whr.errMessage);
  const success = useAppSelector(state => state.whr.success);

  const [token, setToken] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  function whrCalculator() {
    dispatch(calculateWhr());
  }

  function handleGenderChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setGender(e.currentTarget.value));
  }

  async function addToProfileHandler() {
    try {
      // const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token not found.');
        return;
      }

      const response = await addWHRToProfile(waist, hip, whr, token);
      dispatch(setSuccess(true));
      setTimeout(() => {
        dispatch(setSuccess(false));
      }, 2000);
      console.log('Record added successfully!', response);
    } catch (error) {
      console.error('Error adding record:', error);
    }
  }

  return (
    <>
      <div className={styles.WHRCalculator}>
        <h2>Waist-Hip Ratio Calculator</h2>
        <label htmlFor='gender'>Gender:</label>
        <div className={styles['item-select']}>
          <select id='gender' value={gender} onChange={handleGenderChange}>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
        </div>
        <div className={styles['item-form']}>
          <label htmlFor='waist'>Waist Circumference (in cm):</label>
          <input
            id='waist'
            type='text'
            value={waist}
            onChange={e => dispatch(setWaist(e.target.value))}
          />
        </div>
        <div className={styles['item-form']}>
          <label htmlFor='hip'>Hip Circumference (in cm):</label>
          <input
            id='hip'
            type='text'
            value={hip}
            onChange={e => dispatch(setHip(e.target.value))}
          />
        </div>
        <button id='calculateWHR' onClick={whrCalculator}>
          Calculate
        </button>
        {errMessage && (
          <p id='error' className={styles.error}>
            {errMessage}
          </p>
        )}
        {whr !== null && !errMessage && (
          <div className={styles.result}>
            <p>{getAdviceForWHR(gender, whr)}</p>
            {token ? (
              <button onClick={addToProfileHandler}>Add to Profile</button>
            ) : (
              <div className={styles.goToLogin}>
                <p>Log in to add your WHR to your profile</p>
                <Link href='/login'>Login</Link>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={`${styles.success} ${success ? styles.open : ''}`}>
        Your WHR calculation was added successfully to your profile!
      </div>
    </>
  );
};

export default MeasurementsCalComponent;
