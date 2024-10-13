import React from "react";
import "./Home.css";
import Icon from "./Icon";
import IntroImg from "../../Images/Home/Resume/hello.png";
import ResumePDF from "../../Images/Home/Resume/ErinVanBruntResumeAug2024.pdf";
import ResumeIcon from "../../Images/Home/Icons/resumeicon.png";
import DownLoadIcon from "../../Images/Home/Icons/download.png";
import VideoIcon from "../../Images/Home/Icons/video.png";
import LinkedinIcon from "../../Images/Home/Icons/linkedin.png";
import GithubIcon from "../../Images/Home/Icons/github.png";
import MediumIcon from "../../Images/Home/Icons/medium.png";
import EmailIcon from "../../Images/Home/Icons/email.png";

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
      name: "project videos",
      url: "/project-videos",
      img: VideoIcon,
      pdf: null,
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
    {
      name: "email",
      url: null,
      img: EmailIcon,
      pdf: null,
    },
  ];

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="grid-overlay">
          <img src={IntroImg} alt="intro" />
          <div className="icons-cont">
            {websites.map((website, idx) => (
              <Icon website={website} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
