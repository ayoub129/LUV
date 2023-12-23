import React from "react";
import Logo from "../assets/images/logo.jpeg";

const Footer = () => {
  return (
    <div className="text-center mt-12">
      <div className="text-center">
        <a className="logo-link" href="#">
          <div className="d-flex flex-center">
            <h1 className="logo-text">Luv</h1>
            <div className="w-150">
              <img src={Logo} alt="logo" className="img-fluid" />
            </div>
          </div>
        </a>
      </div>
      <p>Stay connected</p>
      <div className="media">
        <a href="https://www.instagram.com/luv.official2024?igshid=OGQ5ZDc2ODk2ZA==" className="box-round">
          <i className="fa-brands fa-instagram "></i>
        </a>
        <a href="https://www.tiktok.com/@glowinghoodie?_t=8iHzNNVrDoD&_r=1" className="box-round">
          <i className="fa-brands fa-tiktok "></i>
        </a>
      </div>
      <div className="copyright">© Luv. All rights reserved. </div>
    </div>
  );
};

export default Footer;
