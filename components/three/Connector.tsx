"use client"

import { forwardRef } from "react"
import type { Group } from "three"

export interface ConnectorProps {
  position?: [number, number, number]
  /** -1 = facing -X (left end), +1 = facing +X (right end) */
  direction?: -1 | 1
}

/**
 * SMA-style coaxial connector at a waveguide endpoint — chrome / nickel finish.
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
        <meshStandardMaterial color="#c0c0c5" metalness={1} roughness={0.1} envMapIntensity={1.6} />
      </mesh>

      {/* Knurled coupling nut */}
      <mesh position={[0, 0.07, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.09, 12]} />
        <meshStandardMaterial color="#d8d8dc" metalness={1} roughness={0.18} envMapIntensity={1.5} />
      </mesh>

      {/* Inner barrel */}
      <mesh position={[0, 0.14, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.06, 24]} />
        <meshStandardMaterial color="#a8a8ac" metalness={1} roughness={0.12} envMapIntensity={1.5} />
      </mesh>

      {/* Center pin */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.05, 16]} />
        <meshStandardMaterial color="#e6d8b8" metalness={0.9} roughness={0.25} envMapIntensity={1.3} />
      </mesh>
    </group>
  )
})

export default Connector
