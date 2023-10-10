import { useEffect, useRef } from 'react';
import styles from '@/styles/chatbot.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { toggle, addChatMessage, setInputValue } from '@/slices/chatbotSlice';

export default function ChatBot() {
  const isOpen = useAppSelector(state => state.chatbot.isOpen);
  const chatHistory = useAppSelector(state => state.chatbot.chatHistory);
  const inputValue = useAppSelector(state => state.chatbot.inputValue);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // mock responses for the chatbot
  const responseMessages = [
    `Is there anything else I can help you with?`,
    `Please provide more details about your issue so I can help you better.`,
    `I'm here to help! What seems to be the problem?`,
    `You can find answers to common questions in our FAQ section. Would you like me to check that for you?`,
    `I'm sorry to hear that you're facing an issue. Let's work together to resolve it.`,
    `Great! I can help you with that.`,
    `I'm here to provide support 24/7.`,
  ];

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setInputValue(e.target.value));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = inputValue;

    if (message) {
      dispatch(addChatMessage({sender: 'user', text: message}))
    }
    setTimeout(() => {
      getChatResponse();
    }, 500)
    dispatch(setInputValue(''));
  }

  function toggleChatBot() {
    dispatch(toggle());
  }

  function getChatResponse() {
    // get a random response from the mock
    // to be changed with actual responses
    const random = Math.floor(Math.random() * responseMessages.length);
    dispatch(addChatMessage({ sender: 'bot', text: responseMessages[random] }));
  }

  return (
    <div className={`${styles.chatbot} ${isOpen ? styles.open : ''}`}>
      <button className={styles['icon-help']} onClick={toggleChatBot}></button>
      <div className={styles.container}>
        <h2>Ask a question</h2>
        <div className={styles.chat} ref={chatContainerRef}>
          <div className={`${styles.message} ${styles.received}`}>
            <p className={styles.text}>Hello! How can I assist you today?</p>
          </div>
          {chatHistory.map(message => (
            <div
              className={`${styles.message} ${
                message.sender === 'user' ? styles.sent : styles.received
              }`}>
              <p className={styles.text}>{message.text}</p>
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
