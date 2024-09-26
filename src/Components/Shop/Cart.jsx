import "./Shop.css";

export default function Cart({ lastLogin, purchases }) {
  return (
    <>
      <p className="shop-p">
        Last login: {new Date(lastLogin).toLocaleString()}
      </p>
      <p className="shop-p">Past purchases: {purchases.join(", ") || "None"}</p>
    </>
  );
}
