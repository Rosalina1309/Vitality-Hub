'use client';

import QuotesComponent from './QuotesComponent';
import styles from '../styles/mainpage.module.css';
import ChatBot from './ChatBot';

export default function MainPage() {
  return (
    <div>
      <QuotesComponent />
      <ChatBot />
    </div>
  );
}
