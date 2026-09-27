"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import type { Group } from "three";

function LogoModel() {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF("/3d/logo-3d.glb");

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.3} position={[0, -1.3, 0]} />
    </group>
  );
}

// Preload the model
useGLTF.preload("/3d/logo-3d.glb");

export default function Logo3D() {
  return (
    <div className="w-full h-full overflow-visible min-h-100 lg:min-h-125 relative">
      <Canvas
        camera={{ position: [0, 1, 5], fov: 45 }}
        style={{
          position: "absolute",
          top: "-20%",
          left: "-15%",
          width: "130%",
          height: "140%",
          overflow: "visible",
          pointerEvents: "auto",
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#004d41" />

        <Suspense fallback={null}>
          <LogoModel />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
          />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
