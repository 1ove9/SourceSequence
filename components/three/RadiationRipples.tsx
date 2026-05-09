"use client"

import { forwardRef, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Billboard } from "@react-three/drei"
import { type Group, type Mesh, type MeshBasicMaterial } from "three"

export interface RadiationRipplesProps {
  position?: [number, number, number]
  ringCount?: number
  /** seconds for one ring to grow from rMin to rMax */
  duration?: number
  rMin?: number
  rMax?: number
}

/**
 * Concentric, phase-staggered amber rings expanding outward from a pinch point.
 * Opacity is capped low (≤0.4) so they read as soft halos against the bright scene
 * rather than glaring blooms.
 */
const RadiationRipples = forwardRef<Group, RadiationRipplesProps>(function RadiationRipples(
  { position = [0, 0, 0], ringCount = 3, duration = 3, rMin = 0.2, rMax = 1.5 },
  ref,
) {
  const ringRefs = useRef<Array<Mesh | null>>([])
  const matRefs = useRef<Array<MeshBasicMaterial | null>>([])

  const phases = useMemo(
    () => Array.from({ length: ringCount }, (_, i) => (duration / ringCount) * i),
    [ringCount, duration],
  )

  useFrame((state) => {
    if (typeof document !== "undefined" && document.visibilityState === "hidden") return
    const t = state.clock.elapsedTime
    for (let i = 0; i < ringCount; i++) {
      const mesh = ringRefs.current[i]
      const mat = matRefs.current[i]
      if (!mesh || !mat) continue
      const local = ((t - phases[i]) % duration + duration) % duration
      const k = local / duration
      const radius = rMin + (rMax - rMin) * k
      mesh.scale.set(radius, radius, 1)
      // Opacity capped at 0.4 in light scenes
      mat.opacity = 0.4 * (1 - k) * (1 - k)
    }
  })

  return (
    <Billboard position={position} ref={ref}>
      {Array.from({ length: ringCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            ringRefs.current[i] = el
          }}
        >
          <ringGeometry args={[0.96, 1.0, 96]} />
          <meshBasicMaterial
            ref={(el) => {
              matRefs.current[i] = el
            }}
            color="#ff8a3d"
            transparent
            opacity={0}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </Billboard>
  )
})

export default RadiationRipples
