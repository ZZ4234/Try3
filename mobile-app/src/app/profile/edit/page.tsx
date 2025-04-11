"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, User, Save } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    nickname: "Alex Johnson",
    bio: "Movie enthusiast and TV show binger. Always looking for great recommendations!",
    email: "alex.johnson@example.com",
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the profile data here
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
        <h1 className="text-[17px] font-semibold text-center flex-1">Edit Profile</h1>
        <button onClick={handleSubmit} className="flex items-center text-[#F2994A] min-h-[44px] px-2">
          <Save size={20} className="mr-1" />
          <span className="text-[17px]">Save</span>
        </button>
      </header>

      <main className="flex-1 p-4">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-[#1C1C1E] overflow-hidden">
              <Image
                src="/placeholder.svg?height=96&width=96"
                alt="Profile"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-[#F2994A] p-2 rounded-full">
              <User size={18} className="text-white" />
            </button>
          </div>
          <button className="text-[#F2994A] text-[15px]">Change Profile Photo</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="nickname" className="text-[15px] font-medium text-[#8E8E93]">
              Name or Nickname
            </label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              value={formData.nickname}
              onChange={handleChange}
              className="w-full p-3.5 bg-[#1C1C1E] rounded-xl border border-[#38383A] text-white focus:outline-none focus:ring-1 focus:ring-[#F2994A] min-h-[44px]"
              placeholder="Enter your name or nickname"
              required
            />
            <p className="text-[13px] text-[#8E8E93]">This is how you'll appear to friends</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="bio" className="text-[15px] font-medium text-[#8E8E93]">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-3.5 bg-[#1C1C1E] rounded-xl border border-[#38383A] text-white focus:outline-none focus:ring-1 focus:ring-[#F2994A] min-h-[100px] resize-none"
              placeholder="Tell us a bit about yourself"
            />
            <p className="text-[13px] text-[#8E8E93]">Optional: Share your interests in movies and TV shows</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-[15px] font-medium text-[#8E8E93]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3.5 bg-[#1C1C1E] rounded-xl border border-[#38383A] text-white focus:outline-none focus:ring-1 focus:ring-[#F2994A] min-h-[44px]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full py-3.5 bg-[#F2994A] text-white rounded-xl font-medium min-h-[44px]">
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
