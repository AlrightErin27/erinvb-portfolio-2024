import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    // In a real application, you might fetch this data from an API
    setProjects(projectsData);

    // Check for user's preferred color scheme
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(prefersDarkScheme.matches);

    // Listen for changes to color scheme preference
    const handleChange = (event) => setIsDarkMode(event.matches);
    prefersDarkScheme.addListener(handleChange);

    return () => prefersDarkScheme.removeListener(handleChange);
  }, []);

  useEffect(() => {
    // Apply the current mode to the body
    document.body.classList.toggle("light-mode", !isDarkMode);
  }, [isDarkMode]);

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="projects-container">
      <button className="mode-toggle" onClick={toggleMode}>
        Switch to {isDarkMode ? "light" : "dark"} mode
      </button>
      <h1 className="projects-title">Project Walkthroughs</h1>
      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h2 className="project-title">{project.title}</h2>
            <p className="project-date">Date: {project.date}</p>
            <div className="video-container">
              <video controls>
                <source src={project.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="project-details">
              <h3>Project Notes:</h3>
              <p>{project.notes}</p>
              <h3>Technologies Used:</h3>
              <ul className="tech-list">
                {project.techUsed.map((tech, index) => (
                  <li key={index} className="tech-item">
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
