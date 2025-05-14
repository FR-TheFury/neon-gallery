
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Suspense } from "react";

// Create a separate component for the Three.js scene
const ParticleScene = () => {
  return (
    <>
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0.5} 
        fade 
        speed={1} 
        color="#9b87f5" 
      />
      <ambientLight intensity={0.5} />
    </>
  );
};

// Main ThreeBackground component
const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleScene />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default ThreeBackground;
