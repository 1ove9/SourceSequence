"use client"

import { forwardRef } from "react"
import type { Group } from "three"

export interface PinchElementProps {
  position?: [number, number, number]
  active?: boolean
}

/**
 * Dark-finish pinching jaw assembly — deeper metals for the deep-space scene.
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
          color="#6b7280"
          metalness={0.95}
          roughness={0.25}
          envMapIntensity={0.7}
          emissive={active ? "#4d7cff" : "#000000"}
          emissiveIntensity={active ? 0.18 : 0}
        />
      </mesh>

      {/* Lower jaw */}
      <mesh position={[0, -jawOffsetY, 0]} castShadow receiveShadow>
        <boxGeometry args={[jawWidth, jawHeight, jawDepth]} />
        <meshStandardMaterial
          color="#6b7280"
          metalness={0.95}
          roughness={0.25}
          envMapIntensity={0.7}
          emissive={active ? "#4d7cff" : "#000000"}
          emissiveIntensity={active ? 0.18 : 0}
        />
      </mesh>

      {/* Inner contact pads */}
      <mesh position={[0, 0.105, 0]} castShadow>
        <boxGeometry args={[jawWidth * 0.6, 0.01, jawDepth * 0.7]} />
        <meshStandardMaterial color="#9ca3af" metalness={1} roughness={0.08} envMapIntensity={0.8} />
      </mesh>
      <mesh position={[0, -0.105, 0]} castShadow>
        <boxGeometry args={[jawWidth * 0.6, 0.01, jawDepth * 0.7]} />
        <meshStandardMaterial color="#9ca3af" metalness={1} roughness={0.08} envMapIntensity={0.8} />
      </mesh>

      {/* Driver post */}
      <mesh position={[0, -0.28, 0]} castShadow>
        <cylinderGeometry args={[0.022, 0.022, 0.16, 16]} />
        <meshStandardMaterial color="#4b5563" metalness={0.95} roughness={0.18} envMapIntensity={0.7} />
      </mesh>

      {/* Driver collar */}
      <mesh position={[0, -0.36, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} />
        <meshStandardMaterial color="#6b7280" metalness={0.9} roughness={0.2} envMapIntensity={0.7} />
      </mesh>
    </group>
  )
})

export default PinchElement
