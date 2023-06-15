import React, { useState } from 'react';
import './tailwind.css';

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

  const mystyle = {
    color: "white",
    backgroundImage: `url('https://images.pexels.com/photos/1982483/pexels-photo-1982483.jpeg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    padding: '10vw'
  };

  return (
    <section
    style={mystyle}
    className='text-black'>
      
    <div  className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h1 className='text-4xl p-3 font-bold text-black'>Shorten your URL</h1>
      <form onSubmit={handleSubmit}>
        <input
        className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          type="text"
          value={originalURL}
          onChange={(e) => setOriginalURL(e.target.value)}
          placeholder="Enter URL"
          required
        />
        <button 
          className={
            !isLoading ? 
            "mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :
            "mt-4 px-4 py-2 bg-gray-500 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
          type="submit" 
        disabled={isLoading}>
          {isLoading ? 'Shortening...' : 'Shorten'}
        </button>
      </form>
      {error && 
      <p
      className="mt-4 text-red-500 text-black"
      >{error}</p>}
      {shortenedURL && (
        <p className="mt-4 text-black">
          Shortened URL: <a 
          className="text-blue-500" 
          href={shortenedURL} 
          target='_blank' 
          rel="noreferrer">{shortenedURL}</a>
        </p>
      )}
    </div>
    </section>
  );
};

export default App;
