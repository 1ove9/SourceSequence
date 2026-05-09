"use client"

import { forwardRef } from "react"
import type { Group } from "three"

export interface PinchElementProps {
  position?: [number, number, number]
  active?: boolean
}

/**
 * Light-finish pinching jaw assembly clamping the dielectric waveguide.
 * Two opposing chamfered blocks above and below the waveguide,
 * connected by a vertical driver post that terminates against the rail.
 */
const PinchElement = forwardRef<Group, PinchElementProps>(function PinchElement(
  { position = [0, 0, 0], active = false },
  ref,
) {
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
          color="#e8e8ea"
          metalness={0.95}
          roughness={0.15}
          envMapIntensity={1.5}
          emissive={active ? "#ff8a3d" : "#000000"}
          emissiveIntensity={active ? 0.18 : 0}
        />
      </mesh>

      {/* Lower jaw */}
      <mesh position={[0, -jawOffsetY, 0]} castShadow receiveShadow>
        <boxGeometry args={[jawWidth, jawHeight, jawDepth]} />
        <meshStandardMaterial
          color="#e8e8ea"
          metalness={0.95}
          roughness={0.15}
          envMapIntensity={1.5}
          emissive={active ? "#ff8a3d" : "#000000"}
          emissiveIntensity={active ? 0.18 : 0}
        />
      </mesh>

      {/* Inner contact pads */}
      <mesh position={[0, 0.105, 0]} castShadow>
        <boxGeometry args={[jawWidth * 0.6, 0.01, jawDepth * 0.7]} />
        <meshStandardMaterial color="#f4f4f6" metalness={1} roughness={0.08} envMapIntensity={1.8} />
      </mesh>
      <mesh position={[0, -0.105, 0]} castShadow>
        <boxGeometry args={[jawWidth * 0.6, 0.01, jawDepth * 0.7]} />
        <meshStandardMaterial color="#f4f4f6" metalness={1} roughness={0.08} envMapIntensity={1.8} />
      </mesh>

      {/* Driver post — connects lower jaw to rail (rail at y = -0.4) */}
      <mesh position={[0, -0.28, 0]} castShadow>
        <cylinderGeometry args={[0.022, 0.022, 0.16, 16]} />
        <meshStandardMaterial color="#c8c8ca" metalness={0.95} roughness={0.18} envMapIntensity={1.5} />
      </mesh>

      {/* Driver collar at base of post */}
      <mesh position={[0, -0.36, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} />
        <meshStandardMaterial color="#dadadc" metalness={0.9} roughness={0.2} envMapIntensity={1.4} />
      </mesh>
    </group>
  )
})

export default PinchElement
