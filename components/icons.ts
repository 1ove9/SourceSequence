import {
  Antenna,
  Atom,
  Boxes,
  Brain,
  CircuitBoard,
  Handshake,
  Layers,
  Network,
  Radar,
  Radio,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

const ICON_MAP: Record<string, LucideIcon> = {
  Antenna,
  Atom,
  Boxes,
  Brain,
  CircuitBoard,
  Handshake,
  Layers,
  Network,
  Radar,
  Radio,
  Sparkles,
}

/**
 * Per-slug fallback so existing cards keep their original icons even if the
 * Sanity `cardIcon` field is left blank.
 */
const SLUG_FALLBACK: Record<string, LucideIcon> = {
  "pinching-antenna-systems": Antenna,
  "ai-control-plane": Brain,
  "generative-rf-design": Sparkles,
  "integrated-sensing-communication": Radar,
  "aircomp-wireless-ai-compute": Network,
  "simulation-modeling": Atom,
  "open-hardware-prototyping": CircuitBoard,
  "partner-lab-network": Handshake,
  "ai-compute-stack": Boxes,
}

export function resolveIcon(cardIcon?: string, slug?: string): LucideIcon {
  if (cardIcon && ICON_MAP[cardIcon]) return ICON_MAP[cardIcon]
  if (slug && SLUG_FALLBACK[slug]) return SLUG_FALLBACK[slug]
  return Sparkles
}
