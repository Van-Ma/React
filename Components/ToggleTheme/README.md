# Theme Switcher Implementation

## Overview

This project demonstrates the implementation of a theme switcher in a React application. The theme allows users to toggle between light and dark modes. The theme preference is stored in `localStorage` so that the selected theme persists across page reloads.
The application dynamically updates CSS variables that control various colors across the user interface, ensuring that the theme is applied consistently throughout the app.

## Features

- **Light and Dark Mode Toggle**: Users can switch between light and dark themes using a toggle button.
- **Persistence**: The user's selected theme is saved in `localStorage`, ensuring the theme persists across page reloads.
- **Dynamic Styling**: CSS variables are updated based on the selected theme, affecting the styling of elements such as background colors, fonts, footer colors, etc.
- **Responsive Icons**: The theme toggle button uses different icons (a sun for light mode and a moon for dark mode) depending on the current theme.

## How It Works

1. **State Management**:
   - The theme is stored in a `theme` state using React’s `useState` hook. Initially, the theme is set to the value stored in `localStorage`, defaulting to `'light'` if no theme is saved.

2. **Theme Toggle**:
   - A function, `toggleTheme`, is responsible for switching the current theme. When the theme is toggled, it updates the `localStorage` value and dispatches a custom event to notify other components about the theme change.

3. **Effect Hook**:
   - The `useEffect` hook listens for changes to the `theme` state. Whenever the theme changes, the new value is saved to `localStorage` and the `updateCSSVariables` function is called to update the necessary CSS variables for the new theme.

4. **CSS Variables**:
   - The `updateCSSVariables` function updates various CSS variables that control colors such as the background, primary font, secondary colors, and footer color. These CSS variables are applied to the `:root` element, which makes them accessible globally throughout the application’s styles.

5. **Theme Toggle Button**:
   - A button in the header allows users to toggle between light and dark modes. The button icon changes dynamically based on the active theme—sun for light mode and moon for dark mode.

## Files and Components

- **Header Component**: Contains the button that toggles the theme. It displays different icons for light and dark modes and handles the logic for switching themes.
- **Themes Utility**: A utility file defines arrays of color mappings for different themes (light and dark). It also contains functions to update the CSS variables based on the selected theme.
- **CSS Styles**: Defines the CSS variables for the light and dark themes, which are applied globally across the app.
