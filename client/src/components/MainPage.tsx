'use client'
import Navbar from "./Navbar";
import QuotesComponent from "./QuotesComponent";
import styles from "@/styles/mainPage.module.css";
'use client';
import ChatBot from './ChatBot';

export default function MainPage() {
  return (
    <div className={styles.container}>
      <Navbar />
      <QuotesComponent />
      <ChatBot />
    </div>
  )
}

