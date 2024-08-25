import "./Games.css";
import { Link } from "react-router-dom";

export default function Games() {
  return (
    <div className="Games">
      GAMES
      <Link to={"/games/concentration"}>Concentration</Link>
    </div>
  );
}
