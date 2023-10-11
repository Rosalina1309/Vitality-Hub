'use client';

import QuotesComponent from './QuotesComponent';
import styles from '@/styles/mainPage.module.css';
import ChatBot from './ChatBot';
import PersonalLog from './PersonalLog';
import TodaysExercisesMeals from './TodaysExercisesMeals';

export default function MainPage() {
  return (
    <>
      <TodaysExercisesMeals />
      <PersonalLog />
      {/* <QuotesComponent />
      <ChatBot /> */}
    </>
  );
}
