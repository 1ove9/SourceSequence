"use client"

import { forwardRef } from "react"
import type { Group } from "three"

export interface ConnectorProps {
  position?: [number, number, number]
  /** -1 = facing -X (left end), +1 = facing +X (right end) */
  direction?: -1 | 1
}

/**
 * SMA-style coaxial connector at a waveguide endpoint.
 * Composed of: thick flange disk + hex-ish nut + center pin sleeve.
 * Oriented so its axis aligns with the waveguide (X axis).
 */
const Connector = forwardRef<Group, ConnectorProps>(function Connector(
  { position = [0, 0, 0], direction = 1 },
  ref,
) {
  return (
    <group ref={ref} position={position} rotation={[0, 0, (direction * Math.PI) / 2]}>
      {/* Flange disk (broad mounting flange against the waveguide end) */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 32]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Knurled coupling nut */}
      <mesh position={[0, 0.07, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.09, 12]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.95} roughness={0.4} />
      </mesh>

      {/* Inner barrel */}
      <mesh position={[0, 0.14, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.06, 24]} />
        <meshStandardMaterial color="#222" metalness={0.95} roughness={0.25} />
      </mesh>

      {/* Center pin / dielectric */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.05, 16]} />
        <meshStandardMaterial color="#d4c8a8" metalness={0.4} roughness={0.4} />
      </mesh>
    </group>
  )
})

export default Connector
