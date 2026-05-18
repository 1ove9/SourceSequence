"use client"

import {useMemo, useRef} from "react"
import {useFrame} from "@react-three/fiber"
import * as THREE from "three"

const ACCENT = "#4d7cff"

interface Candidate {
  base: [number, number, number]
  phase: number
  rotSpeed: number
  shape: "icosa" | "dodeca" | "octa" | "torus"
}

const CANDIDATES: Candidate[] = [
  {base: [1.5, 0.5, 1.2], phase: 0.0, rotSpeed: 0.3, shape: "icosa"},
  {base: [-1.4, 0.3, 1.5], phase: 1.4, rotSpeed: 0.42, shape: "dodeca"},
  {base: [1.2, -0.4, -1.3], phase: 2.6, rotSpeed: 0.36, shape: "octa"},
  {base: [-1.6, -0.2, -1.0], phase: 3.7, rotSpeed: 0.28, shape: "icosa"},
  {base: [0, 1.5, -1.5], phase: 5.0, rotSpeed: 0.5, shape: "torus"},
]

/**
 * Wireframe "alternative designs the AI considered" — floating around the
 * evolved antenna at slow, off-phase rhythms. Reads as a halo of options
 * rather than primary geometry.
 */
export default function CandidateAntennas() {
  const refs = useRef<(THREE.Mesh | null)[]>([])

  const materials = useMemo(
    () =>
      CANDIDATES.map(
        () =>
          new THREE.MeshBasicMaterial({
            color: ACCENT,
            wireframe: true,
            transparent: true,
            opacity: 0.2,
          }),
      ),
    [],
  )

  useFrame(({clock}) => {
    const t = clock.getElapsedTime()
    refs.current.forEach((mesh, i) => {
      if (!mesh) return
      const c = CANDIDATES[i]
      // Drift on each axis with different phase / freq
      mesh.position.x = c.base[0] + Math.sin(t * 0.4 + c.phase) * 0.12
      mesh.position.y = c.base[1] + Math.cos(t * 0.5 + c.phase) * 0.18
      mesh.position.z = c.base[2] + Math.sin(t * 0.32 + c.phase * 1.3) * 0.14
      mesh.rotation.x = t * c.rotSpeed * 0.6 + c.phase
      mesh.rotation.y = t * c.rotSpeed + c.phase * 0.5
    })
  })

  return (
    <group>
      {CANDIDATES.map((c, i) => (
        <mesh
          key={i}
          ref={(m) => {
            refs.current[i] = m
          }}
          position={c.base}
          scale={0.35}
          material={materials[i]}
        >
          {c.shape === "icosa" && <icosahedronGeometry args={[1, 0]} />}
          {c.shape === "dodeca" && <dodecahedronGeometry args={[1, 0]} />}
          {c.shape === "octa" && <octahedronGeometry args={[1, 0]} />}
          {c.shape === "torus" && <torusKnotGeometry args={[0.7, 0.22, 64, 8]} />}
        </mesh>
      ))}
    </group>
  )
}
