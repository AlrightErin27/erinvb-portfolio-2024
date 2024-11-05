import "./NavBar.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";

const NavBar = () => {
  const location = useLocation();

  // First, memoize the components array
  const components = useMemo(
    () => [
      {
        title: [
          <span key="1" className="navbar-span">
            Project
          </span>,
          <br key="2" className="navbar-span" />,
          <span key="3" className="navbar-span">
            Walkthrough Videos
          </span>,
        ],
        path: "/project-videos",
        id: "project-videos",
      },
      { title: "Home", path: "/", id: "home" },
      { title: "Resume", path: "/resume", id: "resume" },
      { title: "Blog", path: "/blog", id: "blog" },
      { title: "Games", path: "/games", id: "games" },
      { title: "Shop", path: "/shop", id: "shop" },
      { title: null, path: "/games/crossword", id: "games" },
      { title: null, path: "/games/noughts-&-crosses", id: "games" },
      { title: null, path: "/games/cemetery-run", id: "games" },
      { title: null, path: "/games/concentration", id: "games" },
    ],
    []
  ); // Empty dependency array since this never changes

  // Then, memoize getTitleFromPath using the memoized components
  const getTitleFromPath = useCallback((path) => {
    const component = components.find((comp) => comp.path === path);
    return component ? component.id : "home";
  }, []); // Remove components from dependency array since it's now memoized

  // Initialize state based on current path
  const [select, setSelect] = useState(() =>
    getTitleFromPath(location.pathname)
  );

  // Update selection when route changes
  useEffect(() => {
    const currentTitle = getTitleFromPath(location.pathname);
    setSelect(currentTitle);
  }, [location.pathname, getTitleFromPath]);

  return (
    <nav className="vintage-nav">
      <ul className="nav-ul">
        {components.map((comp) => (
          <>
            {!comp.title ? null : (
              <li
                key={comp.id}
                className={`nav-li ${select === comp.id ? "select-li" : ""}`}
              >
                <Link
                  to={comp.path}
                  onClick={() => setSelect(comp.id)}
                  className={`nav-link ${
                    select === comp.id ? "select-link" : ""
                  }`}
                >
                  {comp.title}
                </Link>
              </li>
            )}
          </>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
