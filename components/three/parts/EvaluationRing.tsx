"use client"

import {useMemo, useRef} from "react"
import {useFrame} from "@react-three/fiber"
import {Line} from "@react-three/drei"
import * as THREE from "three"

const ACCENT = "#4d7cff"
const RADIUS = 1.6
const MARKER_COUNT = 8
const SEGMENTS = 128

/**
 * Dashed circle in the horizontal plane around the antenna + 8 emissive
 * marker spheres at evenly spaced angles. Reads as "AI sampling antenna
 * performance from these directions". Slow auto-rotation.
 */
export default function EvaluationRing() {
  const group = useRef<THREE.Group>(null)

  const circlePoints = useMemo(() => {
    const pts: [number, number, number][] = []
    for (let i = 0; i <= SEGMENTS; i++) {
      const t = (i / SEGMENTS) * Math.PI * 2
      pts.push([Math.cos(t) * RADIUS, 0, Math.sin(t) * RADIUS])
    }
    return pts
  }, [])

  const markers = useMemo(() => {
    const list: {position: [number, number, number]}[] = []
    for (let i = 0; i < MARKER_COUNT; i++) {
      const t = (i / MARKER_COUNT) * Math.PI * 2
      list.push({position: [Math.cos(t) * RADIUS, 0, Math.sin(t) * RADIUS]})
    }
    return list
  }, [])

  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.005
  })

  return (
    <group ref={group} position={[0, 0, 0]}>
      <Line
        points={circlePoints}
        color={ACCENT}
        transparent
        opacity={0.4}
        lineWidth={1}
        dashed
        dashSize={0.1}
        gapSize={0.06}
      />
      {markers.map((m, i) => (
        <mesh key={i} position={m.position}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color={ACCENT}
            emissive={ACCENT}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}
