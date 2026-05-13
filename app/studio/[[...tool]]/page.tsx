"use client"

import dynamic from "next/dynamic"

const StudioComponent = dynamic(() => import("./Studio"), {
  ssr: false,
  loading: () => null,
})

export default function StudioPage() {
  return <StudioComponent />
}
