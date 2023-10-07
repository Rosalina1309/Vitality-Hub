import React, { useEffect, useState } from "react";
import { fetchHealthNews } from "@/apiMiddleware/newsApi";
import { Article } from "@/interfaces/Article";
import styles from './healthNewsList.module.css';

const HealthNewsList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchHealthNews();
        setArticles(response.data.articles);
      } catch (err) {
        console.error('Error fetching news', err);
        setError('Error fetching news. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
      {articles.map((article, index) => (
        // Conditionally render articles with images only
        article.urlToImage && (
          <div className={styles.article} key={index}>
            {article.urlToImage && <img src={article.urlToImage} alt="Article" />}
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <p>Published at: {article.publishedAt}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        )
      ))}
    </div>
  );
};

export default HealthNewsList;
