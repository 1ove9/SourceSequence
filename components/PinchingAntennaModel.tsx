"use client"

import { Suspense, forwardRef, useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { useProgress } from "@react-three/drei"
import { Bloom, ChromaticAberration, EffectComposer, Vignette } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import { Vector2 } from "three"

import Scene from "./three/Scene"

export interface PinchingAntennaModelProps {
  className?: string
}

function LoadingOverlay() {
  const { active } = useProgress()
  if (!active) return null
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
      <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
        Initializing antenna system…
      </span>
    </div>
  )
}

const PinchingAntennaModel = forwardRef<HTMLDivElement, PinchingAntennaModelProps>(
  function PinchingAntennaModel({ className }, ref) {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const [isMobile, setIsMobile] = useState(false)
    const [inView, setInView] = useState(true)
    const [docVisible, setDocVisible] = useState(true)

    // Mobile detection (matchMedia for live updates)
    useEffect(() => {
      const mq = window.matchMedia("(max-width: 767px)")
      const apply = () => setIsMobile(mq.matches)
      apply()
      mq.addEventListener("change", apply)
      return () => mq.removeEventListener("change", apply)
    }, [])

    // Pause render when offscreen
    useEffect(() => {
      const el = wrapperRef.current
      if (!el) return
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) setInView(e.isIntersecting)
        },
        { threshold: 0.05 },
      )
      io.observe(el)
      return () => io.disconnect()
    }, [])

    // Pause when tab is hidden
    useEffect(() => {
      const onVis = () => setDocVisible(document.visibilityState === "visible")
      document.addEventListener("visibilitychange", onVis)
      return () => document.removeEventListener("visibilitychange", onVis)
    }, [])

    const shouldRender = inView && docVisible
    const enablePost = !isMobile

    return (
      <div
        ref={(node) => {
          wrapperRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        className={className ?? "absolute inset-0"}
      >
        <Canvas
          shadows
          dpr={[1, isMobile ? 1.5 : 2]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
          }}
          camera={{ position: [3, 1.5, 4], fov: 35, near: 0.1, far: 100 }}
          frameloop={shouldRender ? "always" : "never"}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <Scene isMobile={isMobile} />
            {enablePost && (
              <EffectComposer multisampling={0}>
                <Bloom
                  intensity={0.6}
                  luminanceThreshold={0.7}
                  luminanceSmoothing={0.2}
                  mipmapBlur
                />
                <ChromaticAberration
                  blendFunction={BlendFunction.NORMAL}
                  offset={new Vector2(0.0005, 0.0005)}
                  radialModulation={false}
                  modulationOffset={0}
                />
                <Vignette darkness={0.4} offset={0.5} />
              </EffectComposer>
            )}
          </Suspense>
        </Canvas>

        <LoadingOverlay />
      </div>
    )
  },
)

export default PinchingAntennaModel
