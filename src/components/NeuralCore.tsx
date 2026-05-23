"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Line } from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════
   Neural Core — Interactive 3D Wireframe Object
   A slow-rotating icosahedron with orbiting particles that
   subtly tracks mouse position.
   ═══════════════════════════════════════════════════════════ */

/* ── Wireframe Icosahedron Core ───────────────────────────── */
function CoreGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Slow auto-rotation
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x += delta * 0.08;

    // Subtle mouse tracking — lerp toward pointer
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      pointer.x * 0.3,
      0.05
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.y * 0.2,
      0.05
    );
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshStandardMaterial
        color="#00F0FF"
        wireframe
        transparent
        opacity={0.35}
        emissive="#00F0FF"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

/* ── Inner Distortion Sphere ──────────────────────────────── */
function InnerSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y -= delta * 0.2;
    meshRef.current.rotation.z += delta * 0.1;
  });

  return (
    <mesh ref={meshRef} scale={0.85}>
      <icosahedronGeometry args={[1.8, 4]} />
      <MeshDistortMaterial
        color="#00F0FF"
        transparent
        opacity={0.08}
        wireframe
        distort={0.2}
        speed={1.5}
      />
    </mesh>
  );
}

/* ── Orbiting Particles ───────────────────────────────────── */
function OrbitalParticles({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute on a sphere surface with some radius variation
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.2 + Math.random() * 1.2;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 2 + 0.5;
    }
    return s;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    // Slow orbital rotation
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x += delta * 0.02;

    // Mouse influence
    pointsRef.current.rotation.z = THREE.MathUtils.lerp(
      pointsRef.current.rotation.z,
      pointer.x * 0.15,
      0.03
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00F0FF"
        size={0.025}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ── Orbital Rings (using drei Line) ──────────────────────── */
function OrbitalRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;
  });

  // Generate ring points on XZ plane
  const ringPoints = useMemo(() => {
    const pts: [number, number, number][] = [];
    const segments = 80;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push([Math.cos(angle) * 2.8, 0, Math.sin(angle) * 2.8]);
    }
    return pts;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Ring 1 */}
      <group rotation={[Math.PI * 0.3, 0, 0]}>
        <Line points={ringPoints} color="#00F0FF" lineWidth={0.5} transparent opacity={0.1} />
      </group>
      {/* Ring 2 */}
      <group rotation={[Math.PI * 0.6, Math.PI * 0.3, 0]}>
        <Line points={ringPoints} color="#00F0FF" lineWidth={0.5} transparent opacity={0.07} />
      </group>
      {/* Ring 3 */}
      <group rotation={[Math.PI * 0.1, Math.PI * 0.7, Math.PI * 0.2]}>
        <Line points={ringPoints} color="#00F0FF" lineWidth={0.5} transparent opacity={0.04} />
      </group>
    </group>
  );
}

/* ── Scene Composition ────────────────────────────────────── */
function NeuralScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00F0FF" />
      <pointLight position={[-5, -3, 3]} intensity={0.3} color="#0066FF" />

      {/* Main floating group */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group>
          <CoreGeometry />
          <InnerSphere />
          <OrbitalParticles />
          <OrbitalRings />
        </group>
      </Float>
    </>
  );
}

/* ── Exported Canvas Component ────────────────────────────── */
export default function NeuralCore() {
  return (
    <div className="h-full w-full" style={{ minHeight: "400px" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        flat
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <NeuralScene />
      </Canvas>
    </div>
  );
}
