import "./Shop.css";

export default function Footer({ handleLogout }) {
  return (
    <button className="shop-button" onClick={handleLogout}>
      Log Out
    </button>
  );
}
