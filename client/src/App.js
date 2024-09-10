import React, { useState, useEffect } from 'react';

// Debounce utility function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch search results
  const fetchResults = async (query) => {
    if (!query) return setResults([]);

    setLoading(true);
    const response = await fetch(`http://localhost:5000/search?q=${query}`);
    const data = await response.json();
    setResults(data);
    setLoading(false);
  };

  // Debounce the API call for 500ms
  const debouncedFetchResults = debounce(fetchResults, 500);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetchResults(value);
  };

  return (
    <div className="App">
      <h1>Search Items</h1>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      {loading && <p>Loading...</p>}
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
