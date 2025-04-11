"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const router = useRouter()

  const validatePasswords = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match")
      return false
    }

    // Enhanced password validation
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      return false
    }

    // Check for at least one capital letter
    if (!/[A-Z]/.test(newPassword)) {
      setPasswordError("Password must contain at least one capital letter")
      return false
    }

    // Check for at least one symbol
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword)) {
      setPasswordError("Password must contain at least one symbol")
      return false
    }

    setPasswordError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePasswords()) {
      return
    }

    // In a real app, you would handle password change here
    // For this demo, we'll just show an alert and go back
    alert("Password changed successfully!")
    router.back()
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] text-white">
      {/* iOS-style status bar - would be handled by native iOS in a real app */}
      <div className="h-[47px] bg-[#000000]"></div>

      {/* iOS-style navigation bar */}
      <header className="px-4 py-2 bg-[#000000] flex justify-between items-center">
        <button onClick={() => router.back()} className="flex items-center text-[#F2994A] min-h-[44px] px-2">
          <ArrowLeft size={20} className="mr-1" />
          <span className="text-[17px]">Back</span>
        </button>
        <h1 className="text-[24px] font-bold text-center flex-1">Change Password</h1>
        <div className="w-20"></div>
      </header>

      <main className="flex-1 p-4">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[#1C1C1E] flex items-center justify-center mb-4">
            <Lock size={32} className="text-[#F2994A]" />
          </div>
          <p className="text-[#8E8E93] text-center max-w-xs">
            Create a new password that is at least 8 characters long with at least one capital letter and one symbol. A
            strong password helps protect your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="currentPassword" className="text-[15px] font-medium text-[#8E8E93]">
              Current Password
            </label>
            <div className="relative">
              <input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-3.5 bg-[#1C1C1E] rounded-xl border border-[#38383A] text-white focus:outline-none focus:ring-1 focus:ring-[#F2994A] min-h-[44px]"
                placeholder="Enter your current password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8E8E93] min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-[15px] font-medium text-[#8E8E93]">
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value)
                  if (confirmPassword) validatePasswords()
                }}
                className="w-full p-3.5 bg-[#1C1C1E] rounded-xl border border-[#38383A] text-white focus:outline-none focus:ring-1 focus:ring-[#F2994A] min-h-[44px]"
                placeholder="Create a new password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8E8E93] min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-[13px] text-[#8E8E93]">
              Password must be at least 8 characters with at least one capital letter and one symbol
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-[15px] font-medium text-[#8E8E93]">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (newPassword) validatePasswords()
                }}
                className={`w-full p-3.5 bg-[#1C1C1E] rounded-xl border ${
                  passwordError ? "border-[#FF3B30]" : "border-[#38383A]"
                } text-white focus:outline-none focus:ring-1 focus:ring-[#F2994A] min-h-[44px]`}
                placeholder="Confirm your new password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8E8E93] min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordError && <p className="text-[13px] text-[#FF3B30]">{passwordError}</p>}
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full py-3.5 bg-[#F2994A] text-white rounded-xl font-medium min-h-[44px]">
              Update Password
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
