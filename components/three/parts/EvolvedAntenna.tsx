"use client"

import {useMemo, useRef} from "react"
import {useFrame} from "@react-three/fiber"
import * as THREE from "three"

const METAL_COLOR = "#d8dce5"

interface Strut {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
}

/**
 * Hand-authored "AI-generated" antenna: cross base + 6 irregular branches +
 * a few L/Y forks. Intentionally asymmetric to read as algorithmically grown
 * rather than human-designed.
 */
function buildStruts(): Strut[] {
  const struts: Strut[] = []

  // 1) Cross base
  struts.push({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1.6, 0.08, 0.08],
  })
  struts.push({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [0.08, 0.08, 1.6],
  })

  // 2) Six branches in different directions. Each "branch" is a short
  // strut anchored near the cross end and rotated to point outward.
  // Angles chosen unevenly to avoid symmetry.
  const branches: Array<{
    anchor: [number, number, number]
    yaw: number    // rotation around y (horizontal)
    pitch: number  // rotation around z (vertical tilt)
    length: number
    thickness: number
  }> = [
    {anchor: [0.78, 0, 0.04], yaw: 0.4, pitch: 0.12, length: 0.72, thickness: 0.07},
    {anchor: [-0.74, 0, 0.0], yaw: Math.PI - 0.3, pitch: -0.18, length: 0.86, thickness: 0.05},
    {anchor: [0.04, 0, 0.78], yaw: Math.PI / 2 + 0.25, pitch: 0.05, length: 0.6, thickness: 0.09},
    {anchor: [-0.06, 0, -0.78], yaw: -Math.PI / 2 - 0.12, pitch: -0.08, length: 0.94, thickness: 0.05},
    {anchor: [0.55, 0.05, 0.5], yaw: 0.85, pitch: 0.35, length: 0.5, thickness: 0.11},
    {anchor: [-0.45, -0.04, -0.55], yaw: -2.1, pitch: -0.25, length: 0.66, thickness: 0.06},
  ]

  for (const b of branches) {
    // Direction vector from yaw/pitch
    const dx = Math.cos(b.pitch) * Math.cos(b.yaw)
    const dy = Math.sin(b.pitch)
    const dz = Math.cos(b.pitch) * Math.sin(b.yaw)
    const mid: [number, number, number] = [
      b.anchor[0] + (dx * b.length) / 2,
      b.anchor[1] + (dy * b.length) / 2,
      b.anchor[2] + (dz * b.length) / 2,
    ]
    struts.push({
      position: mid,
      rotation: [0, b.yaw, b.pitch],
      scale: [b.length, b.thickness, b.thickness],
    })

    // L-fork on a couple of branches
    if (b.length > 0.7) {
      const tip: [number, number, number] = [
        b.anchor[0] + dx * b.length,
        b.anchor[1] + dy * b.length,
        b.anchor[2] + dz * b.length,
      ]
      // Perpendicular direction (90deg yaw)
      const px = Math.cos(b.pitch) * Math.cos(b.yaw + Math.PI / 2)
      const pz = Math.cos(b.pitch) * Math.sin(b.yaw + Math.PI / 2)
      const forkLen = 0.32
      const forkMid: [number, number, number] = [
        tip[0] + (px * forkLen) / 2,
        tip[1],
        tip[2] + (pz * forkLen) / 2,
      ]
      struts.push({
        position: forkMid,
        rotation: [0, b.yaw + Math.PI / 2, 0],
        scale: [forkLen, b.thickness * 0.85, b.thickness * 0.85],
      })
    }
  }

  // Y-fork: one extra angled branch off the long -z branch
  struts.push({
    position: [-0.18, 0.18, -1.1],
    rotation: [0.6, -1.4, 0.4],
    scale: [0.46, 0.06, 0.06],
  })

  return struts
}

export default function EvolvedAntenna() {
  const group = useRef<THREE.Group>(null)
  const struts = useMemo(() => buildStruts(), [])

  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.002
  })

  return (
    <group ref={group}>
      {struts.map((s, i) => (
        <mesh
          key={i}
          position={s.position}
          rotation={s.rotation}
          scale={s.scale}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={METAL_COLOR}
            metalness={0.95}
            roughness={0.15}
            envMapIntensity={1.5}
          />
        </mesh>
      ))}
    </group>
  )
}
