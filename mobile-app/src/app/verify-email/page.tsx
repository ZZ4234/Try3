"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
  const router = useRouter()

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode]
      newCode[index] = value
      setVerificationCode(newCode)

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would verify the code here
    router.push("/account-created")
  }

  const handleResend = () => {
    // In a real app, you would resend the verification code
    alert("Verification code resent!")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e] text-white">
      <header className="p-4">
        <button onClick={() => router.back()} className="flex items-center text-[#bdbdbd]">
          <ArrowLeft size={20} className="mr-2" />
          <span>Back</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col p-6">
        <div className="mb-10 text-center">
          <div className="bg-[#212121] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail size={32} className="text-[#ff3b30]" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Verify your email</h1>
          <p className="text-[#bdbdbd] max-w-xs mx-auto">
            We've sent a verification code to your email. Enter the code below to verify your account.
          </p>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col space-y-8">
          <div className="flex justify-center space-x-2">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center bg-[#212121] rounded-md border border-[#333333] text-white text-xl focus:outline-none focus:ring-1 focus:ring-[#ff3b30]"
                required
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#ff3b30] text-white rounded-md flex items-center justify-center space-x-2"
          >
            <span>Verify Email</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#bdbdbd] mb-4">Didn't receive the code?</p>
          <button onClick={handleResend} className="text-[#ff3b30] font-medium">
            Resend Code
          </button>
        </div>

        <div className="mt-auto pt-6 text-center">
          <p className="text-[#bdbdbd]">
            Already verified?{" "}
            <Link href="/" className="text-[#ff3b30]">
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
