"use client";

import { Component, Suspense, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import type { Group } from "three";

const MODEL_PATH = "/3d/logo-3d.glb";

// Catch WebGL/Three.js crashes so they don't kill the whole page
class Logo3DErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null; // silently hide if 3D fails
    return this.props.children;
  }
}

function LogoModel() {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.2} position={[0, -1.2, 0]} />
    </group>
  );
}

// Preload only in browser
if (typeof window !== "undefined") {
  useGLTF.preload(MODEL_PATH);
}

export default function Logo3D() {
  return (
    <Logo3DErrorBoundary>
    <div className="w-full h-full overflow-visible min-h-full  lg:min-h-125 relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
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
          <Environment preset="night" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
    </Logo3DErrorBoundary>
  );
}
