import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, useTexture } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import type { Mesh } from 'three';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

function Earth({ reduced }: { reduced: boolean }) {
  const meshRef = useRef<Mesh>(null);
  const [earthTex, cloudsTex] = useTexture([
    '/textures/earth.jpg',
    '/textures/clouds.png',
  ]);

  useFrame((_, delta) => {
    if (reduced) return;
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.06;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshStandardMaterial map={earthTex} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.63, 64, 64]} />
        <meshStandardMaterial map={cloudsTex} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function Globe() {
  const reduced = usePrefersReducedMotion();
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 2, 2]} intensity={0.8} />
      <Suspense fallback={null}>
        <Stars radius={50} depth={20} count={5000} factor={2} fade />
        <Earth reduced={reduced} />
      </Suspense>
    </Canvas>
  );
}


