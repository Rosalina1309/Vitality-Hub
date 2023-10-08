'use client'; 
import { NewsCard } from "../interfaces/NewsCard";
import styles from '../styles/newscard.module.css';

const NewsCard: React.FC<NewsCard> = ({ article, index }) => {
  return (
    <div className={styles.newscard}>
      <img src={article.urlToImage} alt={article.title} className={styles.image} />
      <h2 className={styles.title}>{article.title}</h2>
      <p className={styles.description}>{article.description}</p>
      <a className={styles.link} href={article.url} target="_blank" rel="noopener noreferrer">
      Read More
      </a>
  </div>
  );
};

export default NewsCard;