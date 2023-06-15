import React, { useState } from 'react';
import './App.css';

function App() {

// const myHeaders = new Headers();
// myHeaders.append("apikey", "clDr150cyYmnpMrxrAIiW6Dy42lnwKgf");
const apikey = '3cbf2543c448b24f157e8afb34125124'
  
const [originalURL, setOriginalURL] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // const requestOptions = {
    // method: 'GET',
    // redirect: 'follow',
    // headers: myHeaders
    // };

    try {
      const response = await fetch(`https://www.shareaholic.com/v2/share/shorten_link?apikey=${apikey}&url=${originalURL}&service[name]=shrlc`);

      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to shorten URL');
      }

      const data = await response.json();
      setShortenedURL(data.data);
      console.log(data);
    } catch (error) {
      setError('Failed to shorten URL');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={originalURL}
          onChange={(e) => setOriginalURL(e.target.value)}
          placeholder="Enter URL"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Shortening...' : 'Shorten'}
        </button>
      </form>
      {error && <p>{error}</p>}
      {shortenedURL && (
        <p>
          Shortened URL: <a href={shortenedURL} target='_blank' rel="noreferrer">{shortenedURL}</a>
        </p>
      )}
    </div>
  );
};

export default App;
