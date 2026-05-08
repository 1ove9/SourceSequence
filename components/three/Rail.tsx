"use client"

import { forwardRef } from "react"
import type { Group } from "three"

export interface RailProps {
  length?: number
  /** vertical offset below the waveguide centerline */
  yOffset?: number
}

/**
 * Black machined-metal rail running parallel to and below the waveguide.
 * The pinch elements' driver posts terminate against this rail — implying
 * a linear translation stage that positions each jaw along the guide.
 */
const Rail = forwardRef<Group, RailProps>(function Rail({ length = 6.2, yOffset = -0.4 }, ref) {
  return (
    <group ref={ref} position={[0, yOffset, 0]}>
      {/* Main rail body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[length, 0.04, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Top channel — slightly brighter strip to suggest a slot */}
      <mesh position={[0, 0.022, 0]}>
        <boxGeometry args={[length, 0.002, 0.018]} />
        <meshStandardMaterial color="#2e2e2e" metalness={0.85} roughness={0.4} />
      </mesh>

      {/* End caps */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[(length / 2) * s, 0, 0]} castShadow>
          <boxGeometry args={[0.06, 0.08, 0.08]} />
          <meshStandardMaterial color="#262626" metalness={0.85} roughness={0.35} />
        </mesh>
      ))}
    </group>
  )
})

export default Rail
