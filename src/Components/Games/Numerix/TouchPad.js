import "./TouchPad.css";

export default function TouchPad({ handleArrowClick }) {
  const grid = [null, "↑", null, "←", null, "→", null, "↓", null];

  return (
    <div className="touch-pad">
      {grid.map((box, index) => (
        <div key={index} className="touch-box">
          {box !== null ? (
            <div
              className="enable-touch-box"
              key={`child-${index}`}
              onClick={() => handleArrowClick(box)} // Log arrow when clicked
            >
              {box}
            </div>
          ) : (
            <div className="null-box" key={`child-${index}`} />
          )}
        </div>
      ))}
    </div>
  );
}
