# PB's Cafe

A React-based café ordering application where users can browse a menu, view item details, add items to a cart, and place orders.

## About PB's Cafe

PB's Cafe is a web application designed in Figma and developed using React to deliver a seamless, responsive user experience.
The application features a modular structure supported by a centralized dataset, enabling efficient rendering, dynamic updates, and straightforward scalability.

The project emphasizes optimized performance and a user-centered design, incorporating smooth transitions, animations, and custom styling with Sass.
All images featured in the application were hand-drawn using Procreate and Figma, providing a unique, handcrafted aesthetic.
PB's Cafe serves as a demonstration of applied skills in both development and design, while also exploring advanced tools and techniques for web application development.


## Features

- **🏠 Seamless Navigation**
  - Dynamic page switching between views
  - Anchor-based scrolling to menu sections and order summary

- **🛒 Interactive Cart System**
  - Add/update/remove items with quantity control
  - Confirmation modals prevent accidental deletion
  - Cart icon updates in real-time

- **🖼️ Dynamic Featured Items**
  - Promo image carousel with auto-rotation every 2 seconds
  - Clickable to change the featured item in the center

- **📱 Responsive Design**
  - View switches between desktop and mobile automatically
  - Optimized layout for any screen width


- **⚡ Optimized & Maintainable Design**
  - Central dataset powers all views — no duplication
  - Changes to dataset instantly update the UI
  - Pages aren't re-rendered — visibility toggled via CSS
  - Minimal DOM operations for fast performance
  - Easy to expand with new categories, filters, or promotions

## Tech Stack

- **React** (functional components, hooks like `useState`, `useMemo`)
- **SCSS** for styling
- **JavaScript** 


## Notes

- Menu items are imported from `utils/PbCafeAssets.js`.
- Orders are generated dynamically with a unique order ID (`ORD-{timestamp}`).
- Cart and order state are fully managed client-side 
- Mobile-friendly design with responsive navigation.
