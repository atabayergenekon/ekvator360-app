"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Stylised dotted world map. Continents are rendered as a low-res dot field
 * inside hand-tuned polygon masks, light, premium and decorative.
 * Plus animated trade arcs between major export hubs.
 */

type Hub = { id: string; name: string; x: number; y: number; primary?: boolean }

// Coordinates in a 1000x500 viewport (equirectangular-ish)
const HUBS: Hub[] = [
  { id: "ist", name: "Istanbul", x: 555, y: 175, primary: true },
  { id: "lon", name: "London", x: 482, y: 145 },
  { id: "ham", name: "Hamburg", x: 500, y: 142 },
  { id: "nyc", name: "New York", x: 295, y: 180 },
  { id: "los", name: "Los Angeles", x: 175, y: 200 },
  { id: "sao", name: "São Paulo", x: 350, y: 330 },
  { id: "dxb", name: "Dubai", x: 620, y: 215 },
  { id: "mum", name: "Mumbai", x: 680, y: 225 },
  { id: "sin", name: "Singapore", x: 775, y: 285 },
  { id: "tyo", name: "Tokyo", x: 850, y: 190 },
  { id: "syd", name: "Sydney", x: 870, y: 380 },
  { id: "jhb", name: "Johannesburg", x: 560, y: 350 },
]

// Approximate continent polygons (very stylised)
const LANDMASSES: string[] = [
  // North America
  "M120,120 L260,90 L320,140 L300,200 L240,260 L160,250 L110,200 Z",
  // Central / Mexico
  "M240,220 L290,220 L290,265 L255,275 L235,255 Z",
  // South America
  "M310,250 L380,260 L395,330 L360,400 L320,400 L300,330 Z",
  // Greenland
  "M380,80 L430,75 L430,115 L390,120 Z",
  // Europe
  "M460,110 L560,100 L555,165 L470,170 Z",
  // Africa
  "M500,200 L600,200 L610,310 L560,370 L520,370 L490,310 Z",
  // Middle East
  "M600,170 L660,165 L660,225 L605,220 Z",
  // Russia / N. Asia
  "M560,75 L860,70 L870,140 L580,140 Z",
  // South Asia
  "M650,200 L720,210 L720,260 L660,265 Z",
  // SE Asia
  "M720,240 L800,250 L805,310 L735,305 Z",
  // China / E. Asia
  "M740,140 L850,145 L855,210 L745,210 Z",
  // Japan
  "M850,160 L880,160 L880,210 L850,210 Z",
  // Australia
  "M820,330 L920,330 L925,400 L825,400 Z",
]

const ROUTES: { from: string; to: string; delay: number }[] = [
  { from: "ist", to: "lon", delay: 0 },
  { from: "ist", to: "nyc", delay: 0.6 },
  { from: "ist", to: "dxb", delay: 1.1 },
  { from: "ist", to: "sin", delay: 1.7 },
  { from: "ist", to: "tyo", delay: 2.2 },
  { from: "ist", to: "syd", delay: 2.8 },
  { from: "ist", to: "sao", delay: 0.3 },
  { from: "ist", to: "jhb", delay: 1.4 },
  { from: "ist", to: "los", delay: 1.9 },
  { from: "ist", to: "mum", delay: 2.5 },
  { from: "ist", to: "ham", delay: 0.9 },
]

// Generate dotted fill inside polygons by sampling a grid
function useDots(): { x: number; y: number }[] {
  return React.useMemo(() => {
    const dots: { x: number; y: number }[] = []
    const step = 8
    // Build a canvas-free in-polygon test using ray casting per landmass
    const polys = LANDMASSES.map((d) => {
      // Convert simple M/L paths to points
      const pts: { x: number; y: number }[] = []
      d.replace(/[MLZ]/g, " ")
        .trim()
        .split(/\s+/)
        .forEach((pair) => {
          const [px, py] = pair.split(",").map(Number)
          if (!Number.isNaN(px) && !Number.isNaN(py)) {
            pts.push({ x: px, y: py })
          }
        })
      return pts
    })
    function inside(poly: { x: number; y: number }[], x: number, y: number) {
      let result = false
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const xi = poly[i].x,
          yi = poly[i].y
        const xj = poly[j].x,
          yj = poly[j].y
        const intersect =
          yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi + 1e-9) + xi
        if (intersect) result = !result
      }
      return result
    }
    for (let y = 60; y <= 420; y += step) {
      for (let x = 80; x <= 940; x += step) {
        if (polys.some((p) => inside(p, x, y))) {
          dots.push({ x, y })
        }
      }
    }
    return dots
  }, [])
}

function arcPath(
  a: { x: number; y: number },
  b: { x: number; y: number },
  lift = 0.35,
) {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = b.x - a.x
  const dy = b.y - a.y
  const dist = Math.sqrt(dx * dx + dy * dy)
  const cy = my - dist * lift
  return `M ${a.x} ${a.y} Q ${mx} ${cy} ${b.x} ${b.y}`
}

export function WorldMap({ className }: { className?: string }) {
  const dots = useDots()
  const hubsById = React.useMemo(
    () => Object.fromEntries(HUBS.map((h) => [h.id, h])),
    [],
  )

  return (
    <svg
      viewBox="0 0 1000 500"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="World map highlighting Ekvator360 export markets and active trade routes"
    >
      <defs>
        <linearGradient id="wmArc" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="35%" stopColor="white" stopOpacity="0.95" />
          <stop offset="100%" stopColor="oklch(0.78 0.18 250)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="wmHub" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="60%" stopColor="oklch(0.78 0.18 250)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.78 0.18 250)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Dot field continents */}
      <g fill="currentColor">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={1.4} opacity={0.55} />
        ))}
      </g>

      {/* Routes */}
      <g fill="none" strokeLinecap="round">
        {ROUTES.map((r, i) => {
          const a = hubsById[r.from]
          const b = hubsById[r.to]
          if (!a || !b) return null
          const d = arcPath(a, b)
          return (
            <g key={`r-${i}`}>
              <path d={d} stroke="white" strokeOpacity="0.10" strokeWidth="0.8" />
              <path
                d={d}
                stroke="url(#wmArc)"
                strokeWidth="1.4"
                strokeDasharray="50 240"
                className="animate-arc-flow"
                style={{ animationDelay: `${r.delay}s` }}
              />
            </g>
          )
        })}
      </g>

      {/* Hubs */}
      <g>
        {HUBS.map((h) => (
          <g key={h.id} transform={`translate(${h.x} ${h.y})`}>
            {h.primary ? (
              <>
                <circle r={14} fill="url(#wmHub)" />
                <circle
                  r={5}
                  fill="oklch(0.78 0.18 250)"
                  opacity="0.5"
                  className="animate-pulse-ring"
                />
              </>
            ) : null}
            <circle r={h.primary ? 3 : 2.2} fill="white" />
            <circle r={h.primary ? 1.3 : 0.9} fill="oklch(0.45 0.18 258)" />
            <text
              x={h.primary ? 10 : 8}
              y={4}
              fontSize="10"
              fontFamily="var(--font-sans)"
              fill="white"
              opacity={h.primary ? 0.95 : 0.6}
              fontWeight={h.primary ? 600 : 500}
            >
              {h.name}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}
