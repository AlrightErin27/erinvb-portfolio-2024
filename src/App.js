import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import Blog from "./Components/Blog/Blog";
import Resume from "./Components/Home/Resume/Resume";
import ProjectVideos from "./Components/Home/ProjectVideos/ProjectVideos";
// import Weatherly from "./Components/Weatherly/Weatherly";

import Games from "./Components/Games/Games";
import Concentration from "./Components/Games/Concentration/Concentration";
import NoughtsAndCrosses from "./Components/Games/NoughtsAndCrosses/NoughtsAndCrosses";
import Crossword from "./Components/Games/Crossword/Crossword";
import CemeteryRun from "./Components/Games/CemeteryRun/CemeteryRun";
import Numerix from "./Components/Games/Numerix/Numerix";

import Shop from "./Components/Shop/Shop";

function App() {
  return (
    <Router>
      <div style={{ height: "100%" }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/project-videos" element={<ProjectVideos />} />
          {/* <Route path="/weatherly" element={<Weatherly />} /> */}

          <Route path="/games" element={<Games />} />
          <Route path="/games/concentration" element={<Concentration />} />
          <Route
            path="/games/noughts-&-crosses"
            element={<NoughtsAndCrosses />}
          />
          <Route path="/games/crossword" element={<Crossword />} />
          <Route path="/games/cemetery-run" element={<CemeteryRun />} />
          <Route path="/games/numerix" element={<Numerix />} />

          <Route path="/shop" element={<Shop />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
