# Concentration (Memory Matching Game)

This project is a React-based implementation of the classic Concentration (Memory Matching) game. The game presents players with a set of cards laid out face-down, and the goal is to flip over pairs of matching cards. The game tracks the number of successful matches and offers a simple reset functionality for replayability.

## 1. Overview and User Walkthrough

### Game Overview:

Concentration is a memory game where the objective is to find pairs of matching cards. Players take turns flipping over two cards, and if the cards match, they remain flipped. The game continues until all pairs are matched.

### User Walkthrough:

- **Starting the Game**: When the game loads, the cards are shuffled and placed face down. The player is prompted to start by clicking on two cards to flip them.
- **Gameplay**:
  - **Flipping Cards**: Players click on two cards to flip them. If the cards match, they remain face-up. If they don’t match, they flip back down after a brief delay.
  - **Winning**: The game ends when all pairs of cards are successfully matched.
- **Resetting the Game**: Once all pairs are matched, or if the player wants to restart, they can reset the game, which shuffles the cards again and starts a new round.

---

## 2. Technologies and Techniques Used

### Technologies:

- **React.js**: Used for managing the component structure, game logic, and rendering the cards.
- **JavaScript (ES6+)**: Core logic for card shuffling, flipping, and match detection.
- **CSS**: Styling for the layout of the cards and game feedback.

### Techniques:

- **State Management**:

  - **useState**: Used to track the state of the cards (flipped, matched), and the game state (number of matches, checking status).

  ```javascript
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  ```

- **Shuffling Logic**:
  The game starts by shuffling the cards, ensuring a random layout every time the game is reset.

  ```javascript
  const shuffleCards = (cardsArray) => {
    return cardsArray
      .map((card) => ({
        ...card,
        sort: Math.random(),
        isFlipped: false,
        isMatched: false,
      }))
      .sort((a, b) => a.sort - b.sort)
      .map((card) => ({ ...card, sort: undefined }));
  };
  ```

- **Game Reset**:
  The game can be reset at any time, shuffling the cards and resetting the flipped and matched states.

  ```javascript
  const resetGame = useCallback(() => {
    setCards(shuffleCards([...initialCards]));
    setFlippedCards([]);
    setMatches(0);
    setIsChecking(false);
  }, []);
  ```

---

## 3. Professional Details

### Features:

- **Interactive Gameplay**: Players can flip cards and match pairs, with real-time feedback.
- **Match Tracking**: The game tracks the number of matches, and displays when all pairs have been found.
- **Randomized Cards**: Every new game starts with a randomized shuffle of the cards to ensure a different layout each time.

### Installation and Setup:

To set up the project locally:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   cd concentration-game
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
