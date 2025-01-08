import React from "react";
import { Link } from "react-router-dom";

const Icon = ({ website }) => {
  const downloadFile = () => {
    const el = document.createElement("a");
    el.href = website.pdf;
    el.download = "ErinVanBruntSoftwareDevResume.pdf";
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  };

  return (
    <>
      {!website.pdf && !website.url ? (
        <Link className="Icon" to="mailto:erinmontybruce@gmail.com">
          <div
            className="icon-img"
            style={{ backgroundImage: `url(${website.img})` }}
          />
          <span className="icon-name">erinmontybruce{<br />}@gmail.com</span>
        </Link>
      ) : (
        <Link
          className="Icon"
          to={website.url}
          target={!website.pdf || website.url === "/resume" ? `_blank` : null}
          onClick={website.pdf ? downloadFile : null}
          rel="noopener noreferrer"
        >
          <div
            className="icon-img"
            style={{ backgroundImage: `url(${website.img})` }}
          />
          <span className="icon-name">{website.name}</span>
        </Link>
      )}
    </>
  );
};

export default Icon;
