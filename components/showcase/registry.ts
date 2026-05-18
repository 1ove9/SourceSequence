import dynamic from "next/dynamic"
import type {ComponentType} from "react"

export interface ShowcaseSceneProps {
  isMobile?: boolean
}

interface ShowcaseSceneEntry {
  /** Lazy-loaded R3F scene component. Rendered inside the Canvas. */
  Component: ComponentType<ShowcaseSceneProps>
  /** Caption shown during initial WebGL load. */
  loadingCaption: string
  /** Camera initial position; tuned per-scene. */
  cameraPosition: [number, number, number]
  /** Camera FOV; tuned per-scene. */
  cameraFov: number
}

/**
 * Registry mapping Sanity `sceneKey` field → R3F scene module.
 *
 * Adding a new scene:
 *   1. Drop a new file in components/showcase/scenes/MyScene.tsx
 *      (must default-export a component taking ShowcaseSceneProps)
 *   2. Register it here with a stable key
 *   3. In Sanity Studio, create a modelShowcase doc with sceneKey = "<your-key>"
 */
export const SHOWCASE_SCENES: Record<string, ShowcaseSceneEntry> = {
  "pinching-antenna": {
    Component: dynamic(() => import("./scenes/PinchingAntennaScene"), {ssr: false}),
    loadingCaption: "Initializing waveguide…",
    cameraPosition: [3, 1.6, 4],
    cameraFov: 35,
  },
  "beamforming-array": {
    Component: dynamic(() => import("./scenes/BeamformingArrayScene"), {ssr: false}),
    loadingCaption: "Initializing phased array…",
    cameraPosition: [3.2, 2.4, 4.2],
    cameraFov: 38,
  },
}

export function getSceneEntry(sceneKey: string | undefined): ShowcaseSceneEntry | null {
  if (!sceneKey) return null
  return SHOWCASE_SCENES[sceneKey] ?? null
}

export function listSceneKeys(): string[] {
  return Object.keys(SHOWCASE_SCENES)
}
