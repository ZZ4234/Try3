"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, User, Camera, Bell, Lock, LogOut, ChevronRight, Home, Search, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const [safeAreaBottom, setSafeAreaBottom] = useState(0)
  const [safeAreaTop, setSafeAreaTop] = useState(47) // Default iOS status bar height
  const [isEditingName, setIsEditingName] = useState(false)
  const [nickname, setNickname] = useState("Alex Johnson")
  const [tempNickname, setTempNickname] = useState("Alex Johnson")
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

  const handleSaveName = () => {
    setNickname(tempNickname)
    setIsEditingName(false)
  }

  const handleLogout = () => {
    // In a real app, you would handle logout here
    router.push("/")
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
        <h1 className="text-[24px] font-bold text-center flex-1">Profile</h1>
        <div className="w-20"></div>
      </header>

      <main className="flex-1 p-4">
        {/* Profile Header */}
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
              <Camera size={18} className="text-white" />
            </button>
          </div>

          {isEditingName ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={tempNickname}
                onChange={(e) => setTempNickname(e.target.value)}
                className="bg-[#1C1C1E] border border-[#38383A] rounded-lg px-3 py-2 text-center text-lg font-semibold focus:outline-none focus:ring-1 focus:ring-[#F2994A]"
                autoFocus
              />
              <button onClick={handleSaveName} className="bg-[#F2994A] text-white px-3 py-1 rounded-lg text-sm">
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold">{nickname}</h2>
              <button
                onClick={() => {
                  setTempNickname(nickname)
                  setIsEditingName(true)
                }}
                className="text-[#F2994A]"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Profile Settings */}
          <div>
            <h3 className="text-[15px] font-medium text-[#8E8E93] mb-2 px-2">Profile</h3>
            <div className="bg-[#1C1C1E] rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 border-b border-[#38383A] min-h-[44px]"
                onClick={() => router.push("/profile/edit")}
              >
                <div className="flex items-center">
                  <User size={20} className="text-[#F2994A] mr-3" />
                  <span>Edit Profile</span>
                </div>
                <ChevronRight size={18} className="text-[#8E8E93]" />
              </button>
              <button
                className="w-full flex items-center justify-between p-4 min-h-[44px]"
                onClick={() => router.push("/profile/change-photo")}
              >
                <div className="flex items-center">
                  <Camera size={20} className="text-[#F2994A] mr-3" />
                  <span>Change Profile Photo</span>
                </div>
                <ChevronRight size={18} className="text-[#8E8E93]" />
              </button>
            </div>
          </div>

          {/* Friends Section */}
          <div>
            <h3 className="text-[15px] font-medium text-[#8E8E93] mb-2 px-2">Friends</h3>
            <div className="bg-[#1C1C1E] rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 border-b border-[#38383A] min-h-[44px]"
                onClick={() => router.push("/profile/friends")}
              >
                <div className="flex items-center">
                  <Users size={20} className="text-[#F2994A] mr-3" />
                  <span>Manage Friends</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#8E8E93] mr-2">5</span>
                  <ChevronRight size={18} className="text-[#8E8E93]" />
                </div>
              </button>
              <button
                className="w-full flex items-center justify-between p-4 min-h-[44px]"
                onClick={() => router.push("/profile/friends?tab=requests")}
              >
                <div className="flex items-center">
                  <User size={20} className="text-[#F2994A] mr-3" />
                  <span>Friend Requests</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-[#FF3B30] text-white text-[10px] rounded-full px-1.5 py-0.5 mr-2">2</span>
                  <ChevronRight size={18} className="text-[#8E8E93]" />
                </div>
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h3 className="text-[15px] font-medium text-[#8E8E93] mb-2 px-2">Notifications</h3>
            <div className="bg-[#1C1C1E] rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 min-h-[44px]"
                onClick={() => router.push("/profile/notifications")}
              >
                <div className="flex items-center">
                  <Bell size={20} className="text-[#F2994A] mr-3" />
                  <span>Notification Preferences</span>
                </div>
                <ChevronRight size={18} className="text-[#8E8E93]" />
              </button>
            </div>
          </div>

          {/* Account Settings */}
          <div>
            <h3 className="text-[15px] font-medium text-[#8E8E93] mb-2 px-2">Account</h3>
            <div className="bg-[#1C1C1E] rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 border-b border-[#38383A] min-h-[44px]"
                onClick={() => router.push("/profile/change-password")}
              >
                <div className="flex items-center">
                  <Lock size={20} className="text-[#F2994A] mr-3" />
                  <span>Change Password</span>
                </div>
                <ChevronRight size={18} className="text-[#8E8E93]" />
              </button>
              <button className="w-full flex items-center justify-between p-4 min-h-[44px]" onClick={handleLogout}>
                <div className="flex items-center">
                  <LogOut size={20} className="text-[#FF3B30] mr-3" />
                  <span className="text-[#FF3B30]">Log Out</span>
                </div>
              </button>
            </div>
          </div>

          {/* App Info */}
          <div className="mt-8 text-center">
            <p className="text-[#8E8E93] text-sm">Friends Recommend v1.0.0</p>
          </div>
        </div>
      </main>

      {/* iOS-style tab bar with safe area padding for home indicator */}
      <nav
        className="grid grid-cols-4 bg-[#1C1C1E] border-t border-[#38383A] py-2"
        style={{ paddingBottom: `${safeAreaBottom}px` }}
      >
        {[
          { icon: <Home className="w-6 h-6" />, label: "Home", id: "home", path: "/home" },
          { icon: <Search className="w-6 h-6" />, label: "Search", id: "search", path: "/search" },
          { icon: <Bell className="w-6 h-6" />, label: "Notifications", id: "notifications", path: "/notifications" },
          { icon: <User className="w-6 h-6" />, label: "Profile", id: "profile", path: "/profile" },
        ].map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className={`flex flex-col items-center justify-center min-h-[44px] ${
              item.id === "profile" ? "text-[#F2994A]" : "text-[#8E8E93]"
            }`}
          >
            {item.icon}
            <span className="text-[10px] mt-1">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
