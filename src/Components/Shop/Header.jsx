import "./Shop.css";
import EvieLogo from "../../Images/Shop/EvieLogo.png";

export default function Header() {
  return (
    <div className="header">
      <img className="evie-logo" src={EvieLogo} alt="evie-logo" />
    </div>
  );
}
