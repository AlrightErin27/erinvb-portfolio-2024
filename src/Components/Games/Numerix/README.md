# Numerix - A React.js Implementation of 2048

[Numerix](http://www.erinvanbrunt.com/games/numerix) is a React-based adaptation of the classic 2048 game, offering a sleek and intuitive interface with modern aesthetics. This project is part of my portfolio, accessible at [erinvanbrunt.com](http://www.erinvanbrunt.com).

#### Medium Blog Post: [Building 2048 (Game) in React.js: A Step-by-step Tutorial](https://medium.com/@erinmontybruce/building-2048-game-in-react-a-step-by-step-tutorial-ed83630e0488)

## 1. Overview and User Walkthrough

### Game Overview:

Numerix challenges players to combine tiles with matching numbers to create a tile with the value 2048 or higher. The game is designed to be engaging and addictive, testing both strategy and foresight.

### User Walkthrough:

- **Starting the Game**:

  - When the page loads, the game automatically initializes with two tiles placed randomly on the board.
  - Players can restart the game at any time using the Restart button.

- **Gameplay**:

  - Use arrow keys (← ↑ → ↓) to slide the tiles across the grid. Tiles with the same number merge into one, doubling their value.
  - Each merge increases the player's score. The score is displayed prominently during the game.
  - The game ends when no more moves are possible. Players can restart to try again.

- **Help Menu**:
  - Players can access the Help menu for detailed instructions on how to play the game. This menu can be toggled on or off as needed.

---

## 2. Technologies and Techniques Used

### Technologies:

- React.js for a component-based structure and state management.
- JavaScript (ES6+) for game logic, including moves, merges, score tracking, and game-over detection.
- CSS for a custom, paper-texture-inspired aesthetic.

### Techniques:

- Dynamic tile generation and movement logic.
- State management for tracking the game board, score, and help menu visibility.
- Responsive design to ensure a consistent experience across devices and screen sizes.

---

## 3. Professional Details

### Features:

- Dynamic gameplay with responsive and intuitive tile movement.
- Scoring system that tracks player progress.
- Comprehensive in-game instructions via a Help menu.
- Restart option for a fresh start at any time.

### Installation and Setup:

To set up Numerix locally:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the project with `npm start`.
4. Access the game at `http://localhost:3000`.

---

## 4. To-Do List

- Replace the Game Over alert with a modal for improved user experience.
- Ensure responsive design across all screen sizes.
- Add a feature for users to save high scores to a database.

---

## 5. Contributing

If you'd like to contribute to Numerix, please fork the repository and create a pull request with your changes. Feedback and feature suggestions are welcome!

---

## 6. Acknowledgments

Numerix is inspired by the original 2048 game created by Gabriele Cirulli. This project pays homage to the addictive simplicity and strategic depth of the classic game.

---
