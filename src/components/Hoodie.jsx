import React, { useCallback, useState, useEffect, Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { TextureLoader } from "three";

const Hoodie = () => {
  const [scene, setScene] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load textures asynchronously
  const loadTextures = useCallback(async () => {
    const blackTexture = await new TextureLoader().loadAsync(`/black.png`);
    setScene(blackTexture);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    loadTextures();
  }, [loadTextures]);

  return (
    <div className="interact" id="product">
      <Canvas>
        <Suspense fallback={null}>
          <ModelWithScene scene={scene} />
        </Suspense>
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

const ModelWithScene = ({ scene }) => {
  const { scene: modelScene } = useGLTF("/black.glb");

  useEffect(() => {
    if (modelScene && scene) {
      modelScene.traverse((child) => {
        if (child.isMesh) {
          child.material.map = scene;
          child.material.map.colorSpace = "srgb";
          child.material.map.flipY = false;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [modelScene, scene]);

  return null;
};

export default Hoodie;
