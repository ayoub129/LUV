import React, { useRef, useCallback, useEffect, useState } from "react";
import {
  ViewerApp,
  AssetManagerPlugin,
  addBasePlugins,
  CanvasSnipperPlugin,
} from "webgi";
import gsap from "gsap";
import PayPalButton from "./PaypalButton";
import Aos from "aos";
import "aos/dist/aos.css";
import WhiteGlowLogo from "../assets/images/white-glow.png"
import BlackGlowLogo from "../assets/images/black-glow.png"


const WebgiViewer = () => {

  const [scene , setScene] = useState("wine.glb")
  const [size , setSize] = useState("S")
  const [error , setError] = useState("")
  const [success , setSuccess] = useState("")
  const [logoglow , setLogoglow] = useState(WhiteGlowLogo)

  const [activeWebGi , setActiveWebGi] = useState(false)

  const showGlowedLogo = () => {
    setActiveWebGi(true)
    if(scene === "abrico.glb") {
      setLogoglow(BlackGlowLogo)
    } else {
      setLogoglow(WhiteGlowLogo)
    }
  }


  const updateScene = (scene) => {
     setActiveWebGi(false)
      setScene(scene)
      console.log(scene)
  }
  
  const handlePaymentSuccess = async (details) => {
    const sceneNameWithoutExtension = scene.split(".")[0];
    
    try {
      const response = await fetch('https://luvofficial.vercel.app/api/sendEmail', {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sceneNameWithoutExtension, size , details }),
      });

      console.log({sceneNameWithoutExtension, size , details})
      const result = await response.json();
      setSuccess("Payment placed successfully. We will ship your hoodie soon.")
    } catch (error) {
      console.error('Error calling serverless function:', error);
    }
    };
  
  const handlePaymentError = () => {
    setError("Payment Error: Your payment was canceled, Please Try Again Later.");
  };
  const canvasRef = useRef(null);

  const setupViewer = useCallback(async () => {
    // Initialize the viewer
    const viewer = new ViewerApp({
      canvas: canvasRef.current,
    });

    // Add some plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin);

    // or use this to add all main ones at once.
    await addBasePlugins(viewer);

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    await viewer.addPlugin(CanvasSnipperPlugin);


    // This must be called once after all plugins are added.
    viewer.renderer.refreshPipeline();


    // Import and add a GLB file.
    await manager.addFromPath(scene);


      // Slow down the rotation animation
    gsap.to(viewer.cameraController, {
      duration: 5,
      rotation: { y: "+=30" },
      repeat: -1,
      ease: "linear",
    });
  }, [scene]);

  useEffect(() => {
    setupViewer();
    Aos.init();
  }, [setupViewer]);

  return (
    <div
      className="product-card"
      id="product"
      data-aos="zoom-in"
      data-aos-duration="3000"
    >
      <div id="webgi-canvas-container" className={`${activeWebGi ? 'active' : '' }`}>
        <button onClick={() => handlePaymentSuccess('test')}>save</button>
        <canvas id="webgi-canvas" ref={canvasRef} />
        <img src={logoglow} alt="logo glowing"  />
        <p> Interact with your hoodie <i className="fa-regular fa-hand"></i></p>
        <div className="btn-container">
          <button onClick={showGlowedLogo} className="btn">See It In Dark</button>
        </div>
      </div>
      <div className="product-style">
        <div className="product-head">
          <h3>Luv Hoodie</h3>
          <h3>$65</h3>
        </div>

        <p className="variant">COLOR</p>
        <ul className="colors">
          <li onClick={() => updateScene("black.glb")} className={`black ${scene === "black.glb" ? 'active' : ''}`}></li>
          <li onClick={() => updateScene("abrico.glb")} className={`white ${scene === "abrico.glb" ? 'active' : ''}`}></li>
          <li onClick={() => updateScene("wine.glb")} className={`red ${scene === "wine.glb" ? 'active' : ''}`}></li>
        </ul>
        <p className="variant"> SIZE</p>
        <ul className="sizes">
          <li onClick={() => setSize("S")} className={`${size === "S" ? 'active' : ''}`}>S</li>
          <li onClick={() => setSize("L")} className={`${size === "L" ? 'active' : ''}`}>L</li>
          <li onClick={() => setSize("XL")} className={`${size === "XL" ? 'active' : ''}`}>XL</li>
        </ul>
        <PayPalButton
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
        <p className="text-danger">{error && error}</p>
        <p className="text-success">{success && success}</p>
      </div>
    </div>
  );
};

export default WebgiViewer;
