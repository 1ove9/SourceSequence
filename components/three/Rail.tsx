"use client"

import { forwardRef } from "react"
import type { Group } from "three"

export interface RailProps {
  length?: number
  yOffset?: number
}

/**
 * Light brushed-aluminum rail running parallel to and below the waveguide.
 * Pinch element driver posts terminate against this rail — implies a
 * linear translation stage that positions each jaw along the guide.
 */
const Rail = forwardRef<Group, RailProps>(function Rail({ length = 6.2, yOffset = -0.4 }, ref) {
  return (
    <group ref={ref} position={[0, yOffset, 0]}>
      {/* Main rail body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[length, 0.04, 0.04]} />
        <meshStandardMaterial color="#d4d4d6" metalness={0.8} roughness={0.25} envMapIntensity={1.3} />
      </mesh>

      {/* Top channel slot — slightly darker strip */}
      <mesh position={[0, 0.022, 0]}>
        <boxGeometry args={[length, 0.002, 0.018]} />
        <meshStandardMaterial color="#b8b8ba" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* End caps */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[(length / 2) * s, 0, 0]} castShadow>
          <boxGeometry args={[0.06, 0.08, 0.08]} />
          <meshStandardMaterial color="#c0c0c2" metalness={0.85} roughness={0.22} envMapIntensity={1.4} />
        </mesh>
      ))}
    </group>
  )
})

export default Rail
