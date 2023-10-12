'use client'
import React from "react";
import styles from "../styles/whrCalComponent.module.css";
import getAdviceForWHR from "@/helpers/getAdviceForWHR";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { calculateWhr, setGender, setHip, setWaist } from "@/slices/whrSlice";

const MeasurementsCalComponent: React.FC = () => {
  const gender = useAppSelector(state => state.whr.gender);
  const waist = useAppSelector(state => state.whr.waist);
  const hip = useAppSelector(state => state.whr.hip);
  const whr = useAppSelector(state => state.whr.whr);
  const errMessage = useAppSelector(state => state.whr.errMessage);

  const dispatch = useAppDispatch();

  function whrCalculator() {
    dispatch(calculateWhr());
  }

  function handleGenderChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setGender(e.currentTarget.value));
  }

  return (
    <div className={styles.WHRCalculator}>
      <h2>Waist-Hip Ratio Calculator</h2>
      <div>
        <label>Gender:</label>
        <select value={gender} onChange={handleGenderChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label>Waist Circumference (in cm):</label>
        <input type="text" value={waist} onChange={(e) => dispatch(setWaist(e.target.value))} />
      </div>
      <div>
        <label>Hip Circumference (in cm):</label>
        <input type="text" value={hip} onChange={(e) => dispatch(setHip(e.target.value))} />
      </div>
      <button onClick={whrCalculator}>Calculate WHR</button>
      {errMessage && <p style={{ color: "red" }}>{errMessage}</p>}
      {whr !== null && !errMessage && <p>{getAdviceForWHR(gender, whr)}</p>}
    </div>
  );
};

export default MeasurementsCalComponent;
