'use client';
import QuotesComponent from './QuotesComponent';
import ChatBot from './ChatBot';
import styles from '@/styles/home.module.css';

export default function MainPage() {
  return (
    <>
      <section className={styles.hero}>
        <h1>Welcome to Vitality Hub</h1>
        <p>
          Unlock Your Vitality, Transform Your Life: Where Numbers Meet
          Wellness.
        </p>
        <p>Your BMI, Your Rhythm, Your Journey</p>
        <p>Nourishing Body and Soul</p>
      </section>
      <QuotesComponent />
      <ChatBot />
    </div>
  );
}
