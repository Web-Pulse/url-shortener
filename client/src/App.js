import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to handle URL submission here
    console.log('Submitted URL:', url);
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter a long URL"
        />
        <button type="submit">Shorten URL</button>
      </form>
    </div>
  );
}

export default App;