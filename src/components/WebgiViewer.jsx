import React, { useRef, useCallback, useEffect, useState, lazy, Suspense } from "react";
import { isMobile } from 'react-device-detect';
import { ViewerApp, AssetManagerPlugin, addBasePlugins, CanvasSnipperPlugin } from "webgi";
import gsap from "gsap";
import PayPalButton from "./PaypalButton";
import WhiteGlowLogo from "../assets/images/white-glow.png";
import BlackGlowLogo from "../assets/images/black-glow.png";

const LazyModelLoader = lazy(() => import('./LazyModelLoader'));


const WebgiViewer = () => {
  const [scene, setScene] = useState("wine.glb");
  const [size, setSize] = useState("S");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [logoglow, setLogoglow] = useState(WhiteGlowLogo);
  const [activeWebGi, setActiveWebGi] = useState(false);
  const canvasRef = useRef(null);
  const viewerRef = useRef(null);
  const [loading, setLoading] = useState(true);

    const handlePaymentSuccess = async (details) => {
    const sceneNameWithoutExtension = scene.split(".")[0];

    try {
      const response = await fetch('https://luvofficial.vercel.app/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sceneNameWithoutExtension, size, details }),
      });

      const result = await response.json();
      setSuccess("Payment placed successfully. We will ship your hoodie soon.");
    } catch (error) {
      console.error('Error calling serverless function:', error);
    }
  };

  const handlePaymentError = () => {
    setError("Payment Error: Your payment was canceled, Please Try Again Later.");
  };


  const showGlowedLogo = useCallback(() => {
    setActiveWebGi(true);
    setLogoglow(scene === "abrico.glb" ? BlackGlowLogo : WhiteGlowLogo);
  }, [scene]);

  const updateScene = async (scene) => {
    setActiveWebGi(false);
    setScene(scene);
  };
  

  const setupViewer = useCallback(async (sceneToLoad, canvasSize) => {
    try {
      setLoading(true);

      if (viewerRef.current) {
        viewerRef.current.dispose();
      }

      const viewer = new ViewerApp({
        canvas: canvasRef.current,
        canvasSize: canvasSize || { width: window.innerWidth, height: window.innerHeight },
        antialias: isMobile ? false : true,
        shadows: isMobile ? false : true,
        precision: isMobile ? 'lowp' : 'mediump',
        gammaOutput: isMobile ? false : true,
      });

      const manager = await viewer.addPlugin(AssetManagerPlugin);
      await addBasePlugins(viewer);
      await viewer.addPlugin(CanvasSnipperPlugin);
      viewer.renderer.refreshPipeline();

      // Use dynamic loading if a specific scene is provided
      if (sceneToLoad) {
        await manager.addFromPath(sceneToLoad);
      }

      viewerRef.current = viewer;
      setLoading(false);
    } catch (error) {
      console.error('Error setting up viewer:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('Loading gsap...');
    import("gsap").then((gsap) => {
      console.log('gsap loaded. Setting up camera animation...');
      gsap.to(viewerRef.current.cameraController, {
        duration: 5,
        rotation: { y: "+=30" },
        repeat: -1,
        ease: "linear",
      });
    }).catch((error) => {
      console.error('Error loading gsap:', error);
    });
  }, [viewerRef]);

  useEffect(() => {
    console.log('Setting up initial viewer...');
    setupViewer(scene, { width: 800, height: 600 }); // Set initial canvas size
  }, [scene, setupViewer]);
  
  useEffect(() => {
    const handleResize = () => {
      const newSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
  
      // Adjust canvas size when the window is resized
      setupViewer(scene, newSize);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [scene, setupViewer]);
  
  useEffect(() => {
    return () => {
      if (viewerRef.current) {
        viewerRef.current.dispose();
      }
    };
  }, [scene]);


  return (
    <div className="product-card" id="product" >
            <Suspense fallback={<div>Loading...</div>}>
              <LazyModelLoader
                scene={scene}
                canvasRef={canvasRef}
                viewerRef={viewerRef}
                loading={loading}
                setLoading={setLoading}
                updateScene={updateScene}
                setupViewer={setupViewer}
              />
            </Suspense>

      <div id="webgi-canvas-container" className={`${activeWebGi ? 'active' : ''}`}>
        <canvas id="webgi-canvas" ref={canvasRef} />
        <img src={logoglow} alt="logo glowing" />
        {loading ? <p>Loading Your Hoodie ... </p> : <p>Interact with your hoodie <i className="fa-regular fa-hand"></i></p>}
        <div className="btn-container">
          <button onClick={showGlowedLogo} className="btn">
            See It In Dark
          </button>
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
