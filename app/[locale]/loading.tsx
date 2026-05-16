export default function Loading() {
  return (
    <main className="bg-canvas relative flex min-h-screen items-center justify-center text-foreground">
      <div className="flex flex-col items-center gap-5">
        <div
          aria-hidden
          className="relative flex h-12 w-12 items-center justify-center"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/30" />
          <span className="relative block h-2.5 w-2.5 rounded-full bg-accent" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/60">
          Loading
        </span>
      </div>
    </main>
  )
}
