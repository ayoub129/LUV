import React, { useEffect } from "react";
import WebgiViewer from "./WebgiViewer";

const About = () => {

  return (
    <div className="about-container">
      <div
        className="about-text"
      >
        <h2 className="title">Our Story</h2>
        <p className="phrase italicized">
          For those who’ve triumphed from pain beyond the ordinary. -For those who embraces resilience when life gets hard and painful…Luv is more then a brand,its a badge of Triumph… with Luv
        </p>
      </div>
      <div
        className="about-image"
      >
        <WebgiViewer />
      </div>
    </div>
  );
};

export default About;
