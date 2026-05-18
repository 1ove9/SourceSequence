"use client"

import {Suspense, useEffect, useRef, useState} from "react"
import {Canvas} from "@react-three/fiber"
import {ContactShadows, Environment, OrbitControls} from "@react-three/drei"
import {Bloom, EffectComposer, SMAA} from "@react-three/postprocessing"
import {useReducedMotion} from "framer-motion"
import * as THREE from "three"

import EvolvedAntenna from "./parts/EvolvedAntenna"
import CandidateAntennas from "./parts/CandidateAntennas"
import DesignSpaceGrid from "./parts/DesignSpaceGrid"
import EvaluationRing from "./parts/EvaluationRing"

const ACCENT = "#4d7cff"

interface MetricRow {
  label: string
  value: string
}

const METRICS: MetricRow[] = [
  {label: "BANDWIDTH", value: "5.5–7.2 GHz"},
  {label: "GAIN", value: "8.2 dBi"},
  {label: "VSWR", value: "<1.5"},
  {label: "SIZE", value: "32 × 14 mm"},
]

export default function GenerativeRFModel() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [inView, setInView] = useState(true)
  const [docVisible, setDocVisible] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const apply = () => setIsMobile(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => { for (const e of entries) setInView(e.isIntersecting) },
      {threshold: 0.05},
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onVis = () => setDocVisible(document.visibilityState === "visible")
    document.addEventListener("visibilitychange", onVis)
    return () => document.removeEventListener("visibilitychange", onVis)
  }, [])

  const frameloop: "always" | "never" | "demand" = prefersReducedMotion
    ? "demand"
    : inView && docVisible
      ? "always"
      : "never"
  const enablePost = !isMobile && !prefersReducedMotion

  return (
    <div
      ref={wrapperRef}
      className="showcase-inner relative aspect-square w-full overflow-hidden rounded-3xl border border-white/[0.08]"
    >
      <Canvas
        shadows
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.7,
        }}
        camera={{position: [3, 2.5, 4], fov: 38, near: 0.1, far: 100}}
        frameloop={frameloop}
        style={{background: "transparent"}}
      >
        <Suspense fallback={null}>
          {/* Lights */}
          <ambientLight intensity={0.5} color="#b8c5d6" />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            color="#ffffff"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-3, 2, -3]} intensity={0.5} color={ACCENT} />

          {/* Studio HDRI for crisp metal reflections */}
          <Environment preset="studio" background={false} environmentIntensity={0.6} />

          {/* Scene */}
          <DesignSpaceGrid />
          <EvolvedAntenna />
          <CandidateAntennas />
          <EvaluationRing />

          <ContactShadows
            position={[0, -0.95, 0]}
            opacity={0.4}
            scale={6}
            blur={2}
            far={4}
            color="#000000"
            resolution={isMobile ? 256 : 512}
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={!isMobile && !prefersReducedMotion}
            autoRotateSpeed={0.3}
            minPolarAngle={(50 * Math.PI) / 180}
            maxPolarAngle={(105 * Math.PI) / 180}
            enableDamping
            dampingFactor={0.08}
          />

          {enablePost && (
            <EffectComposer multisampling={0}>
              <Bloom
                intensity={0.6}
                luminanceThreshold={0.8}
                luminanceSmoothing={0.25}
                mipmapBlur
              />
              <SMAA />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>

      {/* === Overlays === */}

      {/* Top-right: live metadata */}
      <div className="pointer-events-none absolute right-4 top-4 z-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        <span>ANT-GEN-#0427</span>
        <span className="flex items-center gap-1.5">
          <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          GENERATING
        </span>
        <span>ITER 2,847</span>
      </div>

      {/* Top-left: CURRENT BEST glass panel */}
      <div className="pointer-events-none absolute left-4 top-4 z-10 min-w-[180px] rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-mono text-[10px] text-muted-foreground backdrop-blur-md">
        <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-accent">
          CURRENT BEST
        </div>
        <div className="space-y-1.5">
          {METRICS.map((m) => (
            <div key={m.label} className="flex justify-between gap-3">
              <span className="uppercase tracking-[0.14em]">{m.label}</span>
              <span className="text-foreground">{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom-left: tagline */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-10 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/50">
        Generative RF Design · Neural Topology Search · 5,200 candidates evaluated
      </div>
    </div>
  )
}
