import React from 'react';
import { useTheme } from '../context/ThemeContext';
import styles from './Footer.module.css'; 

const Footer = () => {
  const { theme } = useTheme(); // Get the current theme

  return (
    <footer className={`${styles.footer} ${theme === 'dark' ? styles.dark : ''}`}>
      <div className={styles.footerContent}>
        <p>© 2023 Note Management App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;