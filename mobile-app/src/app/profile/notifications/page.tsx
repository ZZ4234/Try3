"use client"

import { useState } from "react"
import { ArrowLeft, Bell } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotificationPreferencesPage() {
  const [preferences, setPreferences] = useState({
    newRecommendations: true,
    friendRequests: true,
    friendActivity: true,
    appUpdates: false,
    emailNotifications: true,
    pushNotifications: true,
  })
  const router = useRouter()

  const togglePreference = (key: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
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
        <h1 className="text-[17px] font-semibold text-center flex-1">Notification Preferences</h1>
        <div className="w-20"></div>
      </header>

      <main className="flex-1 p-4">
        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#1C1C1E] flex items-center justify-center">
              <Bell size={32} className="text-[#F2994A]" />
            </div>
          </div>
          <p className="text-center text-[#8E8E93] mb-6">
            Customize which notifications you receive from Friends Recommend
          </p>
        </div>

        {/* Notification Types */}
        <div className="space-y-6">
          <div>
            <h3 className="text-[15px] font-medium text-[#8E8E93] mb-2 px-2">Notification Types</h3>
            <div className="bg-[#1C1C1E] rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-[#38383A] min-h-[44px]">
                <span>New Recommendations</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={preferences.newRecommendations}
                    onChange={() => togglePreference("newRecommendations")}
                  />
                  <div
                    className={`w-11 h-6 rounded-full peer ${preferences.newRecommendations ? "bg-[#F2994A]" : "bg-[#3A3A3C]"} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}
                  ></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 border-b border-[#38383A] min-h-[44px]">
                <span>Friend Requests</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={preferences.friendRequests}
                    onChange={() => togglePreference("friendRequests")}
                  />
                  <div
                    className={`w-11 h-6 rounded-full peer ${preferences.friendRequests ? "bg-[#F2994A]" : "bg-[#3A3A3C]"} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}
                  ></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 border-b border-[#38383A] min-h-[44px]">
                <span>Friend Activity</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={preferences.friendActivity}
                    onChange={() => togglePreference("friendActivity")}
                  />
                  <div
                    className={`w-11 h-6 rounded-full peer ${preferences.friendActivity ? "bg-[#F2994A]" : "bg-[#3A3A3C]"} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}
                  ></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 min-h-[44px]">
                <span>App Updates</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={preferences.appUpdates}
                    onChange={() => togglePreference("appUpdates")}
                  />
                  <div
                    className={`w-11 h-6 rounded-full peer ${preferences.appUpdates ? "bg-[#F2994A]" : "bg-[#3A3A3C]"} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}
                  ></div>
                </label>
              </div>
            </div>
          </div>

          {/* Delivery Methods */}
          <div>
            <h3 className="text-[15px] font-medium text-[#8E8E93] mb-2 px-2">Delivery Methods</h3>
            <div className="bg-[#1C1C1E] rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-[#38383A] min-h-[44px]">
                <span>Email Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={preferences.emailNotifications}
                    onChange={() => togglePreference("emailNotifications")}
                  />
                  <div
                    className={`w-11 h-6 rounded-full peer ${preferences.emailNotifications ? "bg-[#F2994A]" : "bg-[#3A3A3C]"} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}
                  ></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 min-h-[44px]">
                <span>Push Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={preferences.pushNotifications}
                    onChange={() => togglePreference("pushNotifications")}
                  />
                  <div
                    className={`w-11 h-6 rounded-full peer ${preferences.pushNotifications ? "bg-[#F2994A]" : "bg-[#3A3A3C]"} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}
                  ></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            className="w-full py-3.5 bg-[#F2994A] text-white rounded-xl font-medium min-h-[44px]"
            onClick={() => router.back()}
          >
            Save Preferences
          </button>
        </div>
      </main>
    </div>
  )
}
