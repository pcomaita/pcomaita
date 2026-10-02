import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * Floating chrome sculpture — real-time WebGL hero element.
 * Single mesh + local lightformers (no external HDR fetches).
 */
function ChromeSculpture() {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        state.pointer.x * 0.45,
        2.5,
        delta,
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        -state.pointer.y * 0.25,
        2.5,
        delta,
      );
    }
    if (mesh.current) {
      mesh.current.rotation.z += delta * 0.12;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.8}>
        <mesh ref={mesh}>
          <torusKnotGeometry args={[1.15, 0.38, 256, 48]} />
          <meshStandardMaterial
            color="#0d0d10"
            metalness={1}
            roughness={0.12}
            envMapIntensity={1.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.15} />
        <ChromeSculpture />
        <Environment resolution={256}>
          <Lightformer
            intensity={4}
            position={[0, 5, 0]}
            rotation-x={Math.PI / 2}
            scale={[10, 10, 1]}
            color="#ffffff"
          />
          <Lightformer
            intensity={2.5}
            position={[-5, 1, -1]}
            rotation-y={Math.PI / 2}
            scale={[20, 1.5, 1]}
            color="#67e8f9"
          />
          <Lightformer
            intensity={1.8}
            position={[5, -1, 0]}
            rotation-y={-Math.PI / 2}
            scale={[20, 1.5, 1]}
            color="#a5f3fc"
          />
          <Lightformer
            intensity={1.2}
            position={[0, 0, 5]}
            scale={[8, 8, 1]}
            color="#ffffff"
          />
        </Environment>
      </Canvas>
    </div>
  );
}
