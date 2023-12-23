import React from "react";
import Logo from "../assets/images/logo.jpeg";

const Header = () => {
  return (
    <div className="text-center ">
        <a className="logo-link " href="index.html">
          <div className="d-flex flex-center">
            <h1 className="logo-text">Luv</h1>
            <div className="w-150">
              <img src={Logo} alt="logo" className="img-fluid" />
            </div>
          </div>
        </a>
      </div>
  );
};

export default Header;
