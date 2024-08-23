import "./Home.css";

import Icon from "./Icon";
import ResumePDF from "../../Images/Resume/ErinVanBruntResumeAug2024.pdf";
import ResumeIcon from "../../Images/Icons/resumeicon.png";
import DownLoadIcon from "../../Images/Icons/download.png";
import LinkedinIcon from "../../Images/Icons/linkedin.png";
import GithubIcon from "../../Images/Icons/github.png";
import MediumIcon from "../../Images/Icons/medium.png";

const Home = () => {
  const websites = [
    {
      name: "resume",
      url: "/resume",
      img: ResumeIcon,
      pdf: null,
    },
    {
      name: "resume pdf",
      url: null,
      img: DownLoadIcon,
      pdf: ResumePDF,
    },
    {
      name: "linkedin",
      url: "https://www.linkedin.com/in/erin-van-brunt/",
      img: LinkedinIcon,
      pdf: null,
    },
    {
      name: "github",
      url: "https://github.com/AlrightErin27",
      img: GithubIcon,
      pdf: null,
    },
    {
      name: "medium blog",
      url: "https://medium.com/@erinmontybruce",
      img: MediumIcon,
      pdf: null,
    },
  ];
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Home Page</h1>
        <p>TEXT</p>
        {websites.map((website, idx) => {
          return <Icon website={website} key={idx} />;
        })}
      </div>
    </div>
  );
};

export default Home;
