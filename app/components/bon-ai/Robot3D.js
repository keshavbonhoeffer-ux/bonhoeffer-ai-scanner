"use client";

import { Canvas } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function Robot() {
  const { scene } = useGLTF("/models/robot.glb");

  return (
    <primitive
      object={scene}
      scale={2}
      position={[0, -1, 0]}
      rotation={[0, 0.4, 0]}
    />
  );
}

export default function Robot3D() {
  return (
    <div
      style={{
        width: "420px",
        height: "420px",
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 45,
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={3} />

          <directionalLight
            position={[5, 5, 5]}
            intensity={4}
          />

          <pointLight
            position={[-5, 5, 5]}
            intensity={3}
          />

          <Float
            speed={2}
            rotationIntensity={0.2}
            floatIntensity={1.5}
          >
            <Robot />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/robot.glb");