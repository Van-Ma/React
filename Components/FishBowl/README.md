# Fishbowl Component

## Overview

This project showcases an interactive fish animation inside a fishbowl using React. The fish follows the user's mouse movements, dynamically rotating and flipping direction based on the cursor's position relative to the center of the fishbowl. The animation creates a realistic and smooth swimming effect, enhancing the user experience with simple but engaging interactivity.

## Features

- **Interactive Fish Movement**: The fish rotates up and down depending on the vertical distance of the cursor from the center of the fishbowl.
- **Automatic Flipping**: When the cursor moves to the left or right side of the fishbowl, the fish flips horizontally to face the cursor naturally.
- **Smooth Transitions**: Fish rotation and flipping animations are smooth, creating a natural swimming behavior.
- **Responsive Design**: The fish responds to mouse movements across the entire window, making the interaction intuitive and seamless.

## How It Works

1. **Mouse Tracking**:
   - A `mousemove` event listener is added to the window to detect the cursor's position at all times.

2. **Calculating Center**:
   - The center of the fishbowl is calculated using the bounding rectangle of the `.fishbowl` element.

3. **Distance and Rotation Calculation**:
   - The vertical distance (`distanceY`) between the mouse and the center of the fishbowl is calculated.
   - This distance is then converted into a rotation angle using trigonometric calculations (`Math.asin`).

4. **Flipping Logic**:
   - If the cursor is on the left side of the fishbowl, the fish flips horizontally using `scaleX(1)`.
   - If the cursor is on the right side, the fish flips the opposite way with `scaleX(-1)`.

5. **Smooth Animation**:
   - The `transform` property is updated with rotation and flipping, combined with a CSS transition for smooth effects.

6. **Cleanup**:
   - The `mousemove` event listener is properly removed when the component unmounts to avoid memory leaks.

## Files and Components

- **Fishbowl Component**: Manages the fish rotation, flipping, and event listeners for mouse movement.
- **SCSS Styles**: The fishbowl and fish are styled using a separate SCSS file to ensure responsive layout and visually appealing animation.
- **Image Asset**: The fish image (`fish.png`) is used to represent the animated fish inside the bowl.

## How to Use

 Move your mouse around the screen and watch the fish swim and rotate based on your cursor position!
