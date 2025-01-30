import React from 'react';
import { useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import './App.css';

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'dark-mode' : ''}>
      <Navbar />
      <Home />
    </div>
  );
};

export default App;