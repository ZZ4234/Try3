"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle password reset here
    setIsSubmitted(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e] text-white">
      <header className="p-4">
        <button onClick={() => router.push("/")} className="flex items-center text-[#bdbdbd]">
          <ArrowLeft size={20} className="mr-2" />
          <span>Back</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col p-6">
        <div className="mt-8 mb-10">
          <h1 className="text-2xl font-bold mb-2">Forgot password</h1>
          <p className="text-[#bdbdbd]">
            {isSubmitted ? "Check your email for reset instructions" : "Enter your email to receive reset instructions"}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
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

            <button
              type="submit"
              className="w-full py-3 bg-[#F2994A] text-white rounded-md flex items-center justify-center space-x-2"
            >
              <span>Send Reset Link</span>
              <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="bg-[#212121] p-4 rounded-md border border-[#333333]">
              <p className="text-sm">
                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the
                instructions.
              </p>
            </div>

            <button
              onClick={() => router.push("/")}
              className="w-full py-3 bg-[#F2994A] text-white rounded-md flex items-center justify-center space-x-2"
            >
              <span>Return to Login</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
