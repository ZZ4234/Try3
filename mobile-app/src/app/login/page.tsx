"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [safeAreaTop, setSafeAreaTop] = useState(47) // Default iOS status bar height
  const [safeAreaBottom, setSafeAreaBottom] = useState(0)
  const router = useRouter()

  // Detect safe area insets for iPhone
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Get the safe area bottom inset (for iPhone home indicator)
      const safeAreaValue = getComputedStyle(document.documentElement).getPropertyValue("--sat") || "0px"
      const numericValue = Number.parseInt(safeAreaValue.replace("px", ""), 10) || 0
      setSafeAreaBottom(numericValue > 0 ? numericValue : 34) // Default to 34px if not available

      // Get the safe area top inset (for iPhone notch)
      const safeAreaTopValue = getComputedStyle(document.documentElement).getPropertyValue("--sat-top") || "0px"
      const topNumericValue = Number.parseInt(safeAreaTopValue.replace("px", ""), 10) || 0
      setSafeAreaTop(topNumericValue > 0 ? topNumericValue : 47) // Default to 47px if not available
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle authentication here
    router.push("/home")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] text-white">
      {/* iOS-style status bar - would be handled by native iOS in a real app */}
      <div className="h-[47px] bg-[#000000]"></div>

      <main
        className="flex-1 flex flex-col p-6"
        style={{
          paddingBottom: `${safeAreaBottom}px`,
        }}
      >
        <div className="mb-10">
          <h1 className="text-[28px] font-bold mb-2">Welcome back</h1>
          <p className="text-[17px] text-[#8E8E93]">Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-[15px] font-medium text-[#8E8E93]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3.5 bg-[#1C1C1E] rounded-xl border border-[#38383A] text-white focus:outline-none focus:ring-1 focus:ring-[#007AFF] min-h-[44px] text-[17px]"
              placeholder="Enter your email"
              required
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-[15px] font-medium text-[#8E8E93]">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3.5 bg-[#1C1C1E] rounded-xl border border-[#38383A] text-white focus:outline-none focus:ring-1 focus:ring-[#007AFF] min-h-[44px] text-[17px]"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8E8E93] min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-[15px] text-[#007AFF] min-h-[44px] flex items-center">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#007AFF] text-white rounded-xl font-medium flex items-center justify-center min-h-[44px] text-[17px]"
          >
            <span>Sign In</span>
          </button>
        </form>

        <div className="mt-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="h-px bg-[#38383A] flex-1"></div>
            <span className="text-[#8E8E93] text-[15px]">OR</span>
            <div className="h-px bg-[#38383A] flex-1"></div>
          </div>

          <div className="space-y-4">
            <button className="w-full py-3.5 bg-[#1C1C1E] border border-[#38383A] text-white rounded-xl font-medium min-h-[44px] text-[17px]">
              Continue with Apple
            </button>
            <button className="w-full py-3.5 bg-[#1C1C1E] border border-[#38383A] text-white rounded-xl font-medium min-h-[44px] text-[17px]">
              Continue with Google
            </button>
          </div>
        </div>

        <div className="mt-auto pt-6 text-center">
          <p className="text-[15px] text-[#8E8E93]">
            Don't have an account?{" "}
            <Link href="/create-account" className="text-[#007AFF]">
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
