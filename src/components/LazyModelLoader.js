import React, { useEffect } from 'react';

const LazyModelLoader = ({
  scene,
  canvasRef,
  viewerRef,
  loading,
  setLoading,
  updateScene,
  setupViewer,
}) => {
  useEffect(() => {
    const loadModel = async () => {
      await setupViewer(scene);
      setLoading(false);
    };

    if (!loading) {
      loadModel();
    }
  }, [scene, setupViewer, loading, setLoading]);

  return null;
};

export default LazyModelLoader;
