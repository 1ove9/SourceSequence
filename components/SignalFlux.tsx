"use client"

import { useEffect, useState } from "react"

function randomH() {
  return 8 + Math.random() * 12
}

export default function SignalFlux() {
  const [bars, setBars] = useState<number[]>([14, 10, 16])

  useEffect(() => {
    const id = setInterval(() => {
      setBars([randomH(), randomH(), randomH()])
    }, 200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-end gap-2">
      <div className="flex items-end gap-[3px]">
        {bars.map((h, i) => (
          <span
            key={i}
            className="block w-[2px] rounded-full bg-accent opacity-85 transition-all duration-150 ease-out"
            style={{height: h}}
          />
        ))}
      </div>
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
        Signal Flux
      </span>
    </div>
  )
}
