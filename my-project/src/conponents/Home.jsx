import React, { useState, useEffect } from 'react';
import { fetchArticle } from '../Api handling/Api';
import Article from './Article';
import PayoutCalculator from './PayoutCalculator';

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showpop, setShowpop] = useState(false);

  const [query, setQuery] = useState(""); 
  const [author, setAuthor] = useState(""); 
  const [fromDate, setFromDate] = useState(""); 

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const filteredQuery = author ? `${query} ${author}` : query;
        const articles = await fetchArticle(filteredQuery, fromDate);
        setArticles(articles);
      } catch (err) {
        setError("Failed to load articles.");
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [query, author, fromDate]);

  const togglegroup = () => {
    setShowpop(!showpop);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Sports Duniya News</h1>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:underline" onClick={togglegroup}>
                Payout Calculator
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">Signout</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="flex-grow container mx-auto p-6">
        <div className="text-gray-700">
          <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">News Dashboard</h1>

            {/* Search Bar */}
            <div className="flex flex-wrap gap-4 mb-6">
              <input
                type="text"
                placeholder="Search articles"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-2 border rounded w-full md:w-1/3"
              />
              <input
                type="text"
                placeholder="Search by author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="p-2 border rounded w-full md:w-1/3"
              />
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="p-2 border rounded w-full md:w-1/3"
              />
            </div>

            {loading ? (
              <p>Loading articles...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                  <Article key={index} article={article} />
                ))}
              </div>
            ) : (
              <p>No articles found.</p>
            )}
          </div>
        </div>
      </div>

     
      {showpop && <PayoutCalculator articles={articles} closePopup={togglegroup} />}

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 My Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
