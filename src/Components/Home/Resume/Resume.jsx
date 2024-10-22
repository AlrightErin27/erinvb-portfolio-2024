import { useEffect } from "react";
import "./Resume.css";
import Icon from "../../../Images/Home/Icons/download.png";
import PDF from "../../../Images/Home/Resume/SoftwareResumeOct2024.pdf";

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

  //download resume
  const downloadFile = () => {
    const el = document.createElement("a");
    el.href = PDF;
    el.download = "ErinVanBruntSoftwareDevResume.pdf";
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
            front-end development. Skilled in creating user-friendly, responsive
            web applications and interactive games. Combines technical expertise
            with artistic sensibility to deliver high-quality, intuitive user
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
              <strong>Web Technologies & API Integration:</strong> RESTful API
              Design, Server-Side Rendering, JWT, OAuth, bcrypt, Axios, Fetch
              API, Web Audio API, HTML5 Canvas, Custom React Hooks, Algorithms
            </li>
            <li>
              <strong>Development Tools & Practices:</strong> Git, GitHub,
              VSCode, npm, Heroku, Netlify, Agile, Scrum, TDD/BDD, RSpec,
              Responsive Design, Cross-Browser Compatibility, Mobile-First
              Development, Component-based Architecture, Collision Detection
              (AABB)
            </li>
            <li>
              <strong>UI/UX & Design:</strong> CSS Grid, Flexbox, Media Queries,
              CSS Keyframes, CSS Animations, Wireframing, Pixel Art Design
            </li>
            <li>
              <strong>IC Design Tools:</strong> Cadence Virtuoso IC6.1
            </li>
          </ul>
        </section>

        <section className="resume-section">
          <h2>Projects</h2>
          <div className="project-item">
            <h3>Full-Stack E-Commerce Platform: Evie & Co.</h3>
            <p>
              Developed a comprehensive e-commerce solution using React.js for
              the frontend and Node.js with Express.js for the backend,
              integrated with MongoDB. Implemented secure user authentication
              with JWT and bcrypt, along with a robust shopping cart system and
              intuitive product browsing experience. Utilized React Hooks for
              efficient state management and implemented RESTful API design
              principles.
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
            <h3>Cemetery Run: Retro-Inspired Arcade Game</h3>
            <p>
              Engineered an engaging endless runner game using React.js and
              HTML5 Canvas, featuring custom pixel art and retro-style graphics.
              Implemented complex game mechanics, including collision detection,
              dynamic difficulty scaling, and custom controls for both desktop
              and mobile. Utilized requestAnimationFrame for smooth animations
              and game loop management. Integrated Web Audio API for immersive
              sound effects and background music, with user-controlled audio
              settings.
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
            <h3>Interactive Crossword Puzzle</h3>
            <p>
              Designed and developed a React-based crossword puzzle game with
              advanced state management and custom keyboard navigation.
              Implemented a sophisticated grid generation algorithm and
              intricate word highlighting system. Created a responsive design
              using CSS Flexbox and media queries for seamless play across
              various devices.
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
            <h3>Dynamic Blog Content Integration</h3>
            <p>
              Developed a React-based platform that dynamically fetches and
              displays blog posts from Medium using Axios and the RSS2JSON API.
              Implemented error handling and loading states to ensure a smooth
              user experience. Designed a unique 80's sci-fi inspired interface
              with custom CSS animations and transitions, fully responsive
              across all devices.
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
            <p>
              Alamo Drafthouse, San Antonio, TX | Persephone, Aptos, CA |
              Mazzi's, Eugene, OR
            </p>
            <p>
              Led teams of 15+ employees, driving a 20% increase in sales
              through optimizing operations, improving workflows, and refining
              inventory management. Developed data-driven strategies to enhance
              operational efficiency and ensure smooth day-to-day functions.
              Managed key areas including scheduling, staffing, inventory,
              bookkeeping, and social media marketing, while ensuring compliance
              with health and safety regulations. Strong focus on team
              leadership, communication, and problem-solving, which resulted in
              improved team productivity and customer satisfaction. This role
              required a high level of adaptability, attention to detail, and a
              solution-oriented mindset, skills that are valuable in any
              professional environment.
            </p>
          </div>

          <div className="experience-item">
            <h3>Layout Engineer | February 2011 - March 2015</h3>
            <p>Analog Devices, San Jose, CA</p>
            <p>
              Designed and optimized over 50 analog and digital layouts for ICs
              in mobile devices using Cadence Virtuoso IC6.1. Utilized Cadence
              tools for schematic capture, layout design, and simulation,
              ensuring precise alignment and adherence to design rules.
              Conducted DRC and LVS verifications using Cadence Assura, reducing
              error rates. Collaborated with cross-functional teams to optimize
              circuit performance and layout efficiency.
            </p>
          </div>
        </section>

        <section className="resume-section">
          <h2>Education</h2>
          <p>
            <strong>Arizona State University</strong> | Principles of
            Programming with Java | 2023
          </p>
          <p>
            <strong>Flatiron School</strong> | Full-Stack Software Engineering |
            2022
          </p>
          <p>
            <strong>General Assembly</strong> | Software Engineering Immersive |
            2021
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
