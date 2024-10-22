import "./CSS/Header.css";
import ELogo from "../../Images/Shop/EvieLogo.png";

export default function Header() {
  return (
    <>
      <header className="header">
        <div className="circle-background">
          <img className="e-logo" src={ELogo} alt="Evie Logo" />
        </div>
      </header>
    </>
  );
}
