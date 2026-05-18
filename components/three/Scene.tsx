"use client"

import { forwardRef, useEffect, useRef } from "react"
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import type { Group } from "three"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"

import Waveguide from "./Waveguide"
import PinchElement from "./PinchElement"
import RadiationRipples from "./RadiationRipples"
import Rail from "./Rail"
import Connector from "./Connector"

export interface SceneProps {
  isMobile?: boolean
  /** Showcase mode wants users to zoom in on details; Hero locks zoom off. */
  enableZoom?: boolean
}

const WAVEGUIDE_LENGTH = 5.6
const PINCH_OFFSETS: number[] = [-1.6, 0, 1.6]

const Scene = forwardRef<Group, SceneProps>(function Scene({ isMobile = false, enableZoom = false }, ref) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const c = controlsRef.current
    if (!c || isMobile) return
    const onStart = () => {
      c.autoRotate = false
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
    }
    const onEnd = () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
      resumeTimer.current = setTimeout(() => { c.autoRotate = true }, 3000)
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
      {/* Cold ambient */}
      <ambientLight intensity={0.25} color="#b8c5d6" />

      {/* Main key light */}
      <directionalLight
        position={[4, 6, 4]}
        intensity={0.6}
        color="#ffffff"
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

      {/* Blue fill — brand color */}
      <directionalLight position={[-4, 2, -3]} intensity={0.4} color="#4d7cff" />

      {/* Purple rim light — edge glow */}
      <directionalLight position={[0, 3, -5]} intensity={0.5} color="#a78bfa" />

      {/* Night / dawn environment */}
      <Environment preset="dawn" background={false} environmentIntensity={0.3} />

      {/* Waveguide */}
      <Waveguide length={WAVEGUIDE_LENGTH} radius={0.08} />

      {/* Endpoint connectors */}
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

      {/* Contact shadow — grounds the product in the dark vitrine */}
      <ContactShadows
        position={[0, -0.55, 0]}
        opacity={0.6}
        scale={6}
        blur={2.4}
        far={1.6}
        color="#000000"
        resolution={isMobile ? 256 : 512}
      />

      {/* Controls */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={enableZoom}
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
