"use client"

import { forwardRef } from "react"
import type { Group } from "three"

export interface RailProps {
  length?: number
  yOffset?: number
}

const Rail = forwardRef<Group, RailProps>(function Rail({ length = 6.2, yOffset = -0.4 }, ref) {
  return (
    <group ref={ref} position={[0, yOffset, 0]}>
      {/* Main rail body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[length, 0.04, 0.04]} />
        <meshStandardMaterial color="#374151" metalness={0.9} roughness={0.3} envMapIntensity={0.6} />
      </mesh>

      {/* Top channel slot */}
      <mesh position={[0, 0.022, 0]}>
        <boxGeometry args={[length, 0.002, 0.018]} />
        <meshStandardMaterial color="#1f2937" metalness={0.85} roughness={0.35} />
      </mesh>

      {/* End caps */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[(length / 2) * s, 0, 0]} castShadow>
          <boxGeometry args={[0.06, 0.08, 0.08]} />
          <meshStandardMaterial color="#4b5563" metalness={0.85} roughness={0.28} envMapIntensity={0.7} />
        </mesh>
      ))}
    </group>
  )
})

export default Rail
