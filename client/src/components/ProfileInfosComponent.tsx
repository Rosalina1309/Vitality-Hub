
'use client'

import React, { useEffect, useState } from 'react';
import { fetchUserInfos } from '../apiServices/fetchUserInfos';
import { User } from '../interfaces/User';
import styles from '../styles/userProfile.module.css';

const ProfileInfosComponent: React.FC = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await fetchUserInfos(token);
          setUser(userData);
          console.log(userData);
          const measurementsData = userData.bmiMeasurements;
          console.log('Measurements Data: ', measurementsData);

        } else {
          console.error('Token not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  
  const latestBMI = user?.bmiMeasurements[user?.bmiMeasurements.length - 1] || null;
  const latestWHR = user?.whrMeasurements[user?.whrMeasurements.length - 1] || null;

  return (
   
    <div className={styles.userProfile}>
      {user ? (
        <>
          <h1>Welcome, {user.username}!</h1>
          <div className={styles.userInfo}>
            <h2>User Informations:</h2>
            <p>Email: {user.email}</p>
            <p>Gender: {user.gender}</p>

            {latestBMI && (
              <div>
                <h3>Latest BMI Measurement</h3>
                <p>Height: {latestBMI.height} cm</p>
                <p>Weight: {latestBMI.weight} kg</p>
                <p>BMI: {latestBMI.bmi}</p>
              </div>
            )}

            {latestWHR && (
              <div>
                <h3>Latest WHR Measurement</h3>
                <p>Waist: {latestWHR.waist} cm</p>
                <p>Hips: {latestWHR.hips} cm</p>
                <p>WHR: {latestWHR.whr}</p>
              </div>
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
    </div>
  );
};

export default ProfileInfosComponent;

