"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { animate, createTimeline, createTimer } from "animejs"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export default function NotFound() {
  const carRef = useRef<SVGSVGElement | null>(null)
  const { data: session } = authClient.useSession()
  const isLoggedIn = !!session?.user

  // Hide TopBar while on 404
  useEffect(() => {
    document.body.classList.add("hide-topbar")
    return () => {
      document.body.classList.remove("hide-topbar")
    }
  }, [])

  useEffect(() => {
    if (!carRef.current) return
    // reference additional imports to avoid unused warnings
    void createTimeline
    void createTimer

    // Subtle car bounce (no tilt)
    animate("#car-body", {
      translateY: [0, -2, 0],
      easing: "easeInOutSine",
      duration: 1000,
      loop: true,
    })

    // Wind trails: animate short lines behind the car to imply speed
    const trailSelectors = ["#wind-1", "#wind-2", "#wind-3"]
    trailSelectors.forEach((sel, i) => {
      animate(sel, {
        translateX: [0, -24],
        opacity: [0, 1, 0],
        easing: "easeInOutSine",
        duration: 900,
        delay: i * 150,
        loop: true,
      })
    })
  }, [])

  return (
    <main className="mx-auto flex max-w-screen-md flex-col items-center gap-8 px-6 py-16 text-center">
      <div className="space-y-1">
        <div className="text-6xl font-extrabold tracking-tight text-primary">404</div>
        <h1 className="text-3xl font-bold text-foreground">Oops — can&apos;t find the destination</h1>
        <p className="text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or may have moved.</p>
      </div>

      <div className="relative">
        {/* Car with wind trails */}
        <svg
          ref={carRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="220"
          height="220"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
          aria-hidden
        >
          {/* Wind trails (positioned behind the car, moving left) */}
          <g id="wind" strokeOpacity="0.6">
            <line id="wind-1" x1="10" y1="9" x2="6" y2="9" />
            <line id="wind-2" x1="9" y1="13" x2="5" y2="13" />
            <line id="wind-3" x1="8" y1="17" x2="4" y2="17" />
          </g>
          <g id="car-body">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <path d="M9 17h6" />
          </g>
          <circle id="wheel-rear" cx="7" cy="17" r="2" />
          <circle id="wheel-front" cx="17" cy="17" r="2" />
        </svg>
      </div>

      <div>
        <Button asChild>
          <Link href={isLoggedIn ? "/app" : "/"}>
            Back to {isLoggedIn ? "App" : "Home"}
          </Link>
        </Button>
      </div>
    </main>
  )
}
