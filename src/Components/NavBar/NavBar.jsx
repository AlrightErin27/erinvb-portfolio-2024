import "./NavBar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [select, setSelect] = useState("home");

  const components = [
    { title: "Home", path: "/" },
    { title: "Projects", path: "/project-videos" },
    { title: "Blog", path: "/blog" },
    { title: "Games", path: "/games" },
    { title: "Shop", path: "/shop" },
  ];

  if (select)
    return (
      <nav className="vintage-nav">
        <ul className="nav-ul">
          {components.map((comp, idx) => {
            return (
              <li
                key={idx}
                className={`nav-li ${select === comp.title ? "select-li" : ""}`}
              >
                <Link
                  to={comp.path}
                  onClick={() => setSelect(comp.title)}
                  className={`nav-link ${
                    select === comp.title ? "select-link" : ""
                  }`}
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
