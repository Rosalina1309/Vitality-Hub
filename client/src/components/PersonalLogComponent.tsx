import React, { useEffect, useState } from 'react';
import { fetchUserInfos } from '../apiServices/fetchUserInfos';
import { User } from '../interfaces/User';
import { HealthLog } from '@/interfaces/Loggable';
import styles from '@/styles/personallog.module.css';

const PersonalLogComponent: React.FC = () => {
  const [user, setUser] = useState<User | undefined>();
  const [exercises, setExercises] = useState<HealthLog[]>([]);
  const [recipes, setRecipes] = useState<HealthLog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await fetchUserInfos(token);
          setUser(userData);
          console.log('userData.healthLog:', userData?.healthLogs);
        } else {
          console.error('Token not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user?.healthLogs) {
      const exerciseLogs = user.healthLogs.filter((log) => log.loggable.id && parseInt(log.loggable.id) < 10000);
      const recipeLogs = user.healthLogs.filter((log) => log.loggable.id && parseInt(log.loggable.id) >= 10000);
      setExercises(exerciseLogs);
      setRecipes(recipeLogs);
    }
  }, [user?.healthLogs]);

  return (
    <section className={styles.personalLog}>
      <h2>Personal Log:</h2>
      <div className={styles.exercises}>
        <h3>Exercises:</h3>
        {exercises.map((log) => (
          <div key={log.loggable.id}>{log.loggable.name}</div>
        ))}
      </div>
      <div className={styles.recipes}>
        <h3>Recipes:</h3>
        {recipes.map((log) => (
          <div key={log.loggable.id}>{log.loggable.title}</div>
        ))}
      </div>
    </section>
  );
};

export default PersonalLogComponent;
