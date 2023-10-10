import React, { useState } from 'react';
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleUrlChange = (event) => {
    setLongUrl(event.target.value);
    setError('');  // Clear any previous error message when the URL changes
  };

  const isValidUrl = (url) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // Protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
      '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // Fragment locator
    return urlPattern.test(url);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!isValidUrl(longUrl)) {
      setError('Please enter a valid URL.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      });

      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter a long URL"
          value={longUrl}
          onChange={handleUrlChange}
        />
        <button type="submit">Shorten URL</button>
      </form>
      {error && <div className="error">{error}</div>}
      {shortUrl && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;