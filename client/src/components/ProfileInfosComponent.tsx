
// 'use client'

// import React, { useEffect, useState } from 'react';
// import { fetchUserInfos } from '../apiServices/fetchUserInfos';
// import { User } from '../interfaces/User';
// import styles from '../styles/userProfile.module.css';

// const ProfileInfosComponent: React.FC = () => {
//   const [user, setUser] = useState<User>();
//   const [latestWHR, setLatestWHR] = useState<number | null>(null);
//   const [latestBMI, setLatestBMI] = useState<number | null>(null);
//   const [latestHeight, setLatestHeight] = useState<number | null>(null);
//   const [latestWeight, setLatestWeight] = useState<number | null>(null);
//   const [latestWaist, setLatestWaist] = useState<number | null>(null);
//   const [latestHip, setLatestHip] = useState<number | null>(null);


//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const token = localStorage.getItem('token');
//   //       if (token) {
//   //         const userData = await fetchUserInfos(token);
//   //         setUser(userData);
//   //         console.log(userData);
//   //         const measurementsData = userData.userMeasurements;
//   //         console.log('Measurements Data: ', measurementsData);

//   //       } else {
//   //         console.error('Token not found');
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching user data:', error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (token) {
//           const userData = await fetchUserInfos(token);
//           setUser(userData);

//           const measurementsData = userData.userMeasurements;
//           for (let i = measurementsData.length - 1; i >= 0; i--) {
//             const measurement = measurementsData[i];

//             if (measurement.waist !== null && measurement.hips !== null && latestWHR === null) {
//               setLatestWHR(measurement.waist / measurement.hips);
//             }

//             if (measurement.bmi !== null && latestBMI === null) {
//               setLatestBMI(measurement.bmi);
//             }

//             if (measurement.height !== null && latestHeight === null) {
//               setLatestHeight(measurement.height);
//             }

//             if (measurement.weight !== null && latestWeight === null) {
//               setLatestWeight(measurement.weight);
//             }

//             if (measurement.waist !== null && latestWaist === null) {
//               setLatestWaist(measurement.waist);
//             }

//             if (measurement.hips !== null && latestHip === null) {
//               setLatestHip(measurement.hips);
//             }

//             if (latestWHR !== null && latestBMI !== null && latestHeight !== null && latestWeight !== null && latestWaist !== null && latestHip !== null) {
//               break;
//             }
//           }
//         } else {
//           console.error('Token not found');
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className={styles.userProfile}>
//       {user ? (
//         <>
//           <h1>Welcome, {user.username}!</h1>
//           <div className={styles.userInfo}>
//             <h2>User Informations:</h2>
//             <p>Email: {user.email}</p>
//             <p>Gender: {user.gender}</p>
//             <div className={styles.latestMeasurements}>          
//             {latestHeight !== null && <p>Height: {latestHeight} cm</p>}
//             {latestWeight !== null && <p>Weight: {latestWeight} kg</p>}
//             {latestWaist !== null && <p>Waist: {latestWaist} cm</p>}
//             {latestHip !== null && <p>Hip: {latestHip} cm</p>}
//             {latestWHR !== null && <p>WHR: {latestWHR.toFixed(2)}</p>}
//             {latestBMI !== null && <p>BMI: {latestBMI.toFixed(2)}</p>}
//           </div>
     

//           </div>
//           <div className={styles.favoriteExercises}>
//             <h3>Favorite Exercises</h3>
//             <ul>
//               {user.favoriteExercises &&
//                 user.favoriteExercises.map((favExercise: any) => (
//                   <li key={favExercise.exercise.id}>
//                     <strong>{favExercise.exercise.name}</strong> - {favExercise.exercise.instructions}
//                   </li>
//                 ))}
//             </ul>
//           </div>
//           <div className={styles.favoriteRecipes}>
//             <h3>Favorite Recipes</h3>
//             <ul>
//               {user.favoriteRecipes &&
//                 user.favoriteRecipes.map((favRecipe: any) => (
//                   <li key={favRecipe.recipe.id}>
//                     <img src={favRecipe.recipe.image} alt={favRecipe.recipe.title} className={styles.recipeImage} />
//                     <div>
//                       <p>{favRecipe.recipe.title}</p>
//                       <p>Calories: {favRecipe.recipe.calories}</p>
//                     </div>
//                   </li>
//                 ))}
//             </ul>
//           </div>
          
//         </>
//       ) : (
//         <p>Loading user data...</p>
//       )}
//     </div>
//   );
// };

// export default ProfileInfosComponent;



'use client'

import React, { useEffect, useState } from 'react';
import { fetchUserInfos } from '../apiServices/fetchUserInfos';
import { User } from '../interfaces/User';
import { Measurements } from '@/interfaces/Measurements';
import styles from '../styles/userProfile.module.css';

const ProfileInfosComponent: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [latestMeasurements, setLatestMeasurements] = useState<Measurements | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await fetchUserInfos(token);
          setUser(userData);

          const measurementsData = userData.userMeasurements;
          console.log(measurementsData)

          let latestMeasurement: Measurements = {
            waist: '',
            hips: '',
            bmi: '',
            height: '',
            weight: '',
            whr: '',
          };

          for (let i = measurementsData.length - 1; i >= 0; i--) {
            const measurement = measurementsData[i];

            if (measurement.waist !== null && measurement.waist !== undefined) {
              latestMeasurement.waist = measurement.waist.toString();
            }

            if (measurement.hips !== null && measurement.hips !== undefined) {
              latestMeasurement.hips = measurement.hips.toString();
            }

            if (measurement.bmi !== null && measurement.bmi !== undefined) {
              latestMeasurement.bmi = measurement.bmi.toString();
            }

            if (measurement.height !== null && measurement.height !== undefined) {
              latestMeasurement.height = measurement.height.toString();
            }

            if (measurement.weight !== null && measurement.weight !== undefined) {
              latestMeasurement.weight = measurement.weight.toString();
            }

            if (measurement.whr !== null && measurement.whr !== undefined) {
              latestMeasurement.whr = measurement.whr.toString();
            }

            // Break the loop if all properties are set in latestMeasurement
            if (
              latestMeasurement.waist !== '' &&
              latestMeasurement.hips !== '' &&
              latestMeasurement.bmi !== '' &&
              latestMeasurement.height !== '' &&
              latestMeasurement.weight !== '' &&
              latestMeasurement.whr !== ''
            ) {
              break;
            }
          }

          setLatestMeasurements(latestMeasurement);
        } else {
          console.error('Token not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
        <><div className={styles.userProfile}>
      {user ? (
        <>
          <h1>Welcome, {user.username}!</h1>
          <div className={styles.userInfo}>
            <h2>User Informations:</h2>
            <p>Email: {user.email}</p>
            <p>Gender: {user.gender}</p>
            {latestMeasurements ? (
              <div>
                <p>Waist: {latestMeasurements.waist} cm</p>
                <p>Hips: {latestMeasurements.hips} cm</p>
                <p>WHR: {latestMeasurements.whr}</p>
                <p>Height: {latestMeasurements.height} cm</p>
                <p>Weight: {latestMeasurements.weight} kg</p>
                <p>BMI: {latestMeasurements.bmi}</p>

              </div>
            ) : (
              <p>No valid measurements found.</p>
            )}


          </div>
          <div className={styles.favoriteExercises}>
            <h3>Favorite Exercises</h3>
            <ul>
              {user.favoriteExercises &&
                user.favoriteExercises.map((favExercise: any) => (
                  <li key={favExercise.exercise.id}>
                    <strong>{favExercise.exercise.name}</strong> - {favExercise.exercise.instructions}
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.favoriteRecipes}>
            <h3>Favorite Recipes</h3>
            <ul>
              {user.favoriteRecipes &&
                user.favoriteRecipes.map((favRecipe: any) => (
                  <li key={favRecipe.recipe.id}>
                    <img src={favRecipe.recipe.image} alt={favRecipe.recipe.title} className={styles.recipeImage} />
                    <div>
                      <p>{favRecipe.recipe.title}</p>
                      <p>Calories: {favRecipe.recipe.calories}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div><div>

      </div></>
  );
};

export default ProfileInfosComponent;
