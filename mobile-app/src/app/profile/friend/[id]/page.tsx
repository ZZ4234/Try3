"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, Star, Plus, Check, Heart, Share2, UserX, AlertTriangle } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function FriendProfilePage({ params }: { params: { id: string } }) {
  const [safeAreaBottom, setSafeAreaBottom] = useState(0)
  const [safeAreaTop, setSafeAreaTop] = useState(47) // Default iOS status bar height
  const [showUnfriendModal, setShowUnfriendModal] = useState(false)
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

  // Mock friend data - in a real app, this would come from an API based on the ID
  const friendData = {
    id: params.id,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=96&width=96",
    bio: "Movie enthusiast and TV show binger. Always looking for great recommendations!",
    mutualFriends: 5,
    recommendations: [
      {
        id: 101,
        title: "Interstellar",
        type: "Movie",
        year: "2014",
        image: "/placeholder.svg?height=240&width=160",
        rating: 9,
        comment: "Absolutely mind-blowing! The visuals and soundtrack are incredible. One of Nolan's best works.",
        date: "2 weeks ago",
        inWatchlist: true,
      },
      {
        id: 102,
        title: "The Queen's Gambit",
        type: "TV Series",
        year: "2020",
        image: "/placeholder.svg?height=240&width=160",
        rating: 9.5,
        comment: "Absolutely loved this! The acting and storytelling are phenomenal.",
        date: "1 month ago",
        inWatchlist: false,
      },
      {
        id: 103,
        title: "Dune",
        type: "Movie",
        year: "2021",
        image: "/placeholder.svg?height=240&width=160",
        rating: 8.5,
        comment: "Epic sci-fi with amazing visuals. You need to see this!",
        date: "3 months ago",
        inWatchlist: false,
      },
      {
        id: 104,
        title: "The Dark Knight",
        type: "Movie",
        year: "2008",
        image: "/placeholder.svg?height=240&width=160",
        rating: 10,
        comment: "A masterpiece of cinema. The dark tone and complex characters make it stand out.",
        date: "5 months ago",
        inWatchlist: true,
      },
    ],
  }

  const toggleWatchlist = (id: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent navigation to detail page
    // In a real app, you would update the user's watchlist
    alert(
      `${friendData.recommendations.find((r) => r.id === id)?.inWatchlist ? "Removed from" : "Added to"} watchlist: ${friendData.recommendations.find((r) => r.id === id)?.title}`,
    )
  }

  const handleRecommend = (id: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent navigation to detail page
    router.push(`/send-recommendation?contentId=${id}`)
  }

  const handleLoved = (id: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent navigation to detail page
    alert(
      `Marked "${friendData.recommendations.find((r) => r.id === id)?.title}" as loved and moved to your Loved List`,
    )
  }

  const handleContentClick = (id: number) => {
    router.push(`/content/${id}`)
  }

  const handleUnfriend = () => {
    // In a real app, you would remove the friend from the user's friend list
    alert(`Unfriended ${friendData.name}`)
    router.push("/profile/friends")
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
        <h1 className="text-[17px] font-semibold text-center flex-1">{friendData.name}</h1>
        <button
          onClick={() => setShowUnfriendModal(true)}
          className="flex items-center text-[#F2994A] min-h-[44px] px-2"
        >
          <UserX size={20} className="text-[#F2994A]" />
        </button>
      </header>

      <main className="flex-1 p-4">
        {/* Friend Profile Header */}
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#1C1C1E] overflow-hidden mr-4">
            <Image
              src={friendData.avatar || "/placeholder.svg"}
              alt={friendData.name}
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{friendData.name}</h2>
            <p className="text-[#8E8E93] text-sm">{friendData.mutualFriends} mutual friends</p>
            <p className="text-[#8E8E93] text-sm mt-1">{friendData.bio}</p>
          </div>
        </div>

        {/* Recommendations Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Recommendations ({friendData.recommendations.length})</h3>

          <div className="space-y-4">
            {friendData.recommendations.map((recommendation) => (
              <div
                key={recommendation.id}
                className="bg-[#1C1C1E] rounded-xl overflow-hidden"
                onClick={() => handleContentClick(recommendation.id)}
              >
                <div className="flex p-3">
                  <div className="relative w-24 h-36">
                    <Image
                      src={recommendation.image || "/placeholder.svg"}
                      alt={recommendation.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 ml-3 flex flex-col">
                    <div>
                      <h4 className="font-medium text-[17px]">{recommendation.title}</h4>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-[#8E8E93] mr-2">{recommendation.type}</span>
                        <span className="text-xs text-[#8E8E93]">{recommendation.year}</span>
                      </div>

                      <div className="flex items-center mt-2 bg-[#2C2C2E] px-2 py-1 rounded-md w-fit">
                        <Star size={14} className="text-[#FFCC00] fill-[#FFCC00] mr-1" />
                        <span className="text-sm">{recommendation.rating}/10</span>
                      </div>

                      {recommendation.comment && (
                        <div className="mt-2 bg-[#2C2C2E] p-2 rounded-lg">
                          <p className="text-sm text-[#E0E0E0] italic">"{recommendation.comment}"</p>
                        </div>
                      )}

                      <p className="text-xs text-[#8E8E93] mt-2">Recommended {recommendation.date}</p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3 items-center ml-2">
                    <button
                      onClick={(e) => toggleWatchlist(recommendation.id, e)}
                      className="w-10 h-10 rounded-full bg-[#2C2C2E] flex items-center justify-center"
                    >
                      {recommendation.inWatchlist ? (
                        <Check size={20} className="text-[#F2994A]" />
                      ) : (
                        <Plus size={20} className="text-white" />
                      )}
                    </button>

                    <button
                      onClick={(e) => handleLoved(recommendation.id, e)}
                      className="w-10 h-10 rounded-full bg-[#2C2C2E] flex items-center justify-center"
                    >
                      <Heart size={20} className="text-[#F2994A]" />
                    </button>

                    <button
                      onClick={(e) => handleRecommend(recommendation.id, e)}
                      className="w-10 h-10 rounded-full bg-[#2C2C2E] flex items-center justify-center"
                    >
                      <Share2 size={20} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Unfriend Confirmation Modal */}
      {showUnfriendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1C1C1E] rounded-xl p-6 max-w-xs w-full">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#2C2C2E] flex items-center justify-center mb-4">
                <AlertTriangle size={32} className="text-[#F2994A]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Remove Friend</h3>
              <p className="text-[#8E8E93] mb-6">
                Are you sure you want to remove <span className="text-white font-medium">{friendData.name}</span> from
                your friends?
              </p>
              <div className="flex flex-col w-full space-y-3">
                <button onClick={handleUnfriend} className="w-full py-3 bg-[#FF3B30] text-white rounded-xl font-medium">
                  Remove Friend
                </button>
                <button
                  onClick={() => setShowUnfriendModal(false)}
                  className="w-full py-3 bg-[#2C2C2E] text-white rounded-xl font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
