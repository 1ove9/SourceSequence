"use client"

import {useMemo, useRef} from "react"
import {useFrame} from "@react-three/fiber"
import {ContactShadows, Environment, OrbitControls} from "@react-three/drei"
import * as THREE from "three"
import type {ShowcaseSceneProps} from "../registry"

const GRID_SIZE = 8
const SPACING = 0.32
const ELEMENT_HEIGHT = 0.18
const BEAM_LENGTH = 3.2
const BEAM_HALF_ANGLE_DEG = 14

const ACCENT = "#4d7cff"
const VIOLET = "#a78bfa"

interface ElementMeta {
  position: [number, number, number]
  key: string
}

function useArrayElements(): ElementMeta[] {
  return useMemo(() => {
    const elements: ElementMeta[] = []
    const halfGrid = (GRID_SIZE - 1) / 2
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const x = (i - halfGrid) * SPACING
        const z = (j - halfGrid) * SPACING
        elements.push({position: [x, ELEMENT_HEIGHT / 2, z], key: `${i}-${j}`})
      }
    }
    return elements
  }, [])
}

function Element({position}: {position: [number, number, number]}) {
  return (
    <group position={position}>
      {/* Antenna stem */}
      <mesh castShadow>
        <cylinderGeometry args={[0.04, 0.05, ELEMENT_HEIGHT, 12]} />
        <meshStandardMaterial
          color="#3a4258"
          metalness={0.85}
          roughness={0.35}
        />
      </mesh>
      {/* Emissive tip */}
      <mesh position={[0, ELEMENT_HEIGHT / 2 + 0.02, 0]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.6}
          metalness={0.2}
          roughness={0.4}
        />
      </mesh>
    </group>
  )
}

function GroundPlate() {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
      <circleGeometry args={[GRID_SIZE * SPACING * 0.75, 64]} />
      <meshStandardMaterial
        color="#0f1424"
        metalness={0.6}
        roughness={0.5}
      />
    </mesh>
  )
}

/**
 * Beam pivot: rotates around the y axis (azimuth) and tilts around z (elevation).
 * The actual beam is a translucent cone child whose tip sits at the array
 * center and base extends outward.
 */
function SteerableBeam() {
  const pivot = useRef<THREE.Group>(null)

  useFrame(({clock}) => {
    const t = clock.getElapsedTime()
    if (!pivot.current) return
    // Slow azimuth sweep + gentle elevation oscillation
    pivot.current.rotation.y = Math.sin(t * 0.35) * Math.PI * 0.5
    pivot.current.rotation.z = -Math.PI / 2 + Math.sin(t * 0.18) * 0.25
  })

  const halfAngleRad = (BEAM_HALF_ANGLE_DEG * Math.PI) / 180
  const radius = Math.tan(halfAngleRad) * BEAM_LENGTH

  return (
    <group ref={pivot} position={[0, ELEMENT_HEIGHT + 0.02, 0]}>
      {/* Cone: drei's cone has tip at +y by default; we offset so tip sits at origin */}
      <mesh position={[BEAM_LENGTH / 2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[radius, BEAM_LENGTH, 48, 1, true]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.7}
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {/* Inner brighter core */}
      <mesh position={[BEAM_LENGTH / 2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[radius * 0.45, BEAM_LENGTH, 32, 1, true]} />
        <meshStandardMaterial
          color={VIOLET}
          emissive={VIOLET}
          emissiveIntensity={0.9}
          transparent
          opacity={0.28}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {/* Tip indicator */}
      <mesh position={[BEAM_LENGTH, 0, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color={VIOLET}
          emissive={VIOLET}
          emissiveIntensity={1.4}
        />
      </mesh>
    </group>
  )
}

export default function BeamformingArrayScene({isMobile = false}: ShowcaseSceneProps) {
  const elements = useArrayElements()

  return (
    <group>
      <ambientLight intensity={0.3} color="#b8c5d6" />
      <directionalLight
        position={[4, 6, 4]}
        intensity={0.55}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.45} color={ACCENT} />
      <directionalLight position={[0, 3, -5]} intensity={0.4} color={VIOLET} />
      <Environment preset="dawn" background={false} environmentIntensity={0.3} />

      <GroundPlate />

      {elements.map((el) => (
        <Element key={el.key} position={el.position} />
      ))}

      <SteerableBeam />

      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.5}
        scale={GRID_SIZE * SPACING * 1.6}
        blur={2.2}
        far={1.4}
        color="#000000"
        resolution={isMobile ? 256 : 512}
      />

      <OrbitControls
        enableZoom
        enablePan={false}
        autoRotate={!isMobile}
        autoRotateSpeed={0.25}
        minPolarAngle={(35 * Math.PI) / 180}
        maxPolarAngle={(85 * Math.PI) / 180}
        minDistance={2.5}
        maxDistance={9}
        enableDamping
        dampingFactor={0.08}
      />
    </group>
  )
}
