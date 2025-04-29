# 🟢 PeaRun Animation Component

PeaRun is a playful React animation component featuring a pea character that can walk, jump, and move across the screen. 
It supports both keyboard and touch (mobile) input. Designed for desktop interaction but includes responsive controls for smaller screens.

---

## 📦 Features

- ⬅️➡️ Move left and right  
- ⬆️⬇️ Move up and down  
- ␣ Jump with the spacebar  
- 🖱️ On-screen touch buttons for mobile  
- 🎞️ Smooth sprite animation for walking and jumping  
- 🖥️ Container resizes to 80% of the screen  
- ❌ Dismissable instructions overlay with video  

---

## 📚 Libraries Used

- `React` – for UI rendering and interactivity
- Procreate for digital art
- `useEffect`, `useState`, `useRef` – React hooks for lifecycle, state, and references
- No external animation libraries used — pure JavaScript + CSS sprite animation

---

## ⚙️ Logic Overview

- **Movement Logic**: Handles keydown and keyup events to update direction and jumping states.
- **Animation Loop**: Uses `setInterval` to cycle through sprite frames every 100ms based on the current action.
- **Boundary Checks**: Prevents movement beyond container edges.
- **Instruction Overlay**: Displays usage video; dismissed on click or after keyboard interaction.

---

## 🎮 Behaviors

| Action              | Trigger                | Result                                |
|---------------------|------------------------|----------------------------------------|
| Move Left/Right     | `ArrowLeft/Right` keys | Changes `x` position, animates walk    |
| Jump                | `Spacebar`             | Changes `jumping` state, uses jump sprites |
| Move Up/Down        | `ArrowUp/Down` keys    | Adjusts `y` position (floating)        |
| Touch Controls      | On-screen buttons      | Simulate same keyboard behaviors       |
| Show Instructions   | Component mount        | Overlay with video shown               |
| Hide Instructions   | First key press / click| Overlay fades out                      |

---
