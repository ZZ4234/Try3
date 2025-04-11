"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const router = useRouter()

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return false
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      return false
    }

    setPasswordError("")
    return true
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords match
    if (!validatePasswords()) {
      return
    }

    // In a real app, you would handle registration here
    router.push("/")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e] text-white">
      <main className="flex-1 flex flex-col p-6">
        <div className="mt-16 mb-10">
          <h1 className="text-2xl font-bold mb-2">Create account</h1>
          <p className="text-[#bdbdbd]">Sign up to get started</p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-[#bdbdbd]">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-[#212121] rounded-md border border-[#333333] text-white focus:outline-none focus:ring-1 focus:ring-[#ff3b30]"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-[#bdbdbd]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[#212121] rounded-md border border-[#333333] text-white focus:outline-none focus:ring-1 focus:ring-[#ff3b30]"
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
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (confirmPassword) validatePasswords()
                }}
                className="w-full p-3 bg-[#212121] rounded-md border border-[#333333] text-white focus:outline-none focus:ring-1 focus:ring-[#ff3b30]"
                placeholder="Create a password"
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
            <p className="text-xs text-[#bdbdbd] mt-1">Password must be at least 8 characters</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-[#bdbdbd]">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (password) validatePasswords()
                }}
                className={`w-full p-3 bg-[#212121] rounded-md border ${
                  passwordError ? "border-[#ff3b30]" : "border-[#333333]"
                } text-white focus:outline-none focus:ring-1 focus:ring-[#ff3b30]`}
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#bdbdbd]"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordError && <p className="text-xs text-[#ff3b30] mt-1">{passwordError}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 bg-[#212121] border border-[#333333] rounded focus:ring-[#ff3b30]"
              required
            />
            <label htmlFor="terms" className="text-sm text-[#bdbdbd]">
              I agree to the{" "}
              <Link href="/terms" className="text-[#ff3b30]">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#ff3b30]">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#ff3b30] text-white rounded-md flex items-center justify-center space-x-2"
          >
            <span>Create Account</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="h-px bg-[#333333] flex-1"></div>
            <span className="text-[#bdbdbd] text-sm">OR</span>
            <div className="h-px bg-[#333333] flex-1"></div>
          </div>

          <div className="space-y-4">
            <button className="w-full py-3 bg-[#212121] border border-[#333333] text-white rounded-md">
              Continue with Google
            </button>
            <button className="w-full py-3 bg-[#212121] border border-[#333333] text-white rounded-md">
              Continue with Apple
            </button>
          </div>
        </div>

        <div className="mt-auto pt-6 text-center">
          <p className="text-[#bdbdbd]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#ff3b30]">
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
