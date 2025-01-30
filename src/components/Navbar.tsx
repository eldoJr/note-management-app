import React from 'react';
import { useTheme } from '../context/ThemeContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.navbar}>
      <h1>Notes App</h1>
      <button onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
};

export default Navbar;