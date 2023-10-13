
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
          console.log(userData)
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
    <div className={styles.userProfile}>
      {user ? (
        <>
          <h1>Welcome, {user.username}!</h1>
          <div className={styles.userInfo}>
            <h2>User Informations:</h2>
            <p>Email: {user.email}</p>
            <p>Gender: {user.gender}</p>
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
