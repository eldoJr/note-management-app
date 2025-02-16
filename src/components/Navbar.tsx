import { useTheme } from '../context/ThemeContext'; 
import styles from './Navbar.module.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme(); 

  return (
    <div className={`${styles.navbar} ${theme === 'dark' ? styles.dark : ''}`}>
      <h1 className={styles.logo}>Notes</h1>
      <button onClick={toggleTheme} className={styles.themeButton}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
};

export default Navbar;