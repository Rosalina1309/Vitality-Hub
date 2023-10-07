'use client';
import ChatBot from './ChatBot';
import HealthNewsList from './HealthNewsList';

export default function MainPage() {
  return (
    <>
      <div>
        <h1>News</h1>
        <HealthNewsList />
      </div>
      <ChatBot />
    </>
  );
}
