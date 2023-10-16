import React, { useEffect, useState } from 'react';
import { fetchUserInfos } from '../apiServices/fetchUserInfos';
import { User } from '../interfaces/User';
import { Measurements } from '@/interfaces/Measurements';
import styles from '../styles/userProfile.module.css';
import Link from 'next/link';

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
    <section className={styles.userProfile}>
      {user ? (
        <>
          <h1>Welcome, {user.username}!</h1>
          <div className={styles.userData}>
            <div className={styles.userInfo}>
              <h2>Your data:</h2>
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
              {user.favoriteExercises.length ? (
                <ul>
                  {user.favoriteExercises &&
                    user.favoriteExercises.map((favExercise: any) => (
                      <li key={favExercise.exercise.id}>
                        <strong>{favExercise.exercise.name}</strong>{' '}
                        {favExercise.exercise.instructions}
                      </li>
                    ))}
                </ul>
              ) : (
                <p>
                  Looks like you haven't added any favorite exercises yet.
                  <Link href='/exercises'>Add one now!</Link>
                </p>
              )}
            </div>
            <div className={styles.favoriteRecipes}>
              <h3>Favorite Recipes</h3>
              {user.favoriteRecipes.length ? (
                <ul>
                  {user.favoriteRecipes &&
                    user.favoriteRecipes.map((favRecipe: any) => (
                      <li key={favRecipe.recipe.id}>
                        <p className={styles.title}>{favRecipe.recipe.title}</p>
                        <div className={styles.recipeImg}>
                          <img
                            src={favRecipe.recipe.image}
                            alt={favRecipe.recipe.title}
                            className={styles.recipeImage}
                          />
                          <p>Calories: {favRecipe.recipe.calories}</p>
                        </div>
                      </li>
                    ))}
                </ul>
              ) : (
                <p>
                  Looks like you haven't added any favorite recipe yet.
                  <Link href='/recipes'>Add one now!</Link>
                </p>
              )}
            </div>
          </div>

        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </section>
  );
};

export default ProfileInfosComponent;
