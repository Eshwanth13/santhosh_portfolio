/// <reference types="@react-three/fiber" />
'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import HologramMaterial from './HologramMaterial';
import { extend } from '@react-three/fiber';

// Ensure registration
extend({ HologramMaterial });

// Floating island mesh
function FloatingIsland({ position, scale }: { position: [number, number, number]; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.15;
    meshRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#020617"
        emissive="#00f0ff"
        emissiveIntensity={0.3}
        wireframe={false}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

// Neon ring structures
function NeonRing({ position, radius, rotation }: { position: [number, number, number]; radius: number; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = clock.getElapsedTime() * 0.3;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.1;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial
        color="#00f0ff"
        emissive="#00f0ff"
        emissiveIntensity={2}
        toneMapped={false}
      />
    </mesh>
  );
}

// Central holographic sphere
function HoloSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <MeshDistortMaterial
          color="#020617"
          emissive="#c026d3"
          emissiveIntensity={0.15}
          distort={0.3}
          speed={2}
          metalness={1}
          roughness={0}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

function HoloPanel({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const materialRef = useRef<any>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
    }
  });

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[2, 1.2]} />
      <hologramMaterial
        ref={materialRef}
        uColor={new THREE.Color('#00f0ff')}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

// Particle system
function Particles({ count = 300 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00f0ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Camera rig with mouse parallax
function CameraRig() {
  const { camera } = useThree();
  const mouseRef = useMouseParallax(0.3);
  const targetRef = useRef(new THREE.Vector3());

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Sinusoidal float
    targetRef.current.set(
      mouseRef.current.x * 2,
      mouseRef.current.y * 1.5 + Math.sin(t * 0.3) * 0.3,
      5
    );
    camera.position.lerp(targetRef.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

interface HeroSceneProps {
  isMobile?: boolean;
}

export default function HeroScene({ isMobile = false }: HeroSceneProps) {
  if (isMobile) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <fog attach="fog" args={['#020617', 8, 25]} />
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00f0ff" />
      <pointLight position={[-5, -5, 3]} intensity={0.5} color="#c026d3" />

      <Stars radius={80} depth={30} count={500} factor={3} saturation={0} fade speed={0.5} />

      <HoloSphere />
      <HoloPanel position={[-2, 1.5, -2]} rotation={[0, 0.4, 0]} />
      <HoloPanel position={[2.2, -0.8, -1.5]} rotation={[0, -0.3, 0]} />
      
      <FloatingIsland position={[-3.5, 1, -3]} scale={0.6} />
      <FloatingIsland position={[3.8, -1, -4]} scale={0.45} />
      <FloatingIsland position={[-2, -1.5, -2]} scale={0.35} />
      <FloatingIsland position={[2.5, 2, -5]} scale={0.5} />

      <NeonRing position={[0, 0, 0]} radius={2} rotation={[0.3, 0, 0]} />
      <NeonRing position={[0, 0, 0]} radius={2.5} rotation={[1.1, 0.5, 0.2]} />
      <NeonRing position={[0, 0, 0]} radius={3} rotation={[0.7, 1.2, 0.9]} />

      <Particles count={250} />
      <CameraRig />

      <EffectComposer>
        <Bloom luminanceThreshold={0.8} intensity={1.2} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
