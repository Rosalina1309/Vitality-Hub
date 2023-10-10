'use client'
import QuotesComponent from "./QuotesComponent";
import styles from "../styles/mainpage.module.css";
import NewsComponent from "./NewsComponent"; 
import ChatBot from './ChatBot';

export default function MainPage() {
  return (
    <div className={styles.container}>
      <NewsComponent />
      <QuotesComponent />
      <ChatBot />
    </div>
  );
}
