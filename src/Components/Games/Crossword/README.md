# Crossword Puzzle Game

A React-based interactive crossword puzzle game that allows users to navigate and solve crossword grids using both mouse clicks and keyboard input. This game was developed with a focus on creating an intuitive, fluid user experience, leveraging modern web development tools and techniques.

## 1. Overview and User Walkthrough

### Game Overview:

The crossword puzzle game is designed for users to easily fill in answers by either clicking on individual squares or using keyboard navigation. The grid layout allows for easy switching between across and down clues, with visual feedback to guide the player.

### User Walkthrough:

- **Starting the Game**: Users are presented with a grid of empty squares and a list of across and down clues.
- **Filling in the Grid**:
  - **Mouse Interaction**: Users can click on any square to start entering a letter. Clicking on a new square automatically switches focus and updates the highlighted word.
  - **Keyboard Interaction**: Arrow keys allow users to navigate between squares, with backspace clearing a square and moving backward.
- **Word Highlighting**: The currently active word is highlighted for easier clue-solving. The game remembers the previously selected direction (across or down) and prioritizes that direction for intersections.
- **Navigation**: Users can smoothly switch between mouse clicks and keyboard inputs without losing track of their position in the grid.

---

## 2. Technologies and Techniques Used

### Technologies:

- **React.js**: Component-based structure to handle the dynamic UI and interactions.
- **JavaScript (ES6+)**: Core language for logic, user interactions, and keyboard events.
- **CSS**: Custom styling for the crossword grid and highlighting.

### Techniques:

- **Custom Keyboard Navigation**: Navigation between squares is controlled using custom event handlers for arrow keys and backspace.

  ```javascript
  function handleKeyPress(e) {
    switch (e.key) {
      case "ArrowRight":
        moveFocus(1); // Move to the next square
        break;
      case "ArrowDown":
        moveFocus(16); // Move down a row
        break;
      case "Backspace":
        handleBackspace(e);
        break;
      default:
        break;
    }
  }
  ```

- **State Management for Active Square**: Both mouse clicks and keyboard input update the active square in state, ensuring synchronization between both input methods.

  ```javascript
  const [activeSquare, setActiveSquare] = useState(null);
  ```

- **Tracking Previous Direction**: The game tracks the last direction (across or down) to ensure the correct word is highlighted when users click on intersecting squares.

  ```javascript
  const [prevDirection, setPrevDirection] = useState(null);

  function handleSquareClick(square) {
    let word, direction;

    if (square.words.length === 2) {
      word = prevDirection === "across" ? square.words[0] : square.words[1];
      direction = prevDirection === "across" ? "across" : "down";
    } else {
      word = square.words[0];
      direction = square.dirs[0];
    }

    setPrevDirection(direction);
    setActiveSquare(square.idx);
  }
  ```

- **Custom Backspace Handling**: Overriding default browser behavior for backspace ensures it clears the current square and moves focus back to the previous one.

---

## 3. Professional Details

### Features:

- **Seamless Mouse and Keyboard Navigation**: Users can interact with the crossword using either method, and both inputs are kept in sync.
- **Word Highlighting**: The game visually highlights the active word to help guide the user through the puzzle.
- **Custom Backspace Functionality**: Backspace clears letters and moves the focus to the previous square for efficient navigation.

### Installation and Setup:

To set up the project locally:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   cd crossword-game
   npm install
   ```
3. Run the project:
   ```bash
   npm start
   ```
4. Access the project at `http://localhost:3000`.

---

## 4. Contributing

If you'd like to contribute, please fork the repository and create a pull request with your changes.
