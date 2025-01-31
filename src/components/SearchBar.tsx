import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import styles from './SearchBar.module.css'; 

type SearchBarProps = {
  onSearch: (query: string) => void; 
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); 
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