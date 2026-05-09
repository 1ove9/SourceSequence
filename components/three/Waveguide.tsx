"use client"

import { forwardRef } from "react"
import type { Group } from "three"

export interface WaveguideProps {
  length?: number
  radius?: number
}

/**
 * Cold-blue dielectric waveguide for deep-space scene.
 * Outer translucent sheath transmits blue light; inner core emits #4d7cff.
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
          color="#c8d4e8"
          transmission={0.7}
          roughness={0.12}
          thickness={0.4}
          ior={1.45}
          metalness={0}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
          attenuationColor="#4d7cff"
          attenuationDistance={2.5}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Inner emissive core — electric blue */}
      <mesh>
        <cylinderGeometry args={[radius * 0.45, radius * 0.45, length * 0.998, 32, 1, false]} />
        <meshStandardMaterial
          color="#3b6bcc"
          emissive="#4d7cff"
          emissiveIntensity={0.4}
          roughness={0.4}
          metalness={0}
        />
      </mesh>
    </group>
  )
})

export default Waveguide
