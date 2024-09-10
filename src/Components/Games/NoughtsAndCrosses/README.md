# Noughts and Crosses (Tic-Tac-Toe)

This project is a React-based implementation of the classic Noughts and Crosses (Tic-Tac-Toe) game. The game allows two players to take turns, tracks wins for both players, and handles tied games (also known as Cat's Game). The interface is designed for simplicity and smooth interaction.

## 1. Overview and User Walkthrough

### Game Overview:

Noughts and Crosses is a simple turn-based game where two players (Player X and Player O) alternate placing their mark on a 3x3 grid. The goal is to be the first player to get three marks in a row, either horizontally, vertically, or diagonally.

### User Walkthrough:

- **Starting the Game**: When the page loads, the game automatically starts with Player X. The grid is empty, and both players' win counts are displayed.
- **Gameplay**:
  - **Making a Move**: Players click on a cell in the grid to place their mark (X or O). Once clicked, the cell cannot be changed.
  - **Win or Tie Detection**: The game automatically checks for a win after each move. If Player X or Player O wins, the game resets after a short delay, and the win is recorded. If all cells are filled and no player wins, it's a tie (Cat's Game), and the game resets as well.
- **Rounds Played**: The total number of rounds played is tracked and displayed.
- **Restarting**: After a win or tie, the grid resets, and the game begins again with Player X.

---

## 2. Technologies and Techniques Used

### Technologies:

- **React.js**: Component-based structure to manage game logic, rendering, and state.
- **JavaScript (ES6+)**: Core logic for handling player moves, win detection, and game reset.
- **CSS**: Styling for the grid and visual feedback.

### Techniques:

- **State Management**:

  - **useState**: Used to track the current player, cell states, win states, and scores.

  ```javascript
  const [player, setPlayer] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(null));
  const [foundWin, setFoundWin] = useState(false);
  ```

- **Win Detection Logic**:
  The game checks for wins after every move using predefined winning combinations. If a player matches one of these combinations, they win.

  ```javascript
  const checkForWins = (player, board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === player && board[b] === player && board[c] === player) {
        return true;
      }
    }
    return false;
  };
  ```

- **Game Reset**:
  After a win or a tie, the game automatically resets, keeping track of the current scores for each player.

  ```javascript
  const startGame = () => {
    setFoundWin(false);
    setCatsGame(false);
    setCells(Array(9).fill(null));
    setPlayer("X");
  };
  ```

---

## 3. Professional Details

### Features:

- **Two-Player Turn-Based Game**: Supports two players with alternating turns and visual feedback for each move.
- **Win and Tie Detection**: Automatically detects wins and ties, and restarts the game after a brief delay.
- **Score Tracking**: Keeps track of the number of wins for both Player X and Player O, as well as the number of rounds played.
- **Responsive Layout**: The game is designed to be responsive, adapting to different screen sizes.

### Installation and Setup:

To set up the project locally:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   cd noughts-and-crosses
   npm install
   ```
3. Run the project:
   ```bash
   npm start
   ```
4. Access the game at `http://localhost:3000`.

---

## 4. Contributing

If you'd like to contribute to the project, please fork the repository and create a pull request with your changes.
