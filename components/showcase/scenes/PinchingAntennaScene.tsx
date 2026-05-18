"use client"

import Scene from "@/components/three/Scene"
import type {ShowcaseSceneProps} from "../registry"

/**
 * Showcase variant of the pinching antenna scene. Reuses the same R3F building
 * blocks Hero uses (Waveguide / PinchElement / Rail / Connector / Ripples),
 * but with zoom enabled so visitors can inspect the dielectric guide closely.
 */
export default function PinchingAntennaScene({isMobile}: ShowcaseSceneProps) {
  return <Scene isMobile={isMobile} enableZoom />
}
