"use client"

import {Suspense, useEffect, useRef, useState} from "react"
import {Canvas} from "@react-three/fiber"
import {Bloom, EffectComposer, SMAA} from "@react-three/postprocessing"
import {useReducedMotion} from "framer-motion"
import * as THREE from "three"
import {getSceneEntry} from "./registry"

/**
 * Canvas wrapper for any showcase scene. Looks up scene by key from the
 * registry, drives smart frameloop (pause when out of view / tab hidden /
 * reduced-motion), and adds Bloom + SMAA post on capable devices.
 */
export default function ShowcaseCanvas({
  sceneKey,
  className,
}: {
  sceneKey: string
  className?: string
}) {
  const entry = getSceneEntry(sceneKey)
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

  if (!entry) {
    return (
      <div
        ref={wrapperRef}
        className={
          className ??
          "relative flex aspect-video w-full items-center justify-center rounded-3xl border border-white/[0.08] bg-canvas-deep"
        }
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground/40">
          Unknown scene: {sceneKey}
        </span>
      </div>
    )
  }

  const SceneComponent = entry.Component
  const frameloop: "always" | "never" | "demand" = prefersReducedMotion
    ? "demand"
    : inView && docVisible
      ? "always"
      : "never"
  const enablePost = !isMobile && !prefersReducedMotion

  return (
    <div
      ref={wrapperRef}
      className={
        className ??
        "showcase-inner relative aspect-square w-full overflow-hidden rounded-3xl border border-white/[0.08]"
      }
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
        camera={{
          position: entry.cameraPosition,
          fov: entry.cameraFov,
          near: 0.1,
          far: 100,
        }}
        frameloop={frameloop}
        style={{background: "transparent"}}
      >
        <Suspense fallback={null}>
          <SceneComponent isMobile={isMobile} />
          {enablePost && (
            <EffectComposer multisampling={0}>
              <Bloom intensity={0.7} luminanceThreshold={0.6} luminanceSmoothing={0.25} mipmapBlur />
              <SMAA />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>

      {/* Loading caption sits above canvas until first paint */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 [&:has(+canvas:empty)]:opacity-100">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
          {entry.loadingCaption}
        </span>
      </div>
    </div>
  )
}
