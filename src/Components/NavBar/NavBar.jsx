import "./NavBar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [select, setSelect] = useState("home"); // State to track the selected navigation link

  const components = [
    { title: "Home", path: "/" },
    { title: "Resume", path: "/resume" },
    {
      title: [
        <span key="1">Project</span>,
        <br key="2" />,
        <span key="3">Walkthrough Videos</span>,
      ],
      path: "/project-videos",
    },
    { title: "Blog", path: "/blog" },
    { title: "Games", path: "/games" },
    { title: "Shop", path: "/shop" },
  ];

  return (
    <nav className="vintage-nav">
      <ul className="nav-ul">
        {components.map((comp, idx) => (
          // Each navigation item is a list item
          <li
            key={idx}
            className={`nav-li ${select === comp.title ? "select-li" : ""}`} // Apply 'select-li' class if the item is selected
          >
            {/* Link component for navigation */}
            <Link
              to={comp.path} // Path for the navigation link
              onClick={() => setSelect(comp.title)}
              className={`nav-link ${
                select === comp.title ? "select-link" : ""
              }`}
            >
              {comp.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
