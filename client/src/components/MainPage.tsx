import QuotesComponent from './QuotesComponent';
import CalculatorsComponent from './CalculatorsComponent';
import ChatBot from './ChatBot';
import styles from '@/styles/home.module.css';

export default function MainPage() {
  return (
    <>
      <section className={styles.hero}>
        <h1>
          Welcome to <span>Vitality Hub</span>
        </h1>
        <p>
          Unlock your vitality, transform your life: where numbers meet
          wellness.
        </p>
        <p>Your BMI, your rhythm, your journey</p>
        <p>Nourishing body and soul</p>
      </section>
      <section className={styles.content}>
        <QuotesComponent />
        <CalculatorsComponent />
      </section>
      <ChatBot />
    </>
  );
}
