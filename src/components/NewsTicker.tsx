
import { useState, useEffect } from 'react';

interface NewsTickerProps {
  news: string[];
}

export const NewsTicker = ({ news }: NewsTickerProps) => {
  const [newsItems, setNewsItems] = useState<string[]>(news);

  useEffect(() => {
    // Fetch news from localStorage if available
    const storedNews = localStorage.getItem('newsTickerItems');
    if (storedNews) {
      try {
        const parsedNews = JSON.parse(storedNews);
        if (Array.isArray(parsedNews) && parsedNews.length > 0) {
          setNewsItems(parsedNews);
        }
      } catch (e) {
        console.error("Error parsing news ticker data:", e);
      }
    }
  }, []);

  if (!newsItems.length) return null;

  return (
    <div className="news-ticker">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden">
          <div className="news-ticker-content">
            {newsItems.map((item, index) => (
              <span key={index} className="mx-8">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
