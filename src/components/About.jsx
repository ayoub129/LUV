import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import WebgiViewer from "./WebgiViewer";

const About = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="about-container">
      <div
        className="about-text"
        data-aos="fade-right"
        data-aos-duration="3000"
      >
        <h2 className="title">Our Story</h2>
        <p className="phrase italicized">
          For those who’ve triumphed from pain beyond the ordinary. -For those who embraces resilience when life gets hard and painful…Luv is more then a brand,its a badge of Triumph… with Luv
        </p>
      </div>
      <div
        className="about-image"
        data-aos="fade-left"
        data-aos-duration="3000"
      >
        <WebgiViewer />
      </div>
    </div>
  );
};

export default About;
