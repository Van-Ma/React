import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

function BlenderModel() {
  const { scene } = useGLTF("models/frog.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.side = THREE.DoubleSide;
      }
    });
  }, [scene]);

  return (
    <div className="model-container">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={8} />
        <directionalLight position={[5, 5, -10]} intensity={3} />
        <pointLight position={[0, 3, 0]} intensity={1.5} />
        <primitive object={scene} scale={0.5} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default BlenderModel;
