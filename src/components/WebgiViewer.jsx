import React, { useState } from "react";
import PayPalButton from "./PaypalButton";
import BlackImage from "../assets/images/style-3.png";
import WhiteImage from "../assets/images/style-1.png";
import WineImage from "../assets/images/style-2.png";
import ShirtWhite from "../assets/images/style-4.png";
import ShirtBlack from "../assets/images/style-5.png";

const WebgiViewer = () => {
  const [size, setSize] = useState("S");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [scene, setScene] = useState(BlackImage);
  const [type, setType] = useState("hoodie");

  const handlePaymentSuccess = async (details) => {
    const sceneNameWithoutExtension = scene.split(".")[0];

    try {
      const response = await fetch(
        "https://luvofficial.vercel.app/api/sendEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sceneNameWithoutExtension, size, details }),
        }
      );

      const result = await response.json();
      setSuccess("Payment placed successfully. We will ship your hoodie soon.");
    } catch (error) {
      console.error("Error calling serverless function:", error);
    }
  };

  const handlePaymentError = () => {
    setError(
      "Payment Error: Your payment was canceled, Please Try Again Later."
    );
  };

  const updateScene = (scene) => {
    setScene(scene);
  };
  
  const updateType = (type) => {
    setType(type)
    setScene(type == "hoodie" ? BlackImage : ShirtBlack)
  }

  return (
    <div className="product-card" id="product">
      <div id="webgi-canvas-container">
        <img src={scene} alt="Hoodie" className={
          scene === "/src/assets/images/style-3.png" ? "black" : scene === "/src/assets/images/style-2.png" ? "wine" : scene === "/src/assets/images/style-4.png" ? "white_shirt" : scene === "/src/assets/images/style-5.png" ? "black_shirt" : "white"
        } />
      </div>

      <div className="product-style">
        <div className="product-head">
          <h3>Luv {type === "hoodie" ? "Hoodie" : "T-shirt"}</h3>
          <h3>{type === "hoodie" ? "65$" : "50$"}</h3>
        </div>
        <p className="variant">Type</p>
        <ul className="types">
          <button onClick={() => updateType('hoodie')} className="type_btn">Hoodie</button>
          <button onClick={() => updateType('shirt')} className="type_btn">Shirt</button>
        </ul>
        <p className="variant">COLOR</p>
        <ul className="colors">
          <li onClick={() => updateScene(type === "hoodie" ? BlackImage : ShirtBlack)} className="black"></li>
          <li onClick={() => updateScene(type === "hoodie" ? WhiteImage : ShirtWhite)} className="white"></li>
          {
            type === "hoodie" &&   <li onClick={() => updateScene(WineImage)} className="red"></li>
          }
        </ul>
        <p className="variant"> SIZE</p>
        <ul className="sizes">
          <li onClick={() => setSize("S")} className={size === "S" ? "active" : ""}>S</li>
          <li onClick={() => setSize("L")} className={size === "L" ? "active" : ""}>L</li>
          <li onClick={() => setSize("XL")} className={size === "XL" ? "active" : ""}>XL</li>
        </ul>
        <PayPalButton price={type === "hoodie" ? "65" : "50"} onSuccess={handlePaymentSuccess} onError={handlePaymentError} />
        <p className="text-danger">{error && error}</p>
        <p className="text-success">{success && success}</p>
      </div>
    </div>
  );
};

export default WebgiViewer;
