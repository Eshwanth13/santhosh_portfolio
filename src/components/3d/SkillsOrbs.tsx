/// <reference types="@react-three/fiber" />
'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { orbSkills } from '@/data/skills';

function OrbSystem() {
  const groupRef = useRef<THREE.Group>(null);
  const orbCount = orbSkills.length;

  const orbData = useMemo(() => {
    return Array.from({ length: orbCount }, (_, i) => {
      const angle = (i / orbCount) * Math.PI * 2;
      const inclination = (i * 0.4) % Math.PI;
      return {
        angle,
        inclination,
        color: i % 2 === 0 ? '#00f0ff' : '#c026d3',
        orbitRadius: 2.5,
        speed: 0.3 + i * 0.02,
      };
    });
  }, [orbCount]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Central sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshStandardMaterial
          color="#020617"
          emissive="#00f0ff"
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* Orbit rings */}
      {orbData.map((orb, i) => (
        <OrbInstance key={i} {...orb} index={i} label={orbSkills[i]} />
      ))}
    </group>
  );
}

function OrbInstance({
  inclination,
  color,
  orbitRadius,
  speed,
  index,
}: {
  inclination: number;
  color: string;
  orbitRadius: number;
  speed: number;
  index: number;
  label: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed + index * 0.8;
    const x = Math.cos(t) * orbitRadius;
    const z = Math.sin(t) * orbitRadius;
    const y = Math.sin(t + inclination) * 1.0;
    meshRef.current.position.set(x, y, z);
    meshRef.current.rotation.y += 0.02;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.3, 20, 20]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        toneMapped={false}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function SkillsOrbs({ isMobile = false }: { isMobile?: boolean }) {
  if (isMobile) return null;

  return (
    <Canvas
      camera={{ position: [0, 2, 7], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00f0ff" />
      <pointLight position={[-5, -5, 3]} intensity={0.5} color="#c026d3" />

      <OrbSystem />

      <EffectComposer>
        <Bloom luminanceThreshold={0.5} intensity={0.8} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
