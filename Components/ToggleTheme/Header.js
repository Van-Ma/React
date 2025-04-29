import { useState, useEffect } from 'react';
import { updateCSSVariables } from '../utils/Themes'; //get themes from util file 
import '../styles/header.css';

const Header = () => {

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });



  const toggleTheme = () => {
    const current = localStorage.getItem("theme") === "dark" ? "light" : "dark";
    localStorage.setItem("theme", current);
    window.dispatchEvent(new Event("themeChange"));
  };

  // Update theme colors in CSS variables whenever the theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    updateCSSVariables(theme); // Call the update function from ThemeUtils
  }, [theme]);



  return (
    <div className="header-container">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`theme-button ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}
      >
        {/* Conditionally render the icon based on the current theme */}
        {theme === 'light' ? (
          <img className="light-icons" src="icons/sun.png"></img>
        ) : (
          <img className="light-icons" src="icons/moon.png"></img>
        )}
      </button>
    </div>
  );
};

export default Header;
