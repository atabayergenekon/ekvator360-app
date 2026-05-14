"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Cinematic, 3D-feeling SVG globe with animated trade arcs.
 * No external dependencies; renders as a pure SVG so it stays crisp,
 * performant and SEO-safe. Designed for the hero section.
 */

type City = {
  id: string
  name: string
  // lon/lat in degrees
  lon: number
  lat: number
}

const CITIES: City[] = [
  { id: "ist", name: "Istanbul", lon: 28.97, lat: 41.01 },
  { id: "ham", name: "Hamburg", lon: 9.99, lat: 53.55 },
  { id: "lon", name: "London", lon: -0.13, lat: 51.5 },
  { id: "nyc", name: "New York", lon: -74.0, lat: 40.71 },
  { id: "dxb", name: "Dubai", lon: 55.27, lat: 25.2 },
  { id: "sin", name: "Singapore", lon: 103.82, lat: 1.35 },
  { id: "tyo", name: "Tokyo", lon: 139.69, lat: 35.69 },
  { id: "syd", name: "Sydney", lon: 151.21, lat: -33.87 },
  { id: "sao", name: "São Paulo", lon: -46.63, lat: -23.55 },
  { id: "jhb", name: "Johannesburg", lon: 28.04, lat: -26.2 },
  { id: "los", name: "Los Angeles", lon: -118.24, lat: 34.05 },
  { id: "mum", name: "Mumbai", lon: 72.87, lat: 19.07 },
]

// Routes from Istanbul → world
const ROUTES: { from: string; to: string; delay: number }[] = [
  { from: "ist", to: "ham", delay: 0 },
  { from: "ist", to: "nyc", delay: 0.6 },
  { from: "ist", to: "dxb", delay: 1.2 },
  { from: "ist", to: "sin", delay: 1.8 },
  { from: "ist", to: "tyo", delay: 2.4 },
  { from: "ist", to: "syd", delay: 3.0 },
  { from: "ist", to: "sao", delay: 0.3 },
  { from: "ist", to: "jhb", delay: 1.5 },
  { from: "ist", to: "los", delay: 2.1 },
  { from: "ist", to: "mum", delay: 2.7 },
  { from: "ist", to: "lon", delay: 0.9 },
]

const RADIUS = 160
const CENTER = 200

function round(value: number, digits = 2): number {
  return Number(value.toFixed(digits))
}

function point(value: number): string {
  return value.toFixed(2)
}

// Project lon/lat to 2D using orthographic projection, rotating the globe
function project(
  lon: number,
  lat: number,
  rotLon: number,
): { x: number; y: number; visible: boolean; z: number } {
  const lonR = ((lon + rotLon) * Math.PI) / 180
  const latR = (lat * Math.PI) / 180
  const x = Math.cos(latR) * Math.sin(lonR)
  const y = Math.sin(latR)
  const z = Math.cos(latR) * Math.cos(lonR)
  return {
    x: round(CENTER + RADIUS * x),
    y: round(CENTER - RADIUS * y),
    z: round(z, 6),
    visible: z >= -0.02,
  }
}

function arcPath(
  a: { x: number; y: number },
  b: { x: number; y: number },
  lift = 0.32,
) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dist = Math.sqrt(dx * dx + dy * dy)
  // Push control point toward globe center for a flying-over feel
  const toCenterX = CENTER - mx
  const toCenterY = CENTER - my
  const len = Math.sqrt(toCenterX * toCenterX + toCenterY * toCenterY) || 1
  const cx = mx - (toCenterX / len) * dist * lift
  const cy = my - (toCenterY / len) * dist * lift
  return `M ${point(a.x)} ${point(a.y)} Q ${point(cx)} ${point(cy)} ${point(b.x)} ${point(b.y)}`
}

export function Globe({
  className,
  liveLabel = "Live shipments · 38 lanes",
  activeMarketsLabel = "Active markets",
  activeMarketsValue = "42 countries",
}: {
  className?: string
  liveLabel?: string
  activeMarketsLabel?: string
  activeMarketsValue?: string
}) {
  const [rotation, setRotation] = React.useState(30)
  const rafRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) return

    let last = performance.now()
    function tick(now: number) {
      const dt = now - last
      last = now
      // ~6 degrees per second
      setRotation((r) => (r + (dt / 1000) * 6) % 360)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const rot = rotation

  // Longitude/latitude grid lines
  const lonLines = React.useMemo(() => {
    const lines: { d: string; opacity: number }[] = []
    for (let lon = -180; lon <= 180; lon += 20) {
      const points: { x: number; y: number; visible: boolean; z: number }[] = []
      for (let lat = -90; lat <= 90; lat += 5) {
        points.push(project(lon, lat, rot))
      }
      // Split into visible segments
      const segment: string[] = []
      let avgZ = 0
      let count = 0
      points.forEach((p, i) => {
        if (p.visible) {
          segment.push(`${i === 0 ? "M" : "L"} ${point(p.x)} ${point(p.y)}`)
          avgZ += project(lon, -90 + i * 5, rot).z
          count++
        }
      })
      if (segment.length > 1) {
        const avg = count ? avgZ / count : 0
        lines.push({
          d: segment.join(" "),
          opacity: round(0.25 + Math.max(0, avg) * 0.55, 4),
        })
      }
    }
    return lines
  }, [rot])

  const latLines = React.useMemo(() => {
    const lines: { d: string; opacity: number }[] = []
    for (let lat = -75; lat <= 75; lat += 15) {
      const points: { x: number; y: number; visible: boolean; z: number }[] = []
      for (let lon = -180; lon <= 180; lon += 5) {
        points.push(project(lon, lat, rot))
      }
      let d = ""
      let started = false
      let sumZ = 0
      let n = 0
      points.forEach((p) => {
        if (p.visible) {
          d += `${started ? "L" : "M"} ${point(p.x)} ${point(p.y)} `
          started = true
          sumZ += p.z
          n++
        } else {
          started = false
        }
      })
      if (d) {
        const avg = n ? sumZ / n : 0
        lines.push({ d, opacity: round(0.2 + Math.max(0, avg) * 0.55, 4) })
      }
    }
    return lines
  }, [rot])

  // Project all cities
  const cityPoints = React.useMemo(
    () =>
      CITIES.map((c) => ({
        ...c,
        ...project(c.lon, c.lat, rot),
      })),
    [rot],
  )

  const byId = React.useMemo(
    () => Object.fromEntries(cityPoints.map((c) => [c.id, c])),
    [cityPoints],
  )

  return (
    <div className={cn("relative aspect-square w-full", className)}>
      {/* Ambient halos */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-80"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--brand-accent) 18%, transparent), transparent 70%)",
        }}
      />
      <svg
        viewBox="0 0 400 400"
        className="block h-full w-full"
        role="img"
        aria-label="Interactive globe visualising worldwide export routes from Istanbul"
      >
        <defs>
          <radialGradient id="globeFace" cx="32%" cy="28%" r="78%">
            <stop offset="0%" stopColor="oklch(0.99 0.005 240)" />
            <stop offset="60%" stopColor="oklch(0.96 0.01 250)" />
            <stop offset="100%" stopColor="oklch(0.87 0.03 255)" />
          </radialGradient>
          <radialGradient id="globeLimb" cx="50%" cy="50%" r="50%">
            <stop offset="78%" stopColor="var(--brand)" stopOpacity="0" />
            <stop offset="96%" stopColor="var(--brand)" stopOpacity="0.20" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="var(--brand-accent)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0.25" />
          </radialGradient>
          <linearGradient id="arcStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.05" />
            <stop offset="40%" stopColor="var(--brand-accent)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.10" />
          </linearGradient>
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <clipPath id="globeClip">
            <circle cx={CENTER} cy={CENTER} r={RADIUS} />
          </clipPath>
        </defs>

        {/* Outer halo */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS + 18} fill="url(#haloGrad)" />

        {/* Sphere base */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="url(#globeFace)" />

        {/* Grid lines (clipped to sphere) */}
        <g clipPath="url(#globeClip)" stroke="var(--brand)" fill="none" strokeWidth="0.6">
          {lonLines.map((l, i) => (
            <path key={`lon-${i}`} d={l.d} opacity={l.opacity} />
          ))}
          {latLines.map((l, i) => (
            <path key={`lat-${i}`} d={l.d} opacity={l.opacity} />
          ))}
        </g>

        {/* Limb darkening for 3D shading */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="url(#globeLimb)" />

        {/* Highlight gloss */}
        <ellipse
          cx={CENTER - 50}
          cy={CENTER - 70}
          rx={60}
          ry={28}
          fill="white"
          opacity="0.30"
          filter="url(#softGlow)"
        />

        {/* Outline */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="var(--brand)"
          strokeOpacity="0.18"
          strokeWidth="1"
        />

        {/* Routes */}
        <g>
          {ROUTES.map((r, i) => {
            const a = byId[r.from]
            const b = byId[r.to]
            if (!a || !b) return null
            if (!a.visible || !b.visible) return null
            const d = arcPath({ x: a.x, y: a.y }, { x: b.x, y: b.y })
            return (
              <g key={`route-${i}`}>
                <path
                  d={d}
                  fill="none"
                  stroke="var(--brand-accent)"
                  strokeOpacity="0.18"
                  strokeWidth="0.8"
                />
                <path
                  d={d}
                  fill="none"
                  stroke="url(#arcStroke)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeDasharray="60 240"
                  className="animate-arc-flow"
                  style={{ animationDelay: `${r.delay}s` }}
                />
              </g>
            )
          })}
        </g>

        {/* City dots */}
        <g>
          {cityPoints.map((c) => {
            if (!c.visible) return null
            const isHub = c.id === "ist"
            const scale = round(0.55 + Math.max(0, c.z) * 0.6, 4)
            return (
              <g key={c.id} transform={`translate(${point(c.x)} ${point(c.y)})`}>
                {isHub ? (
                  <>
                    <circle
                      r={4}
                      fill="var(--brand-accent)"
                      opacity="0.35"
                      className="animate-pulse-ring"
                    />
                    <circle
                      r={6}
                      fill="var(--brand-accent)"
                      opacity="0.20"
                      className="animate-pulse-ring"
                      style={{ animationDelay: "1.3s" }}
                    />
                  </>
                ) : null}
                <circle
                  r={isHub ? 3 : round(2 * scale, 2)}
                  fill="var(--brand)"
                />
                <circle
                  r={isHub ? 1.5 : round(0.9 * scale, 2)}
                  fill="white"
                  opacity={0.85}
                />
              </g>
            )
          })}
        </g>
      </svg>

      {/* Floating label chip */}
      <div
        aria-hidden
        className="ring-soft pointer-events-none absolute right-[6%] top-[18%] hidden items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-[11px] font-medium text-foreground/80 backdrop-blur sm:inline-flex"
      >
        <span className="inline-block size-1.5 rounded-full bg-[var(--success)]" />
        {liveLabel}
      </div>
      <div
        aria-hidden
        className="ring-soft pointer-events-none absolute bottom-[14%] left-[4%] hidden flex-col gap-0.5 rounded-xl bg-background/90 px-3 py-2 text-left backdrop-blur sm:inline-flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {activeMarketsLabel}
        </span>
        <span className="text-sm font-semibold text-foreground">{activeMarketsValue}</span>
      </div>
    </div>
  )
}
