'use client';

import QuotesComponent from './QuotesComponent';
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
