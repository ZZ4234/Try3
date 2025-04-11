"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { SearchIcon, ArrowLeft, X, Filter, Star, Home, Bell, User, Plus, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [safeAreaBottom, setSafeAreaBottom] = useState(0)
  const [notificationCount, setNotificationCount] = useState(3) // Mock notification count
  const router = useRouter()

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

  // Mock search results with enhanced data
  const results = [
    {
      id: 1,
      title: "The Dark Knight",
      type: "Movie",
      year: "2008",
      genres: ["Action", "Crime", "Drama"],
      imdbRating: 9.0,
      image: "/placeholder.svg?height=240&width=160",
      friendRecommendations: [
        { name: "Marcus Johnson", avatar: "/placeholder.svg?height=40&width=40", rating: 9.5 },
        { name: "Sarah Lee", avatar: "/placeholder.svg?height=40&width=40", rating: 9.0 },
      ],
      inWatchlist: false,
    },
    {
      id: 2,
      title: "Breaking Bad",
      type: "TV Series",
      year: "2008-2013",
      genres: ["Crime", "Drama", "Thriller"],
      imdbRating: 9.5,
      image: "/placeholder.svg?height=240&width=160",
      friendRecommendations: [{ name: "Alex Rodriguez", avatar: "/placeholder.svg?height=40&width=40", rating: 10.0 }],
      inWatchlist: true,
    },
    {
      id: 3,
      title: "Inception",
      type: "Movie",
      year: "2010",
      genres: ["Action", "Adventure", "Sci-Fi"],
      imdbRating: 8.8,
      image: "/placeholder.svg?height=240&width=160",
      friendRecommendations: [],
      inWatchlist: false,
    },
    {
      id: 4,
      title: "Stranger Things",
      type: "TV Series",
      year: "2016-Present",
      genres: ["Drama", "Fantasy", "Horror"],
      imdbRating: 8.7,
      image: "/placeholder.svg?height=240&width=160",
      friendRecommendations: [
        { name: "Sophia Chen", avatar: "/placeholder.svg?height=40&width=40", rating: 8.5 },
        { name: "David Kim", avatar: "/placeholder.svg?height=40&width=40", rating: 9.0 },
        { name: "Emma Wilson", avatar: "/placeholder.svg?height=40&width=40", rating: 8.0 },
      ],
      inWatchlist: false,
    },
    {
      id: 5,
      title: "The Shawshank Redemption",
      type: "Movie",
      year: "1994",
      genres: ["Drama"],
      imdbRating: 9.3,
      image: "/placeholder.svg?height=240&width=160",
      friendRecommendations: [],
      inWatchlist: true,
    },
    {
      id: 6,
      title: "Game of Thrones",
      type: "TV Series",
      year: "2011-2019",
      genres: ["Action", "Adventure", "Drama"],
      imdbRating: 9.2,
      image: "/placeholder.svg?height=240&width=160",
      friendRecommendations: [{ name: "Raj Patel", avatar: "/placeholder.svg?height=40&width=40", rating: 9.0 }],
      inWatchlist: false,
    },
  ]

  // Calculate average friend rating
  const getAverageFriendRating = (recommendations) => {
    if (recommendations.length === 0) return null
    const sum = recommendations.reduce((acc, rec) => acc + rec.rating, 0)
    return (sum / recommendations.length).toFixed(1)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
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

  const filters = ["All", "Movies", "TV Shows", "Actors", "Directors"]

  const toggleWatchlist = (id: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent navigation to detail page
    // In a real app, you would update the user's watchlist
    // For this demo, we'll just show an alert
    alert(
      `${results.find((r) => r.id === id)?.inWatchlist ? "Removed from" : "Added to"} watchlist: ${results.find((r) => r.id === id)?.title}`,
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] text-white">
      {/* iOS-style status bar - would be handled by native iOS in a real app */}
      <div className="h-[47px] bg-[#000000]"></div>

      <header className="p-4 bg-[#000000]">
        <form onSubmit={handleSearch} className="flex items-center gap-3">
          <Link href="/search">
            <ArrowLeft className="w-6 h-6 text-[#8E8E93]" />
          </Link>
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8E8E93] w-5 h-5" />
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          <button
            type="button"
            className="bg-[#1C1C1E] p-2.5 rounded-full min-h-[44px] min-w-[44px]"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter className="w-5 h-5 text-[#8E8E93]" />
          </button>
        </form>
      </header>

      {filterOpen && (
        <div className="px-4 py-3 bg-[#1C1C1E]">
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  filter === activeFilter ? "bg-[#F2994A] text-white" : "bg-[#2C2C2E] text-[#8E8E93]"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      )}

      <main className="flex-1 p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Results for "{query}"</h2>
          <p className="text-sm text-[#8E8E93]">{results.length} results found</p>
        </div>

        <div className="space-y-4">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-[#1C1C1E] rounded-xl overflow-hidden"
              onClick={() => router.push(`/content/${result.id}`)}
            >
              <div className="flex p-3">
                <div className="relative w-24 h-36">
                  <Image
                    src={result.image || "/placeholder.svg"}
                    alt={result.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 bg-[#00000080] px-2 py-1 rounded-md flex items-center">
                    <Star size={12} className="text-[#FFCC00] fill-[#FFCC00] mr-1" />
                    <span className="text-xs">{result.imdbRating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex-1 ml-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-[17px]">{result.title}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-[#8E8E93] mr-2">{result.type}</span>
                      <span className="text-xs text-[#8E8E93]">{result.year}</span>
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {result.genres.map((genre, idx) => (
                        <span key={idx} className="text-xs bg-[#2C2C2E] text-[#8E8E93] px-2 py-0.5 rounded-full">
                          {genre}
                        </span>
                      ))}
                    </div>

                    {/* Friend Recommendations */}
                    {result.friendRecommendations.length > 0 && (
                      <div className="mt-2">
                        <div className="flex items-center">
                          <div className="flex -space-x-2 mr-2">
                            {result.friendRecommendations.slice(0, 3).map((friend, idx) => (
                              <div
                                key={idx}
                                className="w-6 h-6 rounded-full overflow-hidden border-2 border-[#1C1C1E] cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  router.push(`/profile/friend/${idx + 1}`)
                                }}
                              >
                                <Image
                                  src={friend.avatar || "/placeholder.svg"}
                                  alt={friend.name}
                                  width={24}
                                  height={24}
                                  className="object-cover"
                                />
                              </div>
                            ))}
                            {result.friendRecommendations.length > 3 && (
                              <div className="w-6 h-6 rounded-full bg-[#2C2C2E] flex items-center justify-center border-2 border-[#1C1C1E]">
                                <span className="text-xs">+{result.friendRecommendations.length - 3}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center">
                            <span
                              className="text-xs text-[#8E8E93] mr-1 cursor-pointer hover:text-[#F2994A]"
                              onClick={(e) => {
                                e.stopPropagation()
                                if (result.friendRecommendations.length === 1) {
                                  router.push(`/profile/friend/1`)
                                }
                              }}
                            >
                              {result.friendRecommendations.length === 1
                                ? "1 friend"
                                : `${result.friendRecommendations.length} friends`}
                            </span>
                            {getAverageFriendRating(result.friendRecommendations) && (
                              <div className="flex items-center bg-[#2C2C2E] px-1.5 py-0.5 rounded-md">
                                <Star size={10} className="text-[#F2994A] fill-[#F2994A] mr-0.5" />
                                <span className="text-xs">{getAverageFriendRating(result.friendRecommendations)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Add to Watchlist Button */}
                <div className="flex items-center justify-center ml-2">
                  <button
                    onClick={(e) => toggleWatchlist(result.id, e)}
                    className="w-10 h-10 rounded-full bg-[#2C2C2E] flex items-center justify-center"
                  >
                    {result.inWatchlist ? (
                      <Check size={20} className="text-[#F2994A]" />
                    ) : (
                      <Plus size={20} className="text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {results.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <SearchIcon className="w-12 h-12 text-[#333333] mb-4" />
            <h3 className="text-lg font-medium mb-2">No results found</h3>
            <p className="text-sm text-[#8E8E93] max-w-xs">
              We couldn't find any matches for "{query}". Try different keywords or check for typos.
            </p>
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
