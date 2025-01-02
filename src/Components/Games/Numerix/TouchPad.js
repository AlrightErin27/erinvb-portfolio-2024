import "./TouchPad.css";

export default function TouchPad({ handleArrowClick }) {
  const grid = [null, "↑", null, "←", null, "→", null, "↓", null];

  return (
    <div className="n-touch-pad">
      {grid.map((box, index) => (
        <div key={index} className="n-touch-box">
          {box !== null ? (
            <div
              className="n-enable-touch-box"
              key={`child-${index}`}
              onClick={() => handleArrowClick(box)} // Log arrow when clicked
            >
              {box}
            </div>
          ) : (
            <div className="n-null-box" key={`child-${index}`} />
          )}
        </div>
      ))}
    </div>
  );
}
