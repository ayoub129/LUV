import React from "react";
import StyleOne from "../assets/images/style-rm-1.png";
import StyleTwo from "../assets/images/style-rm-2.png";
import StyleThree from "../assets/images/style-rm-3.png";
import WhiteLogo from "../assets/images/white-logo.png"
import WhiteGlowLogo from "../assets/images/white-glow.png"
import BlackGlowLogo from "../assets/images/black-glow.png"
import BlackLogo from "../assets/images/black-logo.png"
import Card from "./Card";
import Header from "./Header";

const Jumbotron = () => {
  return (
    <div className="jumbotron-section wrapper">
      <div className="desc">
      The Hoodie That <h2 className="title glow"> Glows </h2> In The Dark
      </div>
      <Header />
      <div className="card-container">
        <Card Style={StyleOne} text={"Abricot"} gl={BlackGlowLogo} logo={BlackLogo}></Card>
        <Card Style={StyleTwo} text={"Wine"} gl={WhiteGlowLogo} logo={WhiteLogo} ></Card>
        <Card Style={StyleThree} text={"Black"} gl={WhiteGlowLogo} logo={WhiteLogo} ></Card>
      </div>
      <strong className="history">This represents the person who has been through a lot, had their soul/heart hurt, and still stands strong.</strong>
    </div>
  );
};

export default Jumbotron;
