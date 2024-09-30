import "./Shop.css";
import ELogo from "../../Images/Shop/EvieLogo.png";
import icon from "../../Images/Shop/account.png";

export default function Header({}) {
  return (
    <div className="header">
      <div className="shop-nav"></div>
      <img className="e-logo" src={ELogo} alt="e-logo" />
    </div>
  );
}
