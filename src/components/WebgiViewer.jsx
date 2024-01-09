import React, {  useCallback, useState } from "react";
import PayPalButton from "./PaypalButton";
import WhiteGlowLogo from "../assets/images/white-glow.png";
import BlackGlowLogo from "../assets/images/black-glow.png";
import { Canvas, useLoader } from "react-three-fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { TextureLoader } from "three";

const WebgiViewer = (setLoading) => {
  const [scene, setScene] = useState(null);
  const [size, setSize] = useState("S");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [logoglow, setLogoglow] = useState(WhiteGlowLogo);
  const [activeWebGi, setActiveWebGi] = useState(false);

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

  // const updateScene = async (scene) => {
  //   // setActiveWebGi(false);
  //   // setScene(scene);
  // };

  // const setupViewer = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     if (viewerRef.current) {
  //       viewerRef.current.dispose();
  //     }

  //     const viewer = new ViewerApp({
  //       canvas: canvasRef.current,
  //     });

  //     const manager = await viewer.addPlugin(AssetManagerPlugin);
  //     await addBasePlugins(viewer);
  //     await viewer.addPlugin(CanvasSnipperPlugin);

  //     const dracoLoader = new DRACOLoader();
  //     dracoLoader.setDecoderPath(
  //       "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
  //     ); // Specify the path to the Draco decoder

  //     const gltfLoader = new GLTFLoader();
  //     gltfLoader.setDRACOLoader(dracoLoader);

  //     viewer.renderer.refreshPipeline();

  //     await manager.addFromPath("wine.glb", gltfLoader); // Pass the GLTFLoader to AssetManagerPlugin

  //     gsap.to(viewer.cameraController, {
  //       duration: 5,
  //       rotation: { y: "+=30" },
  //       repeat: -1,
  //       ease: "linear",
  //     });

  //     viewerRef.current = viewer;
  //     setLoading(false); // Set loading to false once the viewer is set up
  //   } catch (error) {
  //     console.error("Error setting up viewer:", error);
  //     setLoading(false); // Set loading to false in case of an error
  //   }
  // }, []);

  // useEffect(() => {
  //   setupViewer();
  // }, [setupViewer]);

  // useEffect(() => {
  //   // Cleanup function when the component is unmounted or when scene changes
  //   return () => {
  //     if (viewerRef.current) {
  //       viewerRef.current.dispose();
  //     }
  //   };
  // }, [scene]);

  const { scene: scene1, materials } = useGLTF("/wine.glb");
  // console.log(materials);

  const abricoTexture = useLoader(TextureLoader, `/abrico.png`);
  const blackTexture = useLoader(TextureLoader, `/black.png`);
  const wineTexture = useLoader(TextureLoader, `/wine.png`);

  const myTextures = {
    abrico: abricoTexture,
    black: blackTexture,
    wine: wineTexture,
  };
  // console.log(materials?.Black);
  const updateScene = async (scene) => {
    setLoading(true)
    setScene(myTextures?.[scene]);
    setLoading(false)
  };

  if (materials?.Black?.map) {
    // console.log(JSON.stringify(materials.Black.map));
    materials.Black.map = scene ? scene : materials.Black.map;
    materials.Black.map.colorSpace = "srgb";
    materials.Black.map.flipY = false;
  }
  return (
    <div className="product-card" id="product">
      <div
        id="webgi-canvas-container"
        className={`${activeWebGi ? "active" : ""}`}
      >
        <Canvas>
          <primitive object={scene1} />
          <ambientLight intensity={1} />
          <Environment files={'/gem_2.hdr'} />

          <OrbitControls />
        </Canvas>
        <img src={logoglow} alt="logo glowing" />
          <p>
            Interact with your hoodie <i className="fa-regular fa-hand"></i>
          </p>
      </div>

      <div className="product-style">
        <div className="product-head">
          <h3>Luv Hoodie</h3>
          <h3>$65</h3>
        </div>

        <p className="variant">COLOR</p>
        <ul className="colors">
          <li
            onClick={() => updateScene("black")}
            className={`black ${scene === "black" ? "active" : ""}`}
          ></li>
          <li
            onClick={() => updateScene("abrico")}
            className={`white ${scene === "abrico" ? "active" : ""}`}
          ></li>
          <li
            onClick={() => updateScene("wine")}
            className={`red ${scene === "wine" ? "active" : ""}`}
          ></li>
        </ul>
        <p className="variant"> SIZE</p>
        <ul className="sizes">
          <li
            onClick={() => setSize("S")}
            className={`${size === "S" ? "active" : ""}`}
          >
            S
          </li>
          <li
            onClick={() => setSize("L")}
            className={`${size === "L" ? "active" : ""}`}
          >
            L
          </li>
          <li
            onClick={() => setSize("XL")}
            className={`${size === "XL" ? "active" : ""}`}
          >
            XL
          </li>
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
