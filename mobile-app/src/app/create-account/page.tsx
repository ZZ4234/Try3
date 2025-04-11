"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function CreateAccountPage() {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    profilePicture: null,
  })
  const [passwordError, setPasswordError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromRecommendation = searchParams.get("fromRecommendation") === "true"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Validate password if it's being changed
    if (name === "password") {
      validatePassword(value)
    }
  }

  const validatePassword = (password: string) => {
    // Reset error message
    setPasswordError("")

    // Check length
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      return false
    }

    // Check for at least one capital letter
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one capital letter")
      return false
    }

    // Check for at least one symbol
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      setPasswordError("Password must contain at least one symbol")
      return false
    }

    return true
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()

    // If on password step, validate password
    if (step === 1) {
      if (!validatePassword(formData.password)) {
        return
      }
    }

    if (step < 2) {
      setStep(step + 1)
    } else {
      // In a real app, you would submit the form data to your backend
      router.push(`/account-created?fromRecommendation=${fromRecommendation}`)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.push("/")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e] text-white">
      <header className="p-4">
        <button onClick={handlePrevStep} className="flex items-center text-[#bdbdbd]">
          <ArrowLeft size={20} className="mr-2" />
          <span>Back</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col p-6">
        <div className="mb-8">
          <div className="flex items-center mb-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i <= step ? "bg-[#F2994A]" : "bg-[#333333]"
                  }`}
                >
                  {i < step ? "✓" : i}
                </div>
                {i < 2 && <div className={`h-1 w-10 ${i < step ? "bg-[#F2994A]" : "bg-[#333333]"}`}></div>}
              </div>
            ))}
          </div>

          <h1 className="text-2xl font-bold mb-2">
            {step === 1 && "Create your account"}
            {step === 2 && "Almost there!"}
          </h1>
          <p className="text-[#bdbdbd]">
            {step === 1 && "Enter your email and create a password"}
            {step === 2 && "Set up your profile details"}
          </p>
        </div>

        <form onSubmit={handleNextStep} className="flex flex-col space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-[#bdbdbd]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
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
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full p-3 bg-[#212121] rounded-md border ${
                      passwordError ? "border-[#FF3B30]" : "border-[#333333]"
                    } text-white focus:outline-none focus:ring-1 focus:ring-[#F2994A]`}
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
                <p className={`text-xs ${passwordError ? "text-[#FF3B30]" : "text-[#bdbdbd]"} mt-1`}>
                  {passwordError ||
                    "Password must be at least 8 characters with at least one capital letter and one symbol"}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 bg-[#212121] border border-[#333333] rounded focus:ring-[#F2994A]"
                  required
                />
                <label htmlFor="terms" className="text-sm text-[#bdbdbd]">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#F2994A]">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#F2994A]">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-[#bdbdbd]">
                  Name or Nickname
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#212121] rounded-md border border-[#333333] text-white focus:outline-none focus:ring-1 focus:ring-[#F2994A]"
                  placeholder="Enter your name or nickname"
                  required
                />
                <p className="text-xs text-[#bdbdbd] mt-1">This is how you'll appear to friends</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-[#bdbdbd]">Profile Picture (Optional)</p>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-[#333333] rounded-full flex items-center justify-center">
                    <span className="text-[#bdbdbd]">Add</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#bdbdbd] mb-2">Upload a profile picture</p>
                    <button
                      type="button"
                      className="px-4 py-2 bg-[#212121] border border-[#333333] text-white rounded-md text-sm"
                    >
                      Choose Image
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-[#bdbdbd]">Notification Preferences</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="email-notif" className="text-sm text-white">
                      Email notifications
                    </label>
                    <input
                      type="checkbox"
                      id="email-notif"
                      className="w-4 h-4 bg-[#212121] border border-[#333333] rounded focus:ring-[#F2994A]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="push-notif" className="text-sm text-white">
                      Push notifications
                    </label>
                    <input
                      type="checkbox"
                      id="push-notif"
                      className="w-4 h-4 bg-[#212121] border border-[#333333] rounded focus:ring-[#F2994A]"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#F2994A] text-white rounded-md flex items-center justify-center space-x-2"
          >
            <span>{step < 2 ? "Continue" : "Create Account"}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-auto pt-6 text-center">
          <p className="text-[#bdbdbd]">
            Already have an account?{" "}
            <Link href="/" className="text-[#F2994A]">
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
