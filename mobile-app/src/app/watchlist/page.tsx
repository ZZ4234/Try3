"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function WatchlistRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Only redirect once and only if we're actually on the /watchlist path
    const pathname = window.location.pathname
    if (pathname === "/watchlist") {
      router.replace("/home")
    }
  }, [router])

  return null
}
