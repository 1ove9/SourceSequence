"use client"

import { useEffect, useState } from "react"

function randomH() {
  return 8 + Math.random() * 12 // 8–20px
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
      {/* Bars */}
      <div className="flex items-end gap-[3px]">
        {bars.map((h, i) => (
          <span
            key={i}
            className="block w-[2px] rounded-full transition-all duration-150 ease-out"
            style={{
              height: h,
              backgroundColor: "#ff8a3d",
              opacity: 0.85,
            }}
          />
        ))}
      </div>
      {/* Label */}
      <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "#9a9a9a" }}>
        Signal Flux
      </span>
    </div>
  )
}
