import "./Header.css";
import ELogo from "../../Images/Shop/EvieLogo.png";

export default function Header() {
  return (
    <>
      <header className="header">
        <img className="e-logo" src={ELogo} alt="Evie Logo" />
      </header>
    </>
  );
}
