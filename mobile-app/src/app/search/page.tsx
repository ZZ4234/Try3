"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { SearchIcon, ArrowLeft, X, Mic, Clock, Home, Bell, User, Star, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState(["Action movies", "Sci-fi series", "Documentaries"])
  const [safeAreaBottom, setSafeAreaBottom] = useState(0)
  const [notificationCount, setNotificationCount] = useState(3) // Mock notification count
  const router = useRouter()

  // Mock data for pending recommendations
  const [pendingRecommendations, setPendingRecommendations] = useState([
    {
      id: 101,
      title: "The Queen's Gambit",
      type: "TV Series",
      year: "2020",
      image: "/placeholder.svg?height=120&width=80",
      friend: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 9.2,
      comment: "Absolutely loved this! The acting and storytelling are phenomenal.",
    },
    {
      id: 102,
      title: "Dune",
      type: "Movie",
      year: "2021",
      image: "/placeholder.svg?height=120&width=80",
      friend: {
        name: "Marcus Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 8.5,
      comment: "Epic sci-fi with amazing visuals. You need to see this!",
    },
  ])

  // Detect safe area insets for iPhone
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Get the safe area bottom inset (for iPhone home indicator)
      const safeAreaValue = getComputedStyle(document.documentElement).getPropertyValue("--sat") || "0px"
      const numericValue = Number.parseInt(safeAreaValue.replace("px", ""), 10) || 0
      setSafeAreaBottom(numericValue > 0 ? numericValue : 34) // Default to 34px if not available
    }
  }, [])

  // Focus search input on mount
  useEffect(() => {
    const searchInput = document.getElementById("search-input")
    if (searchInput) {
      searchInput.focus()
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Add to recent searches if not already there
      if (!recentSearches.includes(searchQuery.trim())) {
        setRecentSearches((prev) => [searchQuery.trim(), ...prev.slice(0, 4)])
      }
      router.push(`/search/results?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    const searchInput = document.getElementById("search-input")
    if (searchInput) {
      searchInput.focus()
    }
  }

  const removeRecentSearch = (index: number) => {
    setRecentSearches((prev) => prev.filter((_, i) => i !== index))
  }

  const addToWatchlist = (id: number) => {
    // In a real app, you would add this to the user's watchlist
    setPendingRecommendations((prev) => prev.filter((rec) => rec.id !== id))
    // Show confirmation
    alert("Added to watchlist!")
  }

  const dismissRecommendation = (id: number) => {
    // In a real app, you would mark this recommendation as dismissed
    setPendingRecommendations((prev) => prev.filter((rec) => rec.id !== id))
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] text-white">
      {/* iOS-style status bar - would be handled by native iOS in a real app */}
      <div className="h-[47px] bg-[#000000]"></div>

      <header className="p-4 bg-[#000000]">
        <form onSubmit={handleSearch} className="flex items-center gap-3">
          <Link href="/home">
            <ArrowLeft className="w-6 h-6 text-[#8E8E93]" />
          </Link>
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8E8E93] w-5 h-5" />
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setIsSearching(e.target.value.length > 0)
              }}
              className="w-full py-2.5 pl-10 pr-10 bg-[#1C1C1E] rounded-full border border-[#38383A] text-white focus:outline-none focus:ring-1 focus:ring-[#F2994A]"
              placeholder="Search movies, shows..."
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8E8E93]"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <button type="button" className="bg-[#1C1C1E] p-2.5 rounded-full min-h-[44px] min-w-[44px]">
            <Mic className="w-5 h-5 text-[#8E8E93]" />
          </button>
        </form>
      </header>

      <main className="flex-1 p-4">
        {!isSearching ? (
          <>
            {/* Friend Recommendations Section */}
            <div className="mb-6">
              <h3 className="text-[24px] font-bold mb-3">Friend Recommendations</h3>
              {pendingRecommendations.length > 0 ? (
                <div className="space-y-4">
                  {pendingRecommendations.map((rec) => (
                    <div key={rec.id} className="bg-[#1C1C1E] rounded-xl p-4">
                      <div className="flex">
                        <div className="relative w-16 h-24 mr-3">
                          <Image
                            src={rec.image || "/placeholder.svg"}
                            alt={rec.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                              <Image
                                src={rec.friend.avatar || "/placeholder.svg"}
                                alt={rec.friend.name}
                                width={24}
                                height={24}
                                className="object-cover"
                              />
                            </div>
                            <span className="text-sm text-[#8E8E93]">{rec.friend.name} recommended</span>
                          </div>
                          <h4 className="font-semibold">{rec.title}</h4>
                          <div className="flex items-center mt-1 mb-2">
                            <span className="text-xs text-[#8E8E93] mr-2">{rec.type}</span>
                            <span className="text-xs text-[#8E8E93]">{rec.year}</span>
                            <div className="ml-auto flex items-center">
                              <Star size={12} className="text-[#FFCC00] fill-[#FFCC00] mr-1" />
                              <span className="text-xs">{rec.rating}</span>
                            </div>
                          </div>
                          {rec.comment && <p className="text-xs text-[#8E8E93] mb-3">"{rec.comment}"</p>}
                          <div className="flex space-x-2">
                            <button
                              onClick={() => addToWatchlist(rec.id)}
                              className="flex-1 py-2 bg-[#F2994A] text-white rounded-lg text-sm flex items-center justify-center"
                            >
                              <Plus size={16} className="mr-1" />
                              <span>Add to Watchlist</span>
                            </button>
                            <button
                              onClick={() => dismissRecommendation(rec.id)}
                              className="py-2 px-3 bg-[#2C2C2E] text-white rounded-lg text-sm"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#1C1C1E] rounded-xl p-6 text-center">
                  <p className="text-[#8E8E93] mb-2">No pending recommendations</p>
                  <p className="text-xs text-[#8E8E93]">
                    When friends recommend content to you, it will appear here for you to review.
                  </p>
                </div>
              )}
            </div>

            {/* Recent Searches Section */}
            {recentSearches.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-[24px] font-bold">Recent Searches</h3>
                  <button className="text-sm text-[#F2994A]">Clear All</button>
                </div>
                <div className="space-y-3">
                  {recentSearches.map((search, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div
                        className="flex items-center flex-1"
                        onClick={() => {
                          setSearchQuery(search)
                          router.push(`/search/results?q=${encodeURIComponent(search)}`)
                        }}
                      >
                        <Clock className="w-5 h-5 text-[#8E8E93] mr-3" />
                        <span className="text-[#f5f5f5]">{search}</span>
                      </div>
                      <button
                        onClick={() => removeRecentSearch(index)}
                        className="text-[#8E8E93] min-h-[44px] min-w-[44px]"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="mt-2">
            <h3 className="text-sm text-[#8E8E93] mb-3">Suggestions</h3>
            <div className="space-y-3">
              {["Action", "Adventure", "Animation", "Comedy", "Crime"].map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center"
                  onClick={() => {
                    const newQuery = `${searchQuery} ${suggestion}`.trim()
                    setSearchQuery(newQuery)
                    router.push(`/search/results?q=${encodeURIComponent(newQuery)}`)
                  }}
                >
                  <SearchIcon className="w-5 h-5 text-[#8E8E93] mr-3" />
                  <span className="text-[#f5f5f5]">
                    {searchQuery} <span className="text-[#F2994A]">{suggestion}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* iOS-style tab bar with safe area padding for home indicator */}
      <nav
        className="grid grid-cols-4 bg-[#1C1C1E] border-t border-[#38383A] py-2"
        style={{ paddingBottom: `${safeAreaBottom}px` }}
      >
        {[
          { icon: <Home className="w-6 h-6" />, label: "Home", id: "home", path: "/home" },
          { icon: <SearchIcon className="w-6 h-6" />, label: "Search", id: "search", path: "/search" },
          {
            icon: (
              <div className="relative">
                <Bell className="w-6 h-6" />
                {notificationCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-[#FF3B30] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {notificationCount}
                  </div>
                )}
              </div>
            ),
            label: "Notifications",
            id: "notifications",
            path: "/notifications",
          },
          { icon: <User className="w-6 h-6" />, label: "Profile", id: "profile", path: "/profile" },
        ].map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className={`flex flex-col items-center justify-center min-h-[44px] ${
              item.id === "search" ? "text-[#F2994A]" : "text-[#8E8E93]"
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
