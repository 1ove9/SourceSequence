"use client"

import {useMemo} from "react"
import * as THREE from "three"

const ACCENT = "#4d7cff"
const SIZE = 6        // world units
const DIVISIONS = 30

/**
 * Horizontal grid plane suggesting "high-dimensional design space".
 * Built with LineSegments + BufferGeometry for full control over line color
 * & opacity (gridHelper gives less control over transparency).
 */
export default function DesignSpaceGrid() {
  const geometry = useMemo(() => {
    const positions: number[] = []
    const step = SIZE / DIVISIONS
    const half = SIZE / 2
    for (let i = 0; i <= DIVISIONS; i++) {
      const v = -half + i * step
      // parallel to X
      positions.push(-half, 0, v, half, 0, v)
      // parallel to Z
      positions.push(v, 0, -half, v, 0, half)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    )
    return geo
  }, [])

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: ACCENT,
        transparent: true,
        opacity: 0.15,
      }),
    [],
  )

  return (
    <lineSegments
      geometry={geometry}
      material={material}
      position={[0, -0.8, 0]}
    />
  )
}
