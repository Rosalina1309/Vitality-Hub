'use client';
import MainPage from '@/components/MainPage';
import styles from '@/styles/home.module.css';

const HomePage: React.FC = () => {
  return (
    <>
      <div className={styles.motto}>
        <p>
          Unlock Your Vitality, Transform Your Life: Where Numbers Meet
          Wellness.{' '}
        </p>
        <p>Your BMI, Your Rhythm, Your Journey</p>
        <p>Nourishing Body and Soul</p>
        <h3>Welcome to Vitality Hub</h3>
      </div>
      <main className={styles.main}>
        <MainPage />
      </main>
    </>
  );
};

export default HomePage;