
'use client'
import React, { useState } from "react";
import styles from "../styles/whrCalComponent.module.css";

const MeasurementsCalComponent: React.FC = () => {
  const [gender, setGender] = useState<string>("male");
  const [waist, setWaist] = useState<string>("");
  const [hip, setHip] = useState<string>("");
  const [whr, setWHR] = useState<number | null>(null);
  const [errMessage, setErrMessage] = useState<string | null>("");

  function whrCalculator() {
    const waistValue = parseFloat(waist);
    const hipValue = parseFloat(hip);

    if (!isNaN(waistValue) && !isNaN(hipValue) && waistValue > 0 && hipValue > 0) {
      const calculatedWHR = waistValue / hipValue;
      setWHR(calculatedWHR);
      setErrMessage(null);
    } else {
      setWHR(null);
      setErrMessage("Please enter valid waist and hip values.");
    }
  }

  function getAdviceForWHR(gender: string, whr: number): string {
    if (gender === "male") {
      if (whr < 0.9) {
        return "Your WHR is within the healthy range for males.";
      } else {
        return "Your WHR is higher than the healthy range for males. Consider lifestyle changes.";
      }
    } else {
      if (whr < 0.8) {
        return "Your WHR is within the healthy range for females.";
      } else {
        return "Your WHR is higher than the healthy range for females. Consider lifestyle changes.";
      }
    }
  }

  function handleGenderChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setGender(e.target.value);
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
        <input type="text" value={waist} onChange={(e) => setWaist(e.target.value)} />
      </div>
      <div>
        <label>Hip Circumference (in cm):</label>
        <input type="text" value={hip} onChange={(e) => setHip(e.target.value)} />
      </div>
      <button onClick={whrCalculator}>Calculate WHR</button>
      {errMessage && <p style={{ color: "red" }}>{errMessage}</p>}
      {whr !== null && !errMessage && <p>{getAdviceForWHR(gender, whr)}</p>}
    </div>
  );
};

export default MeasurementsCalComponent;