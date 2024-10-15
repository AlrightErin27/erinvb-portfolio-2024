import React from "react";

const GardenSquare = ({
  isRevealed,
  isFlagged,
  hasPest,
  neighborPests,
  image,
  onClick,
  flagImage,
}) => {
  const getContent = () => {
    if (!isRevealed && isFlagged) {
      return flagImage ? (
        <img src={flagImage} alt="Flag" className="square-image" />
      ) : (
        "🚩"
      );
    }
    if (!isRevealed) return "";
    if (hasPest)
      return <img src={image} alt="Flower" className="square-image" />;
    if (neighborPests > 0) return neighborPests;
    return <img src={image} alt="Clover" className="square-image" />;
  };

  const getClassName = () => {
    let className = "garden-square";
    if (isRevealed) className += " revealed";
    if (hasPest && isRevealed) className += " pest";
    return className;
  };

  return (
    <div className={getClassName()} onClick={onClick}>
      {getContent()}
    </div>
  );
};

export default GardenSquare;
