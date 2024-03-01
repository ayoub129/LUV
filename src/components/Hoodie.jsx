import React, {  useCallback, useState } from "react";
import PayPalButton from "./PaypalButton";
import { Canvas, useLoader } from "react-three-fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { TextureLoader } from "three";

const WebgiViewer = () => {
  const [scene, setScene] = useState(null);
  const [activeWebGi, setActiveWebGi] = useState(false);

  const { scene: scene1, materials } = useGLTF("/black.glb");
  // console.log(materials);

  const blackTexture = useLoader(TextureLoader, `/black.png`);



  const myTextures = {
    black: blackTexture,
  };
  // console.log(materials?.Black);
  const updateScene = async (scene) => {
    setScene(myTextures?.[scene]);
  };

  if (materials?.Black?.map) {
    materials.Black.map = scene ? scene : materials.Black.map;
    materials.Black.map.colorSpace = "srgb";
    materials.Black.map.flipY = false;
  }

  return (
    <div className="interact" id="product">
        <Canvas>
          <primitive object={scene1} />
          <ambientLight intensity={1} />
          <Environment files={'/gem_2.hdr'} />

          <OrbitControls />
        </Canvas>
          <p>
            Interact with your hoodie <i className="fa-regular fa-hand"></i>
          </p>
    </div>
  );
};

export default WebgiViewer;
