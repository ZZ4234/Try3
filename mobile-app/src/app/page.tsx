"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromRecommendation = searchParams.get("fromRecommendation") === "true"

  // No automatic redirects on the login page
  // Let the user explicitly navigate by clicking the login button

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle authentication here
    if (fromRecommendation) {
      router.push("/notifications")
    } else {
      router.push("/home")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e] text-white">
      <main className="flex-1 flex flex-col p-6">
        <div className="mt-16 mb-10">
          <h1 className="text-2xl font-bold mb-2">Welcome to Friends Recommend</h1>
          <p className="text-[#bdbdbd]">Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-[#bdbdbd]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[#212121] rounded-md border border-[#333333] text-white focus:outline-none focus:ring-1 focus:ring-[#F2994A]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-[#bdbdbd]">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-[#212121] rounded-md border border-[#333333] text-white focus:outline-none focus:ring-1 focus:ring-[#F2994A]"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#bdbdbd]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-[#F2994A]">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#F2994A] text-white rounded-md flex items-center justify-center space-x-2"
          >
            <span>Sign In</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-auto pt-6 text-center">
          <p className="text-[#bdbdbd]">
            Don't have an account?{" "}
            <Link
              href={`/create-account${fromRecommendation ? "?fromRecommendation=true" : ""}`}
              className="text-[#F2994A]"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
