"use client"

import { forwardRef } from "react"
import type { Group } from "three"

export interface WaveguideProps {
  length?: number
  radius?: number
}

/**
 * Dielectric (PTFE) waveguide oriented along the X axis.
 * - Outer translucent white sheath
 * - Inner amber-emissive core that suggests guided energy
 */
const Waveguide = forwardRef<Group, WaveguideProps>(function Waveguide(
  { length = 5.6, radius = 0.08 },
  ref,
) {
  return (
    <group ref={ref} rotation={[0, 0, Math.PI / 2]}>
      {/* Outer PTFE sheath */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, length, 64, 1, false]} />
        <meshPhysicalMaterial
          color="#f0f0e8"
          transmission={0.6}
          roughness={0.15}
          thickness={0.3}
          ior={1.4}
          metalness={0}
          clearcoat={0.5}
          clearcoatRoughness={0.25}
          attenuationColor="#fff4e0"
          attenuationDistance={3}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Inner core — emissive amber glow */}
      <mesh>
        <cylinderGeometry args={[radius * 0.45, radius * 0.45, length * 0.998, 32, 1, false]} />
        <meshStandardMaterial
          color="#1a1410"
          emissive="#ffa94d"
          emissiveIntensity={0.3}
          roughness={0.5}
          metalness={0}
        />
      </mesh>
    </group>
  )
})

export default Waveguide
