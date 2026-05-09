"use client"

import { forwardRef, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Billboard } from "@react-three/drei"
import { type Group, type Mesh, type MeshBasicMaterial } from "three"

export interface RadiationRipplesProps {
  position?: [number, number, number]
  ringCount?: number
  duration?: number
  rMin?: number
  rMax?: number
}

/**
 * Electric-blue radiation rings — the signature glow of the deep-space scene.
 * Each ring has a slightly larger outer glow ring for the ambient light bleed.
 */
const RadiationRipples = forwardRef<Group, RadiationRipplesProps>(function RadiationRipples(
  { position = [0, 0, 0], ringCount = 3, duration = 3, rMin = 0.2, rMax = 1.5 },
  ref,
) {
  const ringRefs = useRef<Array<Mesh | null>>([])
  const matRefs = useRef<Array<MeshBasicMaterial | null>>([])
  const glowRefs = useRef<Array<Mesh | null>>([])
  const glowMatRefs = useRef<Array<MeshBasicMaterial | null>>([])

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
      const glow = glowRefs.current[i]
      const glowMat = glowMatRefs.current[i]
      if (!mesh || !mat) continue
      const local = ((t - phases[i]) % duration + duration) % duration
      const k = local / duration
      const radius = rMin + (rMax - rMin) * k
      mesh.scale.set(radius, radius, 1)
      mat.opacity = 0.5 * (1 - k) * (1 - k)
      if (glow && glowMat) {
        glow.scale.set(radius * 1.15, radius * 1.15, 1)
        glowMat.opacity = 0.2 * (1 - k) * (1 - k)
      }
    }
  })

  return (
    <Billboard position={position} ref={ref}>
      {Array.from({ length: ringCount }).map((_, i) => (
        <group key={i}>
          {/* Core ring */}
          <mesh
            ref={(el) => { ringRefs.current[i] = el }}
          >
            <ringGeometry args={[0.96, 1.0, 96]} />
            <meshBasicMaterial
              ref={(el) => { matRefs.current[i] = el }}
              color="#4d7cff"
              transparent
              opacity={0}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
          {/* Outer glow ring */}
          <mesh
            ref={(el) => { glowRefs.current[i] = el }}
          >
            <ringGeometry args={[0.88, 1.08, 96]} />
            <meshBasicMaterial
              ref={(el) => { glowMatRefs.current[i] = el }}
              color="#60a5fa"
              transparent
              opacity={0}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </Billboard>
  )
})

export default RadiationRipples
