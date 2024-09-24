import "./Resume.css";

const Resume = () => {
  return (
    <div className="resume-container">
      {/* Header Section */}
      <div className="resume-header">
        <h1>Erin Van Brunt</h1>
        <p>
          Eugene, OR | (541) 543-4781 |{" "}
          <a href="mailto:erinmontybruce@gmail.com">erinmontybruce@gmail.com</a>
        </p>
        <p>
          <a
            href="https://www.linkedin.com/in/erin-van-brunt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            LinkedIn
          </a>{" "}
          |
          <a
            href="https://github.com/AlrightErin27"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            GitHub
          </a>{" "}
          |
          <a
            href="https://medium.com/@erinmontybruce"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Medium Blog
          </a>
        </p>
      </div>

      {/* Front-End Developer Section */}
      <div className="section">
        <h2>Front-End Software Developer</h2>
        <p>
          As a versatile "unicorn" blending art and technology, I am a
          Full-Stack Software Engineer specializing in front-end development. I
          excel at creating user-friendly, responsive web applications, focusing
          on performance optimization, modular design, and delivering
          high-quality user experiences. My strong problem-solving skills and
          collaborative mindset consistently bring innovative, visually engaging
          solutions to life.
        </p>
      </div>

      {/* Technical Skills Section */}
      <div className="section">
        <h2>Technical Skills</h2>
        <ul>
          <li>
            <strong>Languages:</strong> Java, JavaScript (ES6+), TypeScript,
            Ruby, Python, HTML5, CSS3, SQL
          </li>
          <li>
            <strong>Frameworks & Libraries:</strong> React.js, Redux, Ruby on
            Rails, Node.js, Next.js, jQuery, Sinatra, MVC Architecture
          </li>
          <li>
            <strong>Databases:</strong> MongoDB, PostgreSQL, MySQL, SQLite
          </li>
          <li>
            <strong>Tools & Platforms:</strong> Git/GitHub, Webpack, Babel,
            VScode, Heroku, Netlify, GCP
          </li>
          <li>
            <strong>APIs & Integration:</strong> RESTful APIs, JSON, JWT, Fetch,
            Axios, GraphQL
          </li>
          <li>
            <strong>Testing/Debugging:</strong> RSpec, Jest, Cypress, ESLint,
            Prettier, Chrome DevTools, TDD/BDD
          </li>
          <li>
            <strong>Design:</strong> Adobe XD, Sketch, Figma, Wireframing,
            Prototyping, Responsive Design, CSS Grids, Flexbox
          </li>
          <li>
            <strong>Methodologies:</strong> OOP, Data Structures, Algorithms,
            Agile/Scrum, Version Control, CI/CD
          </li>
        </ul>
      </div>

      {/* Projects Section */}
      <div className="section">
        <h2>Projects</h2>
        <div className="project-item">
          <h3>Erin's Games Portfolio | August 2024-Ongoing</h3>
          <p>
            Developing interactive games with a focus on state management using
            Redux and responsive design using CSS Grids and Flexbox.
          </p>
          <p>
            <a
              href="https://github.com/AlrightErin27/erinvb-portfolio-2024"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </div>
        <div className="project-item">
          <h3>Jungle Tetris | July 2022</h3>
          <p>
            Created an arcade game using React, Redux, and Custom Hooks,
            implementing dynamic layouts with CSS Grids and integrating state
            management for seamless gameplay.
          </p>
          <p>
            <a
              href="https://github.com/AlrightErin27/erinvb-portfolio/tree/main/src/components/Games/Tetris"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{" "}
            |{" "}
            <a
              href="https://player.vimeo.com/video/741488052"
              target="_blank"
              rel="noopener noreferrer"
            >
              Video Walkthrough
            </a>
          </p>
        </div>
        <div className="project-item">
          <h3>The Castle Shop | January 2022</h3>
          <p>
            Built an e-commerce platform with Ruby on Rails and React,
            integrating complex database relationships with Active Record and
            enhancing the shopping experience with efficient front-end
            components.
          </p>
          <p>
            <a
              href="https://github.com/AlrightErin27/castlesFI"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{" "}
            |{" "}
            <a
              href="https://vimeo.com/741486139"
              target="_blank"
              rel="noopener noreferrer"
            >
              Video Walkthrough
            </a>
          </p>
        </div>
        <div className="project-item">
          <h3>Tic Tac Toe | June 2022</h3>
          <p>
            Developed a React-based single-player game with persistent state
            management using React’s useState and useEffect hooks, and
            implemented responsive UI navigation using React-Router-Dom.
          </p>
          <p>
            <a
              href="https://github.com/AlrightErin27/erinvb-portfolio/tree/main/src/components/Games/TicTacToe"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{" "}
            |{" "}
            <a
              href="https://player.vimeo.com/video/741487103"
              target="_blank"
              rel="noopener noreferrer"
            >
              Video Walkthrough
            </a>
          </p>
        </div>
      </div>

      {/* Professional Experience Section */}
      <div className="section">
        <h2>Professional Experience</h2>
        <div className="experience-item">
          <h3>Restaurant Manager | April 2014 - Present</h3>
          <p>
            Alamo Drafthouse, San Antonio, TX | Persephone, Aptos, CA | Mazzi's,
            Eugene, OR
          </p>
          <p>
            • Led teams of 15+ employees, optimizing operations to increase
            customer satisfaction and drive sales by 20%.
          </p>
          <p>
            • Managed scheduling, inventory, bookkeeping, and social media
            marketing, ensuring compliance with health and safety regulations.
          </p>
        </div>
        <div className="experience-item">
          <h3>Layout Engineer | February 2011 - March 2015</h3>
          <p>Analog Devices, San Jose, CA</p>
          <p>
            • Designed and optimized over 50 analog and digital layouts for ICs
            in mobile devices, including RF, analog, and mixed-signal circuits.
          </p>
          <p>
            • Utilized CAD tools such as Cadence Virtuoso and Mentor Graphics
            for schematic capture and layout design, ensuring precise alignment
            and adherence to design rules.
          </p>
          <p>
            • Conducted DRC and LVS verifications to ensure integrity and
            manufacturability, reducing error rates by 30%.
          </p>
          <p>
            • Implemented advanced layout techniques, driving improvements in
            design efficiency and overall project outcomes.
          </p>
        </div>
      </div>

      {/* Education Section */}
      <div className="section">
        <h2>Education</h2>
        <p>
          <strong>Flatiron School</strong> | Online | Full-Stack Software
          Engineering | 2022
        </p>
        <p>
          • Intensive 15-week bootcamp focusing on full-stack web development,
          including JavaScript, React.js, Ruby on Rails, and Python.
        </p>
        <p>
          <strong>General Assembly</strong> | Online | Software Engineering
          Immersive | 2021
        </p>
        <p>
          • Comprehensive program covering key programming languages,
          Agile/Scrum, and full-stack development.
        </p>
        <p>
          <strong>Arizona State University</strong> | Online | Principles of
          Programming with Java | 2023
        </p>
        <p>
          • Focused on OOP, data structures, algorithms, and Java fundamentals.
        </p>
        <p>
          <strong>Silicon Design Institute</strong> | Santa Clara, CA | Mask
          Design / Layout Engineer | 2011-2013
        </p>
        <p>
          <strong>Portland Community College</strong> | Portland, OR | 2009-2011
        </p>
        <p>
          <strong>Cabrillo College</strong> | Aptos, CA | 2007-2009
        </p>
        <p>
          <strong>Harbor High School</strong> | Santa Cruz, CA | Class of 2007
        </p>
      </div>

      {/* Refs Section */}
      <div className="section">
        <p>* References available upon request.</p>
      </div>
    </div>
  );
};

export default Resume;
