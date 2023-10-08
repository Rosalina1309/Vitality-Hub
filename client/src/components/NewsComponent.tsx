'use client'
import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard'; 
import { Article } from "../interfaces/Article";
import styles from '../styles/newscontainer.module.css'; 

const NewsContainer: React.FC = () => {
  const [newsData, setNewsData] = useState<Article[]>([]);

  useEffect(() => {
    fetch('https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=f0ec287afe52444f923441aa1b71b9fd')
      .then((response) => response.json())
      .then((data) => setNewsData(data.articles))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className={styles.container}>
      {newsData.map((article, index) => (
        <NewsCard key={index} article={article} index={index} />
      ))}
    </div>
  );
};

export default NewsContainer;
