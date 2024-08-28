import "./Square.css";

export default function Square({ sq, clickSquare }) {
  function displayCorner() {
    if (sq.corner) {
      return <div className="corner-num">{sq.questions[0]}</div>;
    }
  }

  function displayBlackOrWhite() {
    if (sq.black) {
      return <div className="black-sq" />;
    } else {
      return (
        <div
          className="white-sq"
          onClick={() => {
            clickSquare(sq);
          }}
        >
          {displayCorner()}
        </div>
      );
    }
  }

  return (
    <div
      className="Square"
      style={sq.highLight ? { backgroundColor: "black" } : null}
    >
      {displayBlackOrWhite()}
    </div>
  );
}
