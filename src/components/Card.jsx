import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Card = ({ Style, text , logo , gl }) => {
  const [activeImage, setActiveImage] = useState("glowing");

  useEffect(() => {
    Aos.init();

    // Set up an interval to switch between images every second
    const interval = setInterval(() => {
    setActiveImage((prev) => (prev === "glowing" ? "glowed" : "glowing"));
    }, 1500);
    
    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card" data-aos="zoom-in" data-aos-duration="3000">
      <div className="imgBx">
        <img src={Style} alt="hoodie" className="card-img" />
        <img src={logo} alt="logo" className={`glowing-img ${activeImage === "glowing" ? "active" : ""}`} />
        <img src={gl} alt="logo glowing" className={`glowed-img ${activeImage === "glowed" ? "active" : ""}`} />
      </div>
      <div className="contentBx">
        <h2>Luv {text}</h2>
        <div className="size">
          <h3>Size : </h3>
          <span>S</span>
          <span>L</span>
          <span>2XL</span>
        </div>
        <a href="#product">Buy Now</a>
      </div>
    </div>
  );
};

export default Card;
