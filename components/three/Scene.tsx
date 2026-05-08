"use client"

import { forwardRef, useEffect, useRef } from "react"
import { Environment, OrbitControls } from "@react-three/drei"
import type { Group } from "three"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"

import Waveguide from "./Waveguide"
import PinchElement from "./PinchElement"
import RadiationRipples from "./RadiationRipples"
import Rail from "./Rail"
import Connector from "./Connector"

export interface SceneProps {
  isMobile?: boolean
}

const WAVEGUIDE_LENGTH = 5.6
// 3 pinch positions, evenly distributed along ~70% of the guide
const PINCH_OFFSETS: number[] = [-1.6, 0, 1.6]

const Scene = forwardRef<Group, SceneProps>(function Scene({ isMobile = false }, ref) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Pause autoRotate during user interaction; resume 3s after release
  useEffect(() => {
    const c = controlsRef.current
    if (!c || isMobile) return
    const onStart = () => {
      c.autoRotate = false
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
    }
    const onEnd = () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
      resumeTimer.current = setTimeout(() => {
        c.autoRotate = true
      }, 3000)
    }
    c.addEventListener("start", onStart)
    c.addEventListener("end", onEnd)
    return () => {
      c.removeEventListener("start", onStart)
      c.removeEventListener("end", onEnd)
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
    }
  }, [isMobile])

  const ringCount = isMobile ? 2 : 3

  return (
    <group ref={ref}>
      {/* Lighting */}
      <ambientLight intensity={0.15} color="#ffffff" />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        color="#fff4e0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      <directionalLight position={[-5, 2, -3]} intensity={0.6} color="#aaccff" />
      <pointLight position={[0, 1, 0.5]} intensity={0.8} color="#ffa94d" distance={6} decay={2} />

      {/* Studio environment for PBR reflections (no visible background) */}
      <Environment preset="studio" background={false} />

      {/* Waveguide */}
      <Waveguide length={WAVEGUIDE_LENGTH} radius={0.08} />

      {/* Endpoint connectors — at each end of the waveguide along X */}
      <Connector position={[-WAVEGUIDE_LENGTH / 2 - 0.02, 0, 0]} direction={-1} />
      <Connector position={[WAVEGUIDE_LENGTH / 2 + 0.02, 0, 0]} direction={1} />

      {/* Pinch elements + ripples */}
      {PINCH_OFFSETS.map((x) => (
        <group key={x}>
          <PinchElement position={[x, 0, 0]} />
          <RadiationRipples position={[x, 0, 0]} ringCount={ringCount} duration={3} rMin={0.2} rMax={1.5} />
        </group>
      ))}

      {/* Rail */}
      <Rail length={WAVEGUIDE_LENGTH + 0.6} yOffset={-0.4} />

      {/* Soft ground catcher for shadows — invisible material */}
      <mesh position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 4]} />
        <shadowMaterial transparent opacity={0.35} />
      </mesh>

      {/* Controls */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        autoRotate={!isMobile}
        autoRotateSpeed={0.4}
        minPolarAngle={(60 * Math.PI) / 180}
        maxPolarAngle={(110 * Math.PI) / 180}
        enableDamping
        dampingFactor={0.08}
      />
    </group>
  )
})

export default Scene
