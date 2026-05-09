"use client"

import { forwardRef } from "react"
import type { Group } from "three"

export interface WaveguideProps {
  length?: number
  radius?: number
}

/**
 * Dielectric (PTFE-like) waveguide oriented along the X axis.
 * - Outer translucent white sheath with high transmission for premium glass feel
 * - Inner amber-emissive core suggesting guided RF energy
 */
const Waveguide = forwardRef<Group, WaveguideProps>(function Waveguide(
  { length = 5.6, radius = 0.08 },
  ref,
) {
  return (
    <group ref={ref} rotation={[0, 0, Math.PI / 2]}>
      {/* Outer translucent dielectric sheath */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, length, 64, 1, false]} />
        <meshPhysicalMaterial
          color="#fafafa"
          transmission={0.85}
          roughness={0.05}
          thickness={0.4}
          ior={1.45}
          metalness={0}
          clearcoat={0.6}
          clearcoatRoughness={0.15}
          attenuationColor="#fff4e6"
          attenuationDistance={2.5}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Inner emissive core */}
      <mesh>
        <cylinderGeometry args={[radius * 0.45, radius * 0.45, length * 0.998, 32, 1, false]} />
        <meshStandardMaterial
          color="#fff4e0"
          emissive="#ffa94d"
          emissiveIntensity={0.6}
          roughness={0.4}
          metalness={0}
        />
      </mesh>
    </group>
  )
})

export default Waveguide
