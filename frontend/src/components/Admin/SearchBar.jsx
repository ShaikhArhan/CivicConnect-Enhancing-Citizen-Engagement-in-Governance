import React, { useState } from 'react';
import './css/SearchBar.css'; // Import the external CSS
import axios from 'axios';

export const SearchBar = ({data}) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async() => {
    try{
    const getSearch = await axios.get(`http://localhost:3001/admin/search-admin/${query}`)  
    data(getSearch.data.data)
    } catch (error) {
      console.warn(error)
    }      
  };

  return (
    <div className="search-bar-wrapper">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        <div className="search-icon">🔍</div>        
      </button>
    </div>
  );
};