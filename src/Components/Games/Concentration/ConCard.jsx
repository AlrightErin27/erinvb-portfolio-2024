import "./Concentration.css";
import ReactCardFlip from "react-card-flip";

export default function ConCard({ card, idx, handleCardClick }) {
  return (
    <ReactCardFlip isFlipped={card.isFlipped} flipDirection="horizontal">
      <div
        style={
          card.isFlipped || card.isMatched
            ? {
                backgroundImage: `url(${card.content})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }
            : null
        }
        className={`conc-card ${
          card.isFlipped || card.isMatched ? "conc-flipped" : "conc-not-flipped"
        }`}
        onClick={() => handleCardClick(idx)}
      />
      <div
        style={
          card.isFlipped || card.isMatched
            ? {
                backgroundImage: `url(${card.content})`,
                backgroundRepeat: "no-repeat",
              }
            : null
        }
        className={`conc-card ${
          card.isFlipped || card.isMatched ? "conc-flipped" : "conc-not-flipped"
        }`}
        onClick={() => handleCardClick(idx)}
      />
    </ReactCardFlip>
  );
}
