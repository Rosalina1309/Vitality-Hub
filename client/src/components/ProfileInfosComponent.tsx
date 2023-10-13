import React, { useEffect, useState } from 'react';
import { fetchUserInfos } from '../apiServices/fetchUserInfos';
import { User } from '../interfaces/User';
import styles from '../styles/userProfile.module.css';
import Link from 'next/link';

const ProfileInfosComponent: React.FC = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await fetchUserInfos(token);
          setUser(userData);
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
