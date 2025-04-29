import React, { useState, useEffect } from 'react';
import '../styles/toggle-button.scss';
import { updateCSSVariables } from '../utils/Themes';

const ToggleButton = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  //sync theme
  useEffect(() => {
    localStorage.setItem('theme', theme);
    updateCSSVariables(theme);
  }, [theme]);
  //toggle theme function
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  const isNight = theme === 'dark';

  return (
    <button className="daynight-button-container" onClick={toggleTheme}>
      <div className="daynight-button-background">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`daynight-color daynight-color-${i} ${isNight ? 'night' : 'day'}`} />
        ))}
        <div className={`daynight-button-knob ${isNight ? 'night' : 'day'}`} />
      </div>
    </button>
  );
};

export default ToggleButton;
