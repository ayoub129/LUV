import React, { useState } from "react";
import { Canvas, useLoader } from "react-three-fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { TextureLoader } from "three";

const WebgiViewer = () => {
  const [texture, setTexture] = useState(null);

  // Load the GLTF model
  const { scene: hoodieScene, materials } = useGLTF("/black.glb");

  // Load the texture
  const blackTexture = useLoader(TextureLoader, "/black.png");

  // Set the texture in the state
  useState(() => {
    setTexture(blackTexture);
  }, [blackTexture]);

  // Update the material when the texture is loaded
  if (materials?.Black?.map && texture) {
    materials.Black.map = texture;
    materials.Black.map.encoding = 3000; // sRGBEncoding
    materials.Black.map.flipY = false;
    materials.Black.needsUpdate = true;
  }

  return (
    <div className="interact" id="product">
      <Canvas>
        <primitive object={hoodieScene} />
        <ambientLight intensity={1} />
        <Environment files={"/gem_2.hdr"} />
        <OrbitControls />
      </Canvas>
      <p>
        Interact with your hoodie <i className="fa-regular fa-hand"></i>
      </p>
    </div>
  );
};

export default WebgiViewer;
