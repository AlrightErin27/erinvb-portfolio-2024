import { useEffect } from "react";
import "./Resume.css";
import Icon from "../../../Images/Home/Icons/download.png";
import PDF from "../../../Images/Home/Resume/SoftwareResume2024.pdf";

const Resume = () => {
  useEffect(() => {
    const createDot = () => {
      const dot = document.createElement("div");
      dot.className = "background-dot";

      // Set random starting positions
      dot.style.left = `${Math.random() * 100}%`;

      // Calculate animation duration
      const duration = Math.random() * 5 + 15; // 15-20 seconds
      dot.style.animationDuration = `${duration}s`;

      // Set animation delay for staggered effect
      dot.style.animationDelay = `${Math.random() * 10}s`;

      return dot;
    };

    const backgroundContainer = document.querySelector(".resume-background");
    if (backgroundContainer) {
      // Create initial dots
      for (let i = 0; i < 150; i++) {
        backgroundContainer.appendChild(createDot());
      }

      // Clean up function
      return () => {
        while (backgroundContainer.firstChild) {
          backgroundContainer.removeChild(backgroundContainer.firstChild);
        }
      };
    }
  }, []);

  // Download resume
  const downloadFile = () => {
    const el = document.createElement("a");
    el.href = PDF;
    el.download = "ErinVanBruntSoftwareEngResume2024.pdf";
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  };

  return (
    <div className="resume-wrapper">
      <div className="resume-background"></div>
      <div className="resume-container">
        <header className="resume-header">
          <h1>Erin Van Brunt</h1>
          <p>
            Eugene, OR | (541) 543-4781 |{" "}
            <a href="mailto:erinmontybruce@gmail.com">
              erinmontybruce@gmail.com
            </a>
          </p>
          <p>
            Portfolio:{" "}
            <a
              href="https://www.erinvanbrunt.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              erinvanbrunt.com
            </a>{" "}
            |{" "}
            <a
              href="https://www.linkedin.com/in/erin-van-brunt/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>{" "}
            |{" "}
            <a
              href="https://github.com/AlrightErin27"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{" "}
            |{" "}
            <a
              href="https://medium.com/@erinmontybruce"
              target="_blank"
              rel="noopener noreferrer"
            >
              Medium Blog
            </a>
          </p>
          <button className="download-btn" onClick={downloadFile}>
            <img src={Icon} alt="download resume PDF" className="dl-icon" />
            Download PDF
          </button>
        </header>

        <section className="resume-section">
          <h2>Full-Stack Software Engineer</h2>
          <p>
            Versatile Full-Stack Software Engineer with a strong focus on
            front-end development and a growing expertise in AI and machine
            learning. Skilled in creating user-friendly, responsive web
            applications and interactive games that blend technical precision
            with artistic sensibility to deliver high-quality, intelligent user
            experiences. Proficient in solving complex problems and transforming
            them into elegant, innovative solutions.
          </p>
        </section>

        <section className="resume-section">
          <h2>Technical Skills</h2>
          <ul className="skills-list">
            <li>
              <strong>Languages & Frameworks:</strong> JavaScript (ES6+),
              TypeScript, React.js, Node.js, Express.js, Ruby on Rails, Next.js,
              jQuery, Sinatra, HTML5, CSS3, SQL, Python, Ruby, Java, JSX
            </li>
            <li>
              <strong>Database & State Management:</strong> MongoDB, PostgreSQL,
              MySQL, SQLite, Redux, React Hooks, Local Storage, Data Structures
            </li>
            <li>
              <strong>Deployment & Server Configuration:</strong> Nginx, GoDaddy
              VPS, SSH, SSL certificate management, Environment Variables,
              Secure Deployment Practices
            </li>
            <li>
              <strong>Web Technologies & API Integration:</strong> RESTful API
              Design, Server-Side Rendering, JWT, OAuth, bcrypt, Axios, Fetch
              API, Web Audio API, HTML5 Canvas, Collision Detection (AABB),
              Custom React Hooks, CORS configuration
            </li>
            <li>
              <strong>Development Tools & AI:</strong> Git, GitHub, VSCode, npm,
              Heroku, Netlify, Claude AI, Agile, Scrum, TDD/BDD, RSpec,
              Responsive Design, Cross-Browser Compatibility, Mobile-First
              Development, Component-based Architecture, Cadence Virtuoso IC6.1
            </li>
            <li>
              <strong>UI/UX & Design:</strong> CSS Grid, Flexbox, Media Queries,
              CSS Keyframes, CSS Animations, Wireframing, Pixel Art Design
            </li>
          </ul>
        </section>

        <section className="resume-section">
          <h2>Projects</h2>
          <div className="project-item">
            <h3>Professional Portfolio Deployment | November 2024</h3>
            <p>
              Deployed a full-stack portfolio website hosted on a GoDaddy VPS
              with AlmaLinux 8, featuring secure data handling, responsive
              design, and optimized production configuration.
            </p>
            <ul>
              <li className="bullet">
                Configured Nginx for HTTP and HTTPS traffic management,
                implemented Node.js backend with MongoDB for shop functionality,
                and configured environment variables through .env files for
                secure handling across development and production environments.
              </li>
              <li className="bullet">
                SSL certificates ensure data security, while CORS policies allow
                API requests from multiple domain variations.
              </li>
              <li className="bullet">
                Server.js was adapted to automate static file serving and
                support a seamless production setup.
              </li>
            </ul>
            <p>
              <strong>Technologies Used:</strong> AlmaLinux 8, Nginx, Node.js,
              MongoDB, CORS, Environment Variables
            </p>
            <p>
              <a
                href="https://github.com/AlrightErin27/erinvb-portfolio-2024"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>{" "}
              |{" "}
              <a
                href="https://www.erinvanbrunt.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>
            </p>
          </div>

          <div className="project-item">
            <h3>Full-Stack E-Commerce Platform: Evie & Co. | October 2024</h3>
            <p>
              Created a comprehensive MERN stack e-commerce solution applying
              React.js for the frontend and Node.js with Express.js for the
              backend, integrated with MongoDB.
            </p>
            <ul>
              <li className="bullet">
                Established secure user authentication with JWT and bcrypt,
                along with a comprehensive shopping cart system and intuitive
                product browsing experience.
              </li>
              <li className="bullet">
                Adapted React Hooks for efficient state management and
                implemented RESTful API design principles.
              </li>
            </ul>
            <p>
              <strong>Technologies Used:</strong> React, Node.js,
              MongoDB/Mongoose, Express.js, JWT Authentication, bcrypt
            </p>
            <p>
              <a
                href="https://github.com/AlrightErin27/erinvb-portfolio-2024/tree/main/src/Components/Shop"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>{" "}
              |{" "}
              <a
                href="https://www.erinvanbrunt.com/shop"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>{" "}
              |{" "}
              <a
                href="https://player.vimeo.com/video/1020451588"
                target="_blank"
                rel="noopener noreferrer"
              >
                Video Walkthrough
              </a>
            </p>
          </div>

          <div className="project-item">
            <h3>Cemetery Run: Retro-Inspired Arcade Game | October 2024</h3>
            <p>
              Engineered an engaging endless runner game using React.js and
              HTML5 Canvas, featuring custom pixel art and retro-style graphics.
            </p>
            <ul>
              <li className="bullet">
                Coded complex game mechanics, including collision detection,
                dynamic difficulty scaling, and custom controls for both desktop
                and mobile.
              </li>
              <li className="bullet">
                Leveraged requestAnimationFrame for smooth animations and game
                loop management.
              </li>
              <li className="bullet">
                Incorporated Web Audio API for immersive sound, with
                user-controlled audio settings.
              </li>
            </ul>
            <p>
              <strong>Technologies Used:</strong> React 17.0.2, HTML5 Canvas
              API, requestAnimationFrame, Custom Game Physics
            </p>
            <p>
              <a
                href="https://github.com/AlrightErin27/erinvb-portfolio-2024/tree/main/src/Components/Games/CemeteryRun"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>{" "}
              |{" "}
              <a
                href="https://www.erinvanbrunt.com/games/cemetery-run"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>{" "}
              |{" "}
              <a
                href="https://player.vimeo.com/video/1021123280"
                target="_blank"
                rel="noopener noreferrer"
              >
                Video Walkthrough
              </a>
            </p>
          </div>

          <div className="project-item">
            <h3>Interactive Crossword Puzzle | September 2024</h3>
            <p>
              Composed and built a crossword puzzle game featuring complex data
              structure manipulation and dynamic state management.
            </p>
            <ul>
              <li className="bullet">
                Engineered an advanced grid generation algorithm that maps and
                transforms question-answer pairs into an interactive game board,
                handling multi-directional words and intersecting letters.
              </li>
              <li className="bullet">
                Streamlined sophisticated keyboard navigation and word
                highlighting system using React's useState and useEffect hooks.
              </li>
              <li className="bullet">
                Created a responsive design using CSS Flexbox and media queries
                for seamless play across various devices.
              </li>
            </ul>
            <p>
              <strong>Technologies Used:</strong> React Hooks (useState,
              useEffect, useCallback), Complex Data Structure Mapping, Custom
              Grid Generation Algorithm, Dynamic State Management, CSS
              Grid/Flexbox
            </p>
            <p>
              <a
                href="https://github.com/AlrightErin27/erinvb-portfolio-2024/tree/main/src/Components/Games/Crossword"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>{" "}
              |{" "}
              <a
                href="https://www.erinvanbrunt.com/games/crossword"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>{" "}
              |{" "}
              <a
                href="https://player.vimeo.com/video/1021146314"
                target="_blank"
                rel="noopener noreferrer"
              >
                Video Walkthrough
              </a>
            </p>
          </div>

          <div className="project-item">
            <h3>Dynamic Blog Content Integration | November 2024</h3>
            <p>
              Developed a React-based platform that dynamically fetches and
              displays blog posts from Medium employing Axios and the RSS2JSON
              API.
            </p>
            <ul>
              <li className="bullet">
                Initiated robust error handling patterns with loading state
                management for optimal UX.
              </li>
              <li className="bullet">
                Fabricated an 80's sci-fi themed interface featuring custom CSS
                animations and responsive design.
              </li>
            </ul>
            <p>
              <strong>Technologies Used:</strong> React, Axios, RSS2JSON API,
              CSS Animations/Keyframes, Error Handling
            </p>
            <p>
              <a
                href="https://github.com/AlrightErin27/erinvb-portfolio-2024/tree/main/src/Components/Blog"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>{" "}
              |{" "}
              <a
                href="https://www.erinvanbrunt.com/blog"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>{" "}
              |{" "}
              <a
                href="https://player.vimeo.com/video/1020009691"
                target="_blank"
                rel="noopener noreferrer"
              >
                Video Walkthrough
              </a>
            </p>
          </div>
        </section>

        <section className="resume-section">
          <h2>Professional Experience</h2>
          <div className="experience-item">
            <h3>Restaurant Manager | April 2014 - Present</h3>
            <p>Pacific Northwest and Southwest US</p>
            <ul>
              <li className="bullet">
                Led teams of 15+ employees, driving a 20% increase in sales
                through optimizing operations, improving workflows, and refining
                inventory management.
              </li>
              <li className="bullet">
                Developed data-driven strategies to enhance operational
                efficiency and ensure smooth day-to-day functions.
              </li>
              <li className="bullet">
                Managed key areas including scheduling, staffing, inventory,
                bookkeeping, and social media marketing, while ensuring
                compliance with health and safety regulations.
              </li>
              <li className="bullet">
                Demonstrated strong team leadership, communication, and
                problem-solving skills, resulting in improved team productivity
                and customer satisfaction.
              </li>
              <li className="bullet">
                Applied high level of adaptability, attention to detail, and
                solution-oriented mindset to drive business success.
              </li>
            </ul>
          </div>

          <div className="experience-item">
            <h3>Layout Engineer | February 2011 - March 2014</h3>
            <p>Analog Devices, San Jose, CA</p>
            <ul>
              <li className="bullet">
                Formulated and optimized over 50 analog and digital layouts for
                ICs in mobile devices using Cadence Virtuoso IC6.1.
              </li>
              <li className="bullet">
                Utilized Cadence tools for schematic capture, layout design, and
                simulation, ensuring precise alignment and adherence to design
                rules.
              </li>
              <li className="bullet">
                Conducted DRC and LVS verifications using Cadence Assura,
                reducing error rates.
              </li>
              <li className="bullet">
                Collaborated with cross-functional teams to optimize circuit
                performance and layout efficiency.
              </li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2>Education</h2>
          <p>
            <strong>Arizona State University</strong> | Principles of
            Programming with Java | 2023
          </p>
          <p>
            <strong>Flatiron School</strong> | Full-Stack Software Engineering
            Certificate | 2022
          </p>
          <p>
            <strong>General Assembly</strong> | Software Engineering Immersive
            Certificate | 2021
          </p>
          <p>
            <strong>Silicon Design Institute</strong> | Mask Design / Layout
            Engineer | 2011-2013
          </p>
          <p>
            <strong>Portland Community College</strong> | Art / Mathematics
            Major | 2009-2011
          </p>
          <p>
            <strong>Cabrillo College</strong> | Art History Major | 2007-2009
          </p>
        </section>

        <footer className="resume-footer">
          <p>* References available upon request.</p>
        </footer>
      </div>
    </div>
  );
};

export default Resume;
