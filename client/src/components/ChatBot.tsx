'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './chatbot.module.css';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = inputValue;

    if (message) {
      setChatHistory(prevChatHistory => {
        return [...prevChatHistory, message];
      });
    }


    setInputValue('');
  }
  function toggleChatBot() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={`${styles.chatbot} ${isOpen ? styles.open : ''}`}>
      <button className={styles['icon-help']} onClick={toggleChatBot}></button>
      <div className={styles.container}>
        <h2>Ask a question</h2>
        <div className={styles.chat} ref={chatContainerRef}>
          <div className={`${styles.message} ${styles.received}`}>
            <p className={styles.text}>How can i help you?</p>
          </div>
          {chatHistory.map(message => (
            <div className={`${styles.message} ${styles.sent}`}>
              <p className={styles.text}>{message}</p>
            </div>
          ))}
        </div>
        <form className={styles.form} onSubmit={e => handleSubmit(e)}>
          <input
            type='text'
            placeholder='Type something...'
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type='submit' className={styles['icon-send']}></button>
        </form>
      </div>
    </div>
  );
}
