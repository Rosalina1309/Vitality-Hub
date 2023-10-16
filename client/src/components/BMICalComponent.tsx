// 'use client'
// import React, { useState } from "react";
// import styles from '../styles/bmiCalComponent.module.css';
// import { addBMIToProfile } from "@/apiServices/setBMIMeasurements";

// const MeasurementsCalComponent: React.FC = () => {
//   const [height, setHeight] = useState<string>("");
//   const [weight, setWeight] = useState<string>("");
//   const [bmi, setBMI] = useState<number | null>(null);
//   const [errMessage, setErrMessage] = useState<string | null>(null);
//   const [advice, setAdvice] = useState<string>("");

  // function bmiCalculator() {
  //   const heightValue = parseFloat(height);
  //   const weightValue = parseFloat(weight);

  //   if (!isNaN(heightValue) && !isNaN(weightValue) && heightValue > 0 && weightValue > 0) {
  //     const heightInMeters = heightValue / 100;
  //     const calculatedBMI = weightValue / (heightInMeters * heightInMeters);
  //     setBMI(calculatedBMI);
  //     setErrMessage(null);


  //     if (calculatedBMI < 16) {
  //       setAdvice("You are severely underweight. Please consult a healthcare professional.");
  //     } else if (calculatedBMI >= 16 && calculatedBMI < 16.9) {
  //       setAdvice("You are significantly underweight. Please consult a healthcare professional.");
  //     } else if (calculatedBMI >= 17 && calculatedBMI < 18.4) {
  //       setAdvice("You are mildly underweight. Consider gaining weight through a balanced diet.");
  //     } else if (calculatedBMI >= 18.5 && calculatedBMI < 24.9) {
  //       setAdvice("Your weight is normal. Maintain a healthy lifestyle for overall well-being.");
  //     } else if (calculatedBMI >= 25 && calculatedBMI < 29.9) {
  //       setAdvice("You are overweight. Focus on a balanced diet and regular exercise.");
  //     } else if (calculatedBMI >= 30 && calculatedBMI < 34.9) {
  //       setAdvice("You are obese (Class 1). Consult a healthcare professional for weight management.");
  //     } else if (calculatedBMI >= 35 && calculatedBMI < 39.9) {
  //       setAdvice("You are obese (Class 2). Urgently consult a healthcare professional for weight management.");
  //     } else {
  //       setAdvice("You are severely obese (Class 3). Immediate medical attention is necessary.");
  //     }
  //   } else {
  //     setBMI(null);
  //     setAdvice("");
  //     setErrMessage("Please enter valid height and weight values.");
  //   }
  // }


//   function addToProfile() {
//     const query = {
//       query: `
//         mutation ($input: CreateRecordMutationInput!) {
//           createRecord(input: $input) {
//             user {
//               id
//             }
//           }
//         }
//       `,
//       variables: {
//         input: {
//           fieldName: "measurements",
//           height: parseFloat(height),
//           weight: parseFloat(weight),
//           bmi: bmi ? parseFloat(bmi.toFixed(2)) : null,
//           measurementUnit: "metric"
//         }
//       }
//     };

//     const token = localStorage.getItem("token");

//     fetch("http://localhost:3001/graphql", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify(query)
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log("Record added successfully!", data);
//       })
//       .catch(error => {
//         console.error("Error adding record:", error);
//       });
//   }
//   return (
//     <div className={styles.BMICalculator}>
//       <h2>BMI Calculator</h2>
//       <div>
//         <label>Height (in cm):</label>
//         <input
//           type="text"
//           value={height}
//           onChange={(e) => setHeight(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Weight (in kg):</label>
//         <input
//           type="text"
//           value={weight}
//           onChange={(e) => setWeight(e.target.value)}
//         />
//       </div>
//       <button onClick={bmiCalculator}>Calculate BMI</button>
//       {errMessage && <p style={{ color: "red" }}>{errMessage}</p>}
//       {bmi !== null && !errMessage && (
//         <p>
//           Your BMI: {bmi.toFixed(2)} - {advice && <span>{advice}</span>}
//         </p>
//       )}
//       <button onClick={addToProfile}>Add to Profile</button>
//     </div>
//   );
// };

// export default MeasurementsCalComponent;

'use client'
import React, { useEffect, useState } from "react";
import styles from '../styles/bmiCalComponent.module.css'
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setHeight, setWeight, calculateBmi } from '@/slices/bmiSlice';
import { addBMIToProfile } from '../apiServices/setBMIMeasurements';

const MeasurementsCalComponent: React.FC = () => {
  const height = useAppSelector(state => state.bmi.height);
  const weight = useAppSelector(state => state.bmi.weight);
  const bmi = useAppSelector(state => state.bmi.bmi);
  const errMessage = useAppSelector(state => state.bmi.errMessage);
  const advice = useAppSelector(state => state.bmi.advice);

  const dispatch = useAppDispatch();


  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {

    const storedToken = localStorage.getItem("token");
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
          console.log("Record added successfully!", data);
        })
        .catch(error => {
          console.error("Error adding record:", error);
        });
    } else {
      console.error("Token is not available.");
    }
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
      <button onClick={addToProfileHandler}>Add to Profile</button>
    </div>
  );
};

export default MeasurementsCalComponent;
