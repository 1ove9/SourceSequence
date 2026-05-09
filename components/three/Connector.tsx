"use client"

import { forwardRef } from "react"
import type { Group } from "three"

export interface ConnectorProps {
  position?: [number, number, number]
  direction?: -1 | 1
}

/**
 * Chrome cold-tone SMA-style connector at waveguide endpoints.
 */
const Connector = forwardRef<Group, ConnectorProps>(function Connector(
  { position = [0, 0, 0], direction = 1 },
  ref,
) {
  return (
    <group ref={ref} position={position} rotation={[0, 0, (direction * Math.PI) / 2]}>
      {/* Flange disk */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 32]} />
        <meshStandardMaterial color="#9ca3af" metalness={1} roughness={0.1} envMapIntensity={0.8} />
      </mesh>

      {/* Coupling nut */}
      <mesh position={[0, 0.07, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.09, 12]} />
        <meshStandardMaterial color="#6b7280" metalness={1} roughness={0.18} envMapIntensity={0.7} />
      </mesh>

      {/* Inner barrel */}
      <mesh position={[0, 0.14, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.06, 24]} />
        <meshStandardMaterial color="#4b5563" metalness={1} roughness={0.12} envMapIntensity={0.7} />
      </mesh>

      {/* Center pin */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.05, 16]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.2} envMapIntensity={0.7} />
      </mesh>
    </group>
  )
})

export default Connector
