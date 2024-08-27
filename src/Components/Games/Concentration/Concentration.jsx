import React, { useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import "./Concentration.css";

import Card from "./ConCard";
import img1 from "../../../Images/Games/Concentration/abcs.jpg";
import img2 from "../../../Images/Games/Concentration/dreaming.jpg";
import img3 from "../../../Images/Games/Concentration/dreams.jpg";
import img4 from "../../../Images/Games/Concentration/familyphoto.jpg";
import img5 from "../../../Images/Games/Concentration/girlmoon.jpg";
import img6 from "../../../Images/Games/Concentration/ladiesmars.jpg";
import img7 from "../../../Images/Games/Concentration/newnationalpark.jpg";
import img8 from "../../../Images/Games/Concentration/pillowtalk.jpg";
import img9 from "../../../Images/Games/Concentration/playtime.jpg";

const initialCards = [
  { id: 1, content: img1 },
  { id: 2, content: img1 },
  { id: 3, content: img2 },
  { id: 4, content: img2 },
  { id: 5, content: img3 },
  { id: 6, content: img3 },
  { id: 7, content: img4 },
  { id: 8, content: img4 },
  { id: 9, content: img5 },
  { id: 10, content: img5 },
  { id: 11, content: img6 },
  { id: 12, content: img6 },
  { id: 13, content: img7 },
  { id: 14, content: img7 },
  { id: 15, content: img8 },
  { id: 16, content: img8 },
  { id: 17, content: img9 },
  { id: 18, content: img9 },
];

export default function Concentration1() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [backToGames, setBackToGames] = useState(false);

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

  const resetGame = useCallback(() => {
    setCards(shuffleCards([...initialCards]));
    setFlippedCards([]);
    setMatches(0);
    setIsChecking(false);
  }, []); // useCallback with an empty dependency array ensures resetGame doesn't change between renders

  useEffect(() => {
    // Shuffle cards at the start
    resetGame();
  }, [resetGame]);

  const handleCardClick = (index) => {
    if (isChecking || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, index];

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      setTimeout(() => checkForMatch(newFlippedCards), 2400);
    } else {
      setFlippedCards(newFlippedCards);
    }
  };

  const checkForMatch = (flippedIndexes) => {
    const [firstIndex, secondIndex] = flippedIndexes;
    const newCards = [...cards];

    if (newCards[firstIndex].content === newCards[secondIndex].content) {
      newCards[firstIndex].isMatched = true;
      newCards[secondIndex].isMatched = true;
      setMatches((prevMatches) => prevMatches + 1);
    } else {
      newCards[firstIndex].isFlipped = false;
      newCards[secondIndex].isFlipped = false;
    }

    setCards(newCards);
    setFlippedCards([]);
    setIsChecking(false);
  };

  //if all matches have been found
  if (matches === cards.length / 2) {
    resetGame();
  }

  //It back btn pressed this checks the state and brings you back to games page
  if (backToGames) {
    // console.log("Take me awayyyyyyy");
    return <Navigate to="/games" />;
  }

  return (
    <div className="Concentration">
      <div className="game-controls">
        <button onClick={() => setBackToGames(true)} className="con-btn">
          Back To Games
        </button>
        <button onClick={resetGame} className="con-btn">
          Restart
        </button>
      </div>
      <div className="game-board">
        {cards.map((card, idx) => (
          <Card
            card={card}
            key={idx}
            idx={idx}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}
