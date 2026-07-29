"use client"

import dynamic from "next/dynamic"
import {motion} from "framer-motion"
import SignalFlux from "./SignalFlux"

const PinchingAntennaModel = dynamic(() => import("./PinchingAntennaModel"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40">
        Initializing antenna system…
      </span>
    </div>
  ),
})

export default function HeroVisual({modelCaption}: {modelCaption: string}) {
  return (
    <motion.div
      initial={{opacity: 0, scale: 0.96, y: 24}}
      animate={{opacity: 1, scale: 1, y: 0}}
      transition={{duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] as const}}
      className="glass showcase-inner relative aspect-square w-full overflow-hidden"
      style={{borderRadius: 32}}
    >
      <div className="pointer-events-none absolute inset-x-5 top-5 z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em]">
        <span className="text-foreground">PASS-001</span>
        <span className="flex items-center gap-1.5 text-muted-foreground/80">
          <span className="block h-[6px] w-[6px] animate-pulse rounded-full bg-accent" />
          LIVE
        </span>
        <span className="text-muted-foreground">
          28.0 GHz <span className="text-black/20">/</span> Ch.2
        </span>
      </div>

      <PinchingAntennaModel />

      <div className="pointer-events-none absolute bottom-12 left-5 z-10">
        <SignalFlux />
      </div>

      <div className="pointer-events-none absolute inset-x-5 bottom-4 z-10 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50">
        {modelCaption}
      </div>
    </motion.div>
  )
}
