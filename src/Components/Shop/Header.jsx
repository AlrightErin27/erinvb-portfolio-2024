import "./Shop.css";
import ELogo from "../../Images/Shop/EvieLogo.png";
import icon from "../../Images/Shop/account.png";

export default function Header({ setCart }) {
  return (
    <div className="header">
      <div className="shop-nav">
        <img
          src={icon}
          alt="account icon"
          className="account-icon"
          onClick={() => setCart(true)}
        />
      </div>
      <img className="e-logo" src={ELogo} alt="e-logo" />
    </div>
  );
}
