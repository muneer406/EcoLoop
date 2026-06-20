"use client";

import { useMemo, useRef, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMediaQuery } from "@/hooks/use-media-query";
import * as THREE from "three";

interface CarbonFieldData {
  transportCo2: number;
  foodCo2: number;
  energyCo2: number;
  shoppingCo2: number;
  totalCo2: number;
}

interface CarbonFieldProps {
  data: CarbonFieldData;
}

// Health state: 0=excellent, 1=good, 2=average, 3=high_impact
function getHealthState(totalCo2: number): number {
  if (totalCo2 < 5) return 0;
  if (totalCo2 < 11) return 1;
  if (totalCo2 < 22) return 2;
  return 3;
}

function ParticleField({ data }: { data: CarbonFieldData }) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const healthState = getHealthState(data.totalCo2);

  const particleCount = useMemo(() => {
    const reduced = typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return 500;
    return typeof window !== "undefined" && window.innerWidth < 768 ? 800 : 1500;
  }, []);

  const { positions, colors, velocities } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);

    // Density zones based on health state
    const baseDensity = 1 + healthState;
    const spreadFactor = healthState < 2 ? 3 : 2;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Spread particles in a spherical cloud
      const radius = Math.random() * 6 * spreadFactor;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i3] = Math.cos(theta) * Math.sin(phi) * radius;
      pos[i3 + 1] = Math.sin(theta) * Math.sin(phi) * radius + 2;
      pos[i3 + 2] = Math.cos(phi) * radius;

      // Color based on health state (subtle atmospheric tones)
      const colors_map = [
        [0.4, 0.7, 1.0],  // Excellent: calm blue-white
        [0.5, 0.6, 0.9],  // Good: balanced blue
        [0.6, 0.5, 0.8],  // Average: purple-blue
        [0.7, 0.4, 0.6],  // High: warm purple
      ];

      const base_color = colors_map[healthState];
      const variation = 0.1;

      col[i3] = base_color[0] + (Math.random() - 0.5) * variation;
      col[i3 + 1] = base_color[1] + (Math.random() - 0.5) * variation;
      col[i3 + 2] = base_color[2] + (Math.random() - 0.5) * variation;

      // Velocities for animation
      vel[i3] = (Math.random() - 0.5) * 0.02;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    return { positions: pos, colors: col, velocities: vel };
  }, [particleCount, healthState]);

  const handlePointerMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    },
    [],
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const geom = meshRef.current.geometry;
    const pos = geom.attributes.position.array as Float32Array;
    const t = clock.getElapsedTime();

    // Flow intensity based on transport emissions
    const flowStrength = 0.005 + data.transportCo2 * 0.002;

    // Density pulse based on food emissions
    const densityPulse = 1 + Math.sin(t * 0.5) * data.foodCo2 * 0.02;

    // Energy vibration
    const energyShake = data.energyCo2 * 0.03;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Subtle mouse-driven flow
      const mouseFlowX = mouseRef.current.x * flowStrength * 0.5;
      const mouseFlowZ = mouseRef.current.y * flowStrength * 0.5;

      // Move particles
      pos[i3] += velocities[i3] + mouseFlowX;
      pos[i3 + 1] += velocities[i3 + 1] + Math.sin(t + i) * energyShake;
      pos[i3 + 2] += velocities[i3 + 2] + mouseFlowZ;

      // Density pulse
      const pulseEffect = densityPulse;
      pos[i3] *= pulseEffect;
      pos[i3 + 1] *= pulseEffect;
      pos[i3 + 2] *= pulseEffect;

      // Shoppping creates isolated large clusters - pull some particles together
      if (data.shoppingCo2 > 0 && i % 5 === 0) {
        const clusterStrength = data.shoppingCo2 * 0.001;
        pos[i3] += (0 - pos[i3]) * clusterStrength;
        pos[i3 + 2] += (0 - pos[i3 + 2]) * clusterStrength;
      }

      // Wrap particles that drift too far
      const maxDist = 8;
      const dist = Math.sqrt(
        pos[i3] ** 2 + pos[i3 + 1] ** 2 + pos[i3 + 2] ** 2,
      );
      if (dist > maxDist) {
        const scale = (maxDist * 0.9) / dist;
        pos[i3] *= scale;
        pos[i3 + 1] *= scale;
        pos[i3 + 2] *= scale;
      }
    }

    geom.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y += 0.0005 * (1 + data.transportCo2 * 0.05);
  });

  return (
    <points ref={meshRef} onPointerMove={handlePointerMove}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function CarbonField({ data }: CarbonFieldProps) {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <fog attach="fog" args={["#0a0a0a", 5, 15]} />
        <ambientLight intensity={0.2} />
        {!prefersReducedMotion && <ParticleField data={data} />}
        {prefersReducedMotion && <ParticleField data={{ ...data, totalCo2: 0 }} />}
      </Canvas>
    </div>
  );
}
