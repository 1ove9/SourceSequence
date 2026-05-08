"use client"

import { forwardRef } from "react"
import type { Group } from "three"

export interface PinchElementProps {
  position?: [number, number, number]
  active?: boolean
}

/**
 * A single pinching jaw assembly that clamps the dielectric waveguide.
 * Two opposing chamfered blocks above and below the waveguide,
 * connected by a vertical driver post extending down to the rail.
 */
const PinchElement = forwardRef<Group, PinchElementProps>(function PinchElement(
  { position = [0, 0, 0], active = false },
  ref,
) {
  // Waveguide outer radius is 0.08, gap 0.02 — jaws sit at +/- 0.10 from center
  const jawWidth = 0.15
  const jawHeight = 0.12
  const jawDepth = 0.2
  const jawOffsetY = 0.1 + jawHeight / 2

  return (
    <group ref={ref} position={position}>
      {/* Upper jaw */}
      <mesh position={[0, jawOffsetY, 0]} castShadow receiveShadow>
        <boxGeometry args={[jawWidth, jawHeight, jawDepth]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.85}
          roughness={0.35}
          emissive={active ? "#ffa94d" : "#000000"}
          emissiveIntensity={active ? 0.15 : 0}
        />
      </mesh>

      {/* Lower jaw */}
      <mesh position={[0, -jawOffsetY, 0]} castShadow receiveShadow>
        <boxGeometry args={[jawWidth, jawHeight, jawDepth]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.85}
          roughness={0.35}
          emissive={active ? "#ffa94d" : "#000000"}
          emissiveIntensity={active ? 0.15 : 0}
        />
      </mesh>

      {/* Upper jaw inner contact pad — slightly brighter to read as a tool tip */}
      <mesh position={[0, 0.1 + 0.005, 0]} castShadow>
        <boxGeometry args={[jawWidth * 0.6, 0.01, jawDepth * 0.7]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.1 - 0.005, 0]} castShadow>
        <boxGeometry args={[jawWidth * 0.6, 0.01, jawDepth * 0.7]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.95} roughness={0.2} />
      </mesh>

      {/* Driver post — connects lower jaw to rail (rail sits at y = -0.4) */}
      <mesh position={[0, -0.28, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.16, 16]} />
        <meshStandardMaterial color="#1f1f1f" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Driver collar at base of post */}
      <mesh position={[0, -0.36, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.35} />
      </mesh>
    </group>
  )
})

export default PinchElement
