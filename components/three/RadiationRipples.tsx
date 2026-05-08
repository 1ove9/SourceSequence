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
 * Three concentric, phase-staggered amber rings expanding outward
 * from a pinch point — represents leaked radiation from the waveguide.
 * Rings billboard toward the camera so they always read as halos.
 */
const RadiationRipples = forwardRef<Group, RadiationRipplesProps>(function RadiationRipples(
  { position = [0, 0, 0], ringCount = 3, duration = 3, rMin = 0.2, rMax = 1.5 },
  ref,
) {
  const ringRefs = useRef<Array<Mesh | null>>([])
  const matRefs = useRef<Array<MeshBasicMaterial | null>>([])

  // Per-ring phase offset (in seconds), evenly distributed across duration
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
      const k = local / duration // 0 → 1
      const radius = rMin + (rMax - rMin) * k
      const scale = radius // base ring is unit-radius
      mesh.scale.set(scale, scale, 1)
      // Opacity: fade from 0.6 → 0 with slight ease-out
      mat.opacity = 0.6 * (1 - k) * (1 - k)
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
          {/* Unit radius ring with thickness ~0.04 — scaled in useFrame */}
          <ringGeometry args={[0.96, 1.0, 96]} />
          <meshBasicMaterial
            ref={(el) => {
              matRefs.current[i] = el
            }}
            color="#ffa94d"
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
