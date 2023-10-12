import { Quote } from '@/interfaces/Quotes';
import { useEffect } from 'react';
import styles from '@/styles/quotesComponent.module.css';
import { setQuote } from '@/slices/quoteSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { mockQuotes } from '@/mock/quotes.mock';

const quotes: Quote[] = mockQuotes;

const QuotesComponent: React.FC = () => {
  const quote = useAppSelector(state => state.quote.quote);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    dispatch(setQuote(randomQuote));
  }, []);

  return (
    
    <div className={styles.container}>
      {quote && (
        <div className={styles.quote}>
          <blockquote className={styles.blockquote}>"{quote.quote}"</blockquote>
          <p className={styles.author}>- {quote.author} -</p>
        </div>
      )}
    </div>
   
  );
};

export default QuotesComponent;
