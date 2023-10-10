import { Quote } from "../interfaces/Quotes"
import { useEffect, useState } from "react"
import styles from "../styles/quotesComponent.module.css"; 

const quotes: Quote[] = [
  {
    id:'1',
    quote: 'Keep your face always toward the sunshine—and shadows will fall behind you.',
    author: 'Walt Whitman'
  },
  {
    id:'2',
    quote: 'Extraordinary things are always hiding in places people never think to look.',
    author: 'Jodi Picoul'
  },
  {
    id:'3',
    quote: 'Setting goals is the first step in turning the invisible into the visible.',
    author: 'Tony Robbins'
  },
  {
    id:'4',
    quote: 'You can have it all. Just not all at once.',
    author: 'Oprah Winfrey'
  },
  {
    id:'5',
    quote: 'Say something positive, and you’ll see something positive.',
    author: 'Jim Thompson'
  },
  {
    id:'6',
    quote: 'All you need is the plan, the road map, and the courage to press on to your destination.',
    author: 'Earl Nightingale'
  },
  {
    id:'7',
    quote: 'Only in the darkness can you see the stars.',
    author: 'Martin Luther King, Jr.'
  },
  {
    id:'8',
    quote: 'A goal is not always meant to be reached, it often serves simply as something to aim at.',
    author: 'Bruce Lee'
  },
  {
    id:'9',
    quote: 'In a gentle way, you can shake the world.',
    author: 'Mahatma Gandhi'
  },
  {
    id:'10',
    quote: 'Happiness is a butterfly, which when pursued, is always just beyond your grasp, but which, if you will sit down quietly, may alight upon you.',
    author: 'Nathaniel Hawthorne'
  }
]

 const QuotesComponent: React.FC= () => {
  const [quote, setQuote] = useState<Quote>();

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
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
  )
};

export default QuotesComponent;