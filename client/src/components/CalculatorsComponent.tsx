'use client'

import React, {useState} from 'react';

import WHRCalculator from "./WHRCalComponent";
import BMICalculator from "./BMICalComponent";

const CalculatorsComponent : React.FC = () => {
  const [showBMI, setShowBMI] = useState<boolean>(false);
  const [showWHR, setShowWHR] = useState<boolean>(false);
  return (
    <div>
      <div>
        <button onClick={() => {
          setShowWHR(true)
          setShowBMI(false)}}
          >WHR Calculator</button>
        <button onClick={() => {  
          setShowBMI(true)
          setShowWHR(false)}}
          >BMI Calculator</button>
      </div>
      
      {showWHR && <WHRCalculator />}
      {showBMI && <BMICalculator />}
    </div>
  )
}

export default CalculatorsComponent;