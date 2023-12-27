import React, { useEffect, useRef } from "react";
import { ViewerApp, AssetManagerPlugin, addBasePlugins, CanvasSnipperPlugin } from "webgi";
import gsap from "gsap";

const WebgiModel = ({ scene }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const setupViewer = async () => {
      const viewer = new ViewerApp({
        canvas: canvasRef.current,
      });

      const manager = await viewer.addPlugin(AssetManagerPlugin);
      await addBasePlugins(viewer);
      await viewer.addPlugin(CanvasSnipperPlugin);
      viewer.renderer.refreshPipeline();

      await manager.addFromPath(scene);

      gsap.to(viewer.cameraController, {
        duration: 5,
        rotation: { y: "+=30" },
        repeat: -1,
        ease: "linear",
      });
    };

    setupViewer();
  }, [scene]);

  return <canvas id="webgi-canvas" ref={canvasRef} />;
};

export default WebgiModel;
