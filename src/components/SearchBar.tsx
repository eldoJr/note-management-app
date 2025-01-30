import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext'; // Adjust the import path as needed
import styles from './SearchBar.module.css'; // Import CSS Module

type SearchBarProps = {
  onSearch: (query: string) => void; // Function to handle search
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { theme } = useTheme(); // Get the current theme
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Trigger search as the user types
  };

  return (
    <div className={`${styles.searchBar} ${theme === 'dark' ? styles.dark : ''}`}>
      <input
        type="text"
        placeholder="Search notes..."
        value={query}
        onChange={handleInputChange}
        className={styles.input}
      />
    </div>
  );
};

export default SearchBar;