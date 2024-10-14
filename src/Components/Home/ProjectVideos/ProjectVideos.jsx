import React, { useState, useEffect, useRef } from "react";
import "./ProjectVideos.css";

const projectsData = [
  {
    id: 1,
    title: "E-commerce Platform Redesign",
    date: "2023-09-15",
    videoUrl: "https://example.com/video1.mp4",
    notes:
      "Complete overhaul of the user interface and checkout process, focusing on improved user experience and conversion rates.",
    techUsed: ["React", "Node.js", "MongoDB", "Stripe API"],
  },
  {
    id: 2,
    title: "AI-Powered Chat Assistant",
    date: "2023-11-30",
    videoUrl: "https://example.com/video2.mp4",
    notes:
      "Developed an intelligent chatbot using natural language processing to enhance customer support efficiency.",
    techUsed: ["Python", "TensorFlow", "Flask", "Docker"],
  },
  {
    id: 3,
    title: "Blockchain-based Supply Chain Tracker",
    date: "2024-02-10",
    videoUrl: "https://example.com/video3.mp4",
    notes:
      "Created a decentralized application for transparent and secure tracking of product origins and shipments.",
    techUsed: ["Solidity", "Ethereum", "Web3.js", "React"],
  },
];

const ProjectVideos = () => {
  const [projects, setProjects] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const projectRefs = useRef({});

  useEffect(() => {
    setProjects(projectsData);
    if (projectsData.length > 0) {
      setSelectedProject(projectsData[0].id);
    }

    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(prefersDarkScheme.matches);

    const handleChange = (event) => setIsDarkMode(event.matches);
    prefersDarkScheme.addListener(handleChange);

    return () => prefersDarkScheme.removeListener(handleChange);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("pv-light-mode", !isDarkMode);
  }, [isDarkMode]);

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
    if (projectRefs.current[projectId]) {
      projectRefs.current[projectId].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pv-container">
      <button className="pv-toggle" onClick={toggleMode}>
        {isDarkMode ? "Light" : "Dark"}
      </button>
      <h1 className="pv-title">Project Walkthroughs</h1>

      <div className="pv-selector">
        <select
          value={selectedProject}
          onChange={(e) => handleProjectSelect(Number(e.target.value))}
          className="pv-dropdown"
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title} - {project.techUsed.join(", ")}
            </option>
          ))}
        </select>
      </div>

      <div className="pv-list">
        {projects.map((project) => (
          <div
            key={project.id}
            className="pv-card"
            ref={(el) => (projectRefs.current[project.id] = el)}
          >
            <h2 className="pv-card-title">{project.title}</h2>
            <p className="pv-date">Date: {project.date}</p>
            <video className="pv-video" controls>
              <source src={project.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="pv-details">
              <h3 className="pv-heading">Project Notes:</h3>
              <p className="pv-notes">{project.notes}</p>
              <h3 className="pv-heading">Technologies Used:</h3>
              <ul className="pv-tech">
                {project.techUsed.map((tech, index) => (
                  <li key={index} className="pv-tech-item">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectVideos;
