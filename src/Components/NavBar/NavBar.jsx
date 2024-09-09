import "./NavBar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [select, setSelect] = useState("home");

  const components = [
    { title: "Home", path: "/" },
    { title: "Blog", path: "/blog" },
    { title: "Games", path: "/games" },
  ];

  if (select)
    return (
      <nav>
        <ul className="nav-ul">
          {components.map((comp, idx) => {
            return (
              <li
                key={idx}
                // className={select === comp.title ? "select-li" : "nav-li"}
              >
                <Link
                  to={comp.path}
                  onClick={() => setSelect(comp.title)}
                  // className={select === comp.title ? "select-a" : ""}
                >
                  {comp.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
};

export default NavBar;
