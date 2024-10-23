import React, { useState, useEffect, useRef } from "react";
import "./ProjectVideos.css";
import projectsData from "./ProjectsData";
import CookiesButton from "./CookiesButton";

const TechList = ({ techUsed }) => {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const initialTechCount = 9;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMobile || techUsed.length <= initialTechCount) {
    return (
      <ul className="pv-tech">
        {techUsed.map((tech, index) => (
          <li key={index} className="pv-tech-item">
            {tech}
          </li>
        ))}
      </ul>
    );
  }

  const displayedTech = showAll
    ? techUsed
    : techUsed.slice(0, initialTechCount);

  return (
    <div className="pv-tech-container">
      <ul className="pv-tech">
        {displayedTech.map((tech, index) => (
          <li key={index} className="pv-tech-item">
            {tech}
          </li>
        ))}
        {!showAll && techUsed.length > initialTechCount && (
          <li
            className="pv-tech-item pv-tech-show-more"
            onClick={() => setShowAll(true)}
          >
            Show All ({techUsed.length - initialTechCount} more)
          </li>
        )}
      </ul>
      {showAll && (
        <button className="pv-tech-show-less" onClick={() => setShowAll(false)}>
          Show Less
        </button>
      )}
    </div>
  );
};

const ProjectVideos = () => {
  const [projects, setProjects] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const projectRefs = useRef({});

  useEffect(() => {
    if (Array.isArray(projectsData) && projectsData.length > 0) {
      setProjects(projectsData);
      setSelectedProject(projectsData[0].id);
    } else {
      console.error("projectsData is not a valid array:", projectsData);
      setProjects([]);
    }

    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(prefersDarkScheme.matches);
    const handleChange = (event) => setIsDarkMode(event.matches);
    prefersDarkScheme.addEventListener("change", handleChange);

    return () => prefersDarkScheme.removeEventListener("change", handleChange);
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

  const renderVideo = (project) => {
    if (project.videoUrl.includes("vimeo.com")) {
      return (
        <div className="pv-video-container">
          <iframe
            src={`${project.videoUrl}?dnt=1`}
            width="100%"
            height="100%"
            frameBorder="0"
            title={project.title}
            allow="fullscreen"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      );
    } else if (project.videoUrl) {
      return (
        <div className="pv-video-container">
          <video
            className="pv-video"
            controls
            preload="metadata"
            crossOrigin="anonymous"
          >
            <source src={project.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else {
      return <div className="pv-video-placeholder">No video available</div>;
    }
  };

  const renderProjectLinks = (project) => {
    return (
      <div className="pv-links">
        {project.github && (
          <a
            href={project.github}
            className="pv-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        )}
        {project.url && (
          <a
            href={project.url}
            className="pv-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </a>
        )}
        {!project.github && !project.url && (
          <span className="pv-link-placeholder">No links available</span>
        )}
      </div>
    );
  };

  if (projects.length === 0) {
    return (
      <div className="pv-loading">
        Loading projects... If this persists, there might be an issue with the
        data.
      </div>
    );
  }

  return (
    <div className="pv-container">
      <CookiesButton />
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
              {project.title}
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
            {renderVideo(project)}
            <div className="pv-details">
              <h3 className="pv-heading">Project Notes:</h3>
              <p className="pv-notes">{project.notes}</p>
              {renderProjectLinks(project)}
              <h3 className="pv-heading">Technologies Used:</h3>
              <TechList techUsed={project.techUsed} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectVideos;
