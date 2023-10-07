'use client';

import QuotesComponent from './QuotesComponent';
import styles from '@/styles/mainPage.module.css';
import ChatBot from './ChatBot';

export default function MainPage() {
  return (
    <>
      <QuotesComponent />
      <ChatBot />
    </>
  );
}
