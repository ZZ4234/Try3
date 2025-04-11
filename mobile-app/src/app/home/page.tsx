"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bell, Home, Search, User, Trash2, Share2, Star, Plus, Filter, Check, Heart, Quote } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [filterType, setFilterType] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [safeAreaBottom, setSafeAreaBottom] = useState(0)
  const [notificationCount, setNotificationCount] = useState(3) // Mock notification count
  const scrollRef = useRef<HTMLDivElement>(null)
  const startY = useRef(0)
  const router = useRouter()

  // Add a new state variable for sorting
  const [sortMethod, setSortMethod] = useState("recent") // Default to most recently added
  const [showSortOptions, setShowSortOptions] = useState(false)

  // Add state for confetti animation
  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiItem, setConfettiItem] = useState(null)

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

  // Mock watchlist data with recommendations and platforms
  const [watchlist, setWatchlist] = useState([
    {
      id: 1,
      title: "The Dark Knight",
      type: "Movie",
      year: "2008",
      image: "/placeholder.svg?height=240&width=160",
      addedDate: "Added 2 weeks ago",
      rating: 9.2,
      isLiked: true,
      recommendedBy: [
        {
          name: "Marcus Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 9,
          comment: "Best superhero movie ever made! The Joker's performance is legendary.",
        },
        {
          name: "Sarah Lee",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 10,
          comment: "A masterpiece of cinema. The dark tone and complex characters make it stand out.",
        },
      ],
      platforms: [
        { name: "Netflix", logo: "/placeholder.svg?height=30&width=30" },
        { name: "HBO Max", logo: "/placeholder.svg?height=30&width=30" },
      ],
    },
    {
      id: 2,
      title: "Breaking Bad",
      type: "TV Series",
      year: "2008-2013",
      image: "/placeholder.svg?height=240&width=160",
      addedDate: "Added 1 month ago",
      rating: 9.5,
      isLiked: false,
      recommendedBy: [
        {
          name: "Alex Rodriguez",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 9.5,
          comment: "One of the greatest TV shows of all time. The character development is incredible!",
        },
      ],
      platforms: [{ name: "Netflix", logo: "/placeholder.svg?height=30&width=30" }],
    },
    {
      id: 3,
      title: "Inception",
      type: "Movie",
      year: "2010",
      image: "/placeholder.svg?height=240&width=160",
      addedDate: "Added 3 days ago",
      rating: 8.8,
      isLiked: true,
      recommendedBy: [],
      platforms: [
        { name: "Amazon Prime", logo: "/placeholder.svg?height=30&width=30" },
        { name: "Apple TV+", logo: "/placeholder.svg?height=30&width=30" },
        { name: "HBO Max", logo: "/placeholder.svg?height=30&width=30" },
      ],
    },
    {
      id: 4,
      title: "Stranger Things",
      type: "TV Series",
      year: "2016-Present",
      image: "/placeholder.svg?height=240&width=160",
      addedDate: "Added yesterday",
      rating: 8.7,
      isLiked: false,
      recommendedBy: [
        {
          name: "Sophia Chen",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 8,
          comment: "You'll love the 80s nostalgia and the supernatural elements!",
        },
        {
          name: "David Kim",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 9,
          comment: "Great storyline and amazing character development. Season 4 is the best!",
        },
      ],
      platforms: [{ name: "Netflix", logo: "/placeholder.svg?height=30&width=30" }],
    },
    {
      id: 5,
      title: "The Mandalorian",
      type: "TV Series",
      year: "2019-Present",
      image: "/placeholder.svg?height=240&width=160",
      addedDate: "Added 1 week ago",
      rating: 8.7,
      isLiked: true,
      recommendedBy: [
        {
          name: "Raj Patel",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 9,
          comment: "If you're a Star Wars fan, this is a must-watch. Baby Yoda steals the show!",
        },
      ],
      platforms: [{ name: "Disney+", logo: "/placeholder.svg?height=30&width=30" }],
    },
    {
      id: 6,
      title: "Dune",
      type: "Movie",
      year: "2021",
      image: "/placeholder.svg?height=240&width=160",
      addedDate: "Added 5 days ago",
      rating: 8.0,
      isLiked: false,
      recommendedBy: [],
      platforms: [
        { name: "HBO Max", logo: "/placeholder.svg?height=30&width=30" },
        { name: "Amazon Prime", logo: "/placeholder.svg?height=30&width=30" },
      ],
    },
  ])

  // New state for loved items - initialize with some sample data
  const [lovedList, setLovedList] = useState([
    {
      id: 101,
      title: "Interstellar",
      type: "Movie",
      year: "2014",
      image: "/placeholder.svg?height=240&width=160",
      addedDate: "Loved 1 week ago",
      rating: 9.0,
      isLiked: true,
      recommendedBy: [
        {
          name: "Michael Chen",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 9.5,
          comment: "A masterpiece of sci-fi cinema. The visuals and soundtrack are incredible!",
        },
      ],
      platforms: [
        { name: "Netflix", logo: "/placeholder.svg?height=30&width=30" },
        { name: "Amazon Prime", logo: "/placeholder.svg?height=30&width=30" },
      ],
    },
    {
      id: 102,
      title: "The Queen's Gambit",
      type: "TV Series",
      year: "2020",
      image: "/placeholder.svg?height=240&width=160",
      addedDate: "Loved 2 weeks ago",
      rating: 8.8,
      isLiked: true,
      recommendedBy: [
        {
          name: "Sarah Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 9.0,
          comment: "Absolutely loved this! The acting and storytelling are phenomenal.",
        },
      ],
      platforms: [{ name: "Netflix", logo: "/placeholder.svg?height=30&width=30" }],
    },
  ])

  // Handle pull-to-refresh (iOS style)
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchY = e.touches[0].clientY
    const scrollTop = scrollRef.current?.scrollTop || 0

    // Only trigger refresh if at the top of the scroll and pulling down
    if (scrollTop <= 0 && touchY > startY.current + 50) {
      setIsRefreshing(true)
      e.preventDefault()
    }
  }

  const handleTouchEnd = () => {
    if (isRefreshing) {
      // Simulate refresh
      setTimeout(() => {
        setIsRefreshing(false)
      }, 1000)
    }
  }

  const deleteItem = (id: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation() // Prevent navigation to detail page
    }

    // Show iOS-style confirmation
    if (confirm("Remove this item from your watchlist?")) {
      setWatchlist(watchlist.filter((item) => item.id !== id))
    }
  }

  const deleteLovedItem = (id: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation() // Prevent navigation to detail page
    }

    // Show iOS-style confirmation
    if (confirm("Remove this item from your loved list?")) {
      setLovedList(lovedList.filter((item) => item.id !== id))
    }
  }

  const recommendItem = (id: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation() // Prevent navigation to detail page
    }
    router.push(`/send-recommendation?contentId=${id}`)
  }

  const toggleLiked = (id: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation() // Prevent navigation to detail page
    }

    const item = watchlist.find((item) => item.id === id)

    if (item) {
      // Always mark as loved and move to loved list
      const updatedItem = { ...item, isLiked: true, addedDate: "Loved just now" }
      setLovedList([...lovedList, updatedItem])
      // Remove from watchlist
      setWatchlist(watchlist.filter((item) => item.id !== id))

      // Show confetti animation
      setConfettiItem(item)
      setShowConfetti(true)

      // Hide confetti after 3 seconds
      setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
    }
  }

  // Add function to move item back to watchlist
  const moveToWatchlist = (id: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation() // Prevent navigation to detail page
    }

    const item = lovedList.find((item) => item.id === id)

    if (item) {
      // Add to watchlist
      const updatedItem = { ...item, isLiked: false, addedDate: "Added just now" }
      setWatchlist([...watchlist, updatedItem])
      // Remove from loved list
      setLovedList(lovedList.filter((item) => item.id !== id))
    }
  }

  // Update the handleItemClick function to pass the source parameter
  const handleItemClick = (id: number) => {
    router.push(`/content/${id}?from=watchlist`)
  }

  // Filter watchlist based on type
  const filteredWatchlist =
    filterType === "all"
      ? watchlist
      : watchlist.filter((item) => item.type.toLowerCase().includes(filterType.toLowerCase()))

  // Sort watchlist based on selected method
  const sortWatchlist = (items) => {
    switch (sortMethod) {
      case "rating":
        return [...items].sort((a, b) => b.rating - a.rating)
      case "platform":
        return [...items].sort((a, b) => {
          // Sort by first platform name
          const platformA = a.platforms[0]?.name || ""
          const platformB = b.platforms[0]?.name || ""
          return platformA.localeCompare(platformB)
        })
      case "recommended":
        return [...items].sort((a, b) => {
          // Sort by number of recommendations (most first)
          return b.recommendedBy.length - a.recommendedBy.length
        })
      case "recent":
      default:
        // Already sorted by most recent in our mock data
        return items
    }
  }

  // Apply sorting to the filtered watchlist
  const sortedWatchlist = sortWatchlist(filteredWatchlist)

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] text-white">
      {/* iOS-style status bar - would be handled by native iOS in a real app */}
      <div className="h-[47px] bg-[#000000]"></div>

      {/* iOS-style navigation bar */}
      <header className="px-4 py-2 bg-[#000000] flex justify-between items-center">
        <div className="w-20"></div>
        <h1 className="text-[24px] font-bold text-center flex-1">My Watchlist</h1>
        <div className="w-20 flex justify-end">
          <div className="relative">
            <Link href="/notifications">
              <Bell className="w-6 h-6" />
              {notificationCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-[#FF3B30] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {notificationCount}
                </div>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* iOS-style segmented control for filters */}
      <div className="px-4 py-3 bg-[#000000]">
        <div className="flex justify-between items-center mb-3">
          <div className="flex bg-[#1C1C1E] rounded-lg p-1 overflow-hidden flex-1 mr-3">
            {["All", "Movies", "TV Series"].map((type) => (
              <button
                key={type}
                className={`flex-1 py-2 text-[13px] font-medium rounded-md ${
                  filterType === type.toLowerCase() || (filterType === "all" && type === "All")
                    ? "bg-[#2C2C2E] text-white"
                    : "text-[#8E8E93]"
                }`}
                onClick={() => setFilterType(type === "All" ? "all" : type.toLowerCase())}
              >
                {type}
              </button>
            ))}
          </div>
          <button
            className="bg-[#1C1C1E] p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setShowSortOptions(!showSortOptions)}
          >
            <Filter size={20} className="text-[#8E8E93]" />
          </button>
        </div>

        {/* Sort options */}
        {showSortOptions && (
          <div className="bg-[#1C1C1E] rounded-lg p-3 mb-3 animate-in fade-in duration-200">
            <p className="text-[15px] font-medium mb-2">Sort by:</p>
            <div className="space-y-2">
              {[
                { id: "recent", label: "Recently Added" },
                { id: "rating", label: "Highest Rating" },
                { id: "platform", label: "Streaming Platform" },
                { id: "recommended", label: "Who Recommended" },
              ].map((option) => (
                <button
                  key={option.id}
                  className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between ${
                    sortMethod === option.id ? "bg-[#2C2C2E]" : ""
                  }`}
                  onClick={() => {
                    setSortMethod(option.id)
                    setShowSortOptions(false)
                  }}
                >
                  <span className="text-[15px]">{option.label}</span>
                  {sortMethod === option.id && <Check size={18} className="text-[#F2994A]" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pull-to-refresh indicator */}
      {isRefreshing && (
        <div className="flex justify-center items-center py-4">
          <div className="w-8 h-8 border-4 border-[#333333] border-t-[#F2994A] rounded-full animate-spin"></div>
        </div>
      )}

      <main
        className="flex-1 p-4 overflow-auto"
        ref={scrollRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {sortedWatchlist.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 mb-8">
            {sortedWatchlist.map((item) => (
              <div
                key={item.id}
                className="bg-[#1C1C1E] rounded-xl overflow-hidden relative"
                onClick={() => handleItemClick(item.id)}
              >
                <div className="flex">
                  <div className="relative w-28 h-40">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    <div className="absolute top-2 right-2 bg-[#0e0e0e80] px-2 py-1 rounded-md flex items-center">
                      <Star size={12} className="text-[#FFCC00] fill-[#FFCC00] mr-1" />
                      <span className="text-xs">{item.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-[17px]">{item.title}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-[13px] text-[#8E8E93] mr-2">{item.type}</span>
                        <span className="text-[13px] text-[#8E8E93]">{item.year}</span>
                      </div>

                      {/* Platforms */}
                      <div className="mt-2">
                        <p className="text-[13px] text-[#8E8E93] mb-1">Available on:</p>
                        <div className="flex flex-wrap gap-1">
                          {item.platforms.map((platform, idx) => (
                            <div
                              key={idx}
                              className="w-7 h-7 rounded-full bg-[#2C2C2E] overflow-hidden flex items-center justify-center"
                            >
                              <Image
                                src={platform.logo || "/placeholder.svg"}
                                alt={platform.name}
                                width={20}
                                height={20}
                                className="object-contain"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Friend Recommendation Text */}
                      {item.recommendedBy.length > 0 && item.recommendedBy[0].comment && (
                        <div className="mt-3 bg-[#2C2C2E] rounded-lg p-2">
                          <div className="flex items-start">
                            <Quote size={16} className="text-[#F2994A] mr-1 mt-0.5 flex-shrink-0" />
                            <div>
                              <p
                                className="text-[13px] text-white font-medium cursor-pointer hover:text-[#F2994A]"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  router.push(`/profile/friend/1`)
                                }}
                              >
                                {item.recommendedBy[0].name} says:
                              </p>
                              <p className="text-[12px] text-[#8E8E93] line-clamp-2">
                                "{item.recommendedBy[0].comment}"
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Recommendations */}
                      {item.recommendedBy.length > 0 && (
                        <div className="mt-3">
                          <p className="text-[13px] text-[#8E8E93] mb-1">Recommended by:</p>
                          <div className="flex flex-wrap gap-2">
                            {item.recommendedBy.map((person, idx) => (
                              <div
                                key={idx}
                                className="flex items-center bg-[#2C2C2E] rounded-full px-2 py-1 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  router.push(`/profile/friend/${idx + 1}`)
                                }}
                              >
                                <div className="w-4 h-4 rounded-full overflow-hidden mr-1">
                                  <Image
                                    src={person.avatar || "/placeholder.svg"}
                                    alt={person.name}
                                    width={16}
                                    height={16}
                                    className="object-cover"
                                  />
                                </div>
                                <span className="text-[13px] mr-1">{person.name}</span>
                                <div className="flex items-center">
                                  <Star size={8} className="text-[#FFCC00] fill-[#FFCC00]" />
                                  <span className="text-[13px] ml-0.5">{person.rating}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-3 flex flex-col space-y-3 items-center">
                    <button
                      onClick={(e) => recommendItem(item.id, e)}
                      className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px]"
                      aria-label="Recommend"
                    >
                      <Share2 size={20} className="text-[#F2994A] mb-1" />
                      <span className="text-[10px] text-[#F2994A]">Recommend</span>
                    </button>

                    <button
                      onClick={(e) => toggleLiked(item.id, e)}
                      className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px]"
                      aria-label="Loved it"
                    >
                      <Heart size={20} className="text-[#F2994A] mb-1" fill={item.isLiked ? "#F2994A" : "none"} />
                      <span className="text-[10px] text-[#F2994A]">Loved it</span>
                    </button>

                    <button
                      onClick={(e) => deleteItem(item.id, e)}
                      className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px]"
                      aria-label="Delete"
                    >
                      <Trash2 size={20} className="text-[#F2994A] mb-1" />
                      <span className="text-[10px] text-[#F2994A]">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[#2C2C2E] flex items-center justify-center mb-4">
              <Plus size={24} className="text-[#8E8E93]" />
            </div>
            <h3 className="text-[20px] font-medium mb-2">Your watchlist is empty</h3>
            <p className="text-[15px] text-[#8E8E93] max-w-xs mb-6">
              Add movies and TV shows to your watchlist to keep track of what you want to watch.
            </p>
            <button
              onClick={() => router.push("/search")}
              className="px-6 py-3 bg-[#F2994A] text-white rounded-full font-medium min-h-[44px]"
            >
              Browse Content
            </button>
          </div>
        )}

        {/* Loved Content Section */}
        {lovedList.length > 0 && (
          <div className="mt-4 mb-8">
            <h2 className="text-[24px] font-bold mb-4">Loved Content</h2>
            <div className="grid grid-cols-1 gap-4">
              {lovedList.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#1C1C1E] rounded-xl overflow-hidden relative"
                  onClick={() => handleItemClick(item.id)}
                >
                  <div className="flex">
                    <div className="relative w-28 h-40">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      <div className="absolute top-2 right-2 bg-[#0e0e0e80] px-2 py-1 rounded-md flex items-center">
                        <Star size={12} className="text-[#FFCC00] fill-[#FFCC00] mr-1" />
                        <span className="text-xs">{item.rating.toFixed(1)}</span>
                      </div>
                      {/* Add a heart icon overlay to indicate loved status */}
                      <div className="absolute top-2 left-2 bg-[#0e0e0e80] p-1 rounded-full">
                        <Heart size={16} className="text-[#F2994A]" fill="#F2994A" />
                      </div>
                    </div>

                    <div className="flex-1 p-3 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-[17px]">{item.title}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-[13px] text-[#8E8E93] mr-2">{item.type}</span>
                          <span className="text-[13px] text-[#8E8E93]">{item.year}</span>
                        </div>
                        <p className="text-[13px] text-[#F2994A] mt-1">{item.addedDate}</p>

                        {/* Platforms */}
                        <div className="mt-2">
                          <p className="text-[13px] text-[#8E8E93] mb-1">Available on:</p>
                          <div className="flex flex-wrap gap-1">
                            {item.platforms.map((platform, idx) => (
                              <div
                                key={idx}
                                className="w-7 h-7 rounded-full bg-[#2C2C2E] overflow-hidden flex items-center justify-center"
                              >
                                <Image
                                  src={platform.logo || "/placeholder.svg"}
                                  alt={platform.name}
                                  width={20}
                                  height={20}
                                  className="object-contain"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Friend Recommendation Text */}
                        {item.recommendedBy.length > 0 && item.recommendedBy[0].comment && (
                          <div className="mt-3 bg-[#2C2C2E] rounded-lg p-2">
                            <div className="flex items-start">
                              <Quote size={16} className="text-[#F2994A] mr-1 mt-0.5 flex-shrink-0" />
                              <div>
                                <p
                                  className="text-[13px] text-white font-medium cursor-pointer hover:text-[#F2994A]"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    router.push(`/profile/friend/1`)
                                  }}
                                >
                                  {item.recommendedBy[0].name} says:
                                </p>
                                <p className="text-[12px] text-[#8E8E93] line-clamp-2">
                                  "{item.recommendedBy[0].comment}"
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-3 flex flex-col space-y-3 items-center">
                      <button
                        onClick={(e) => recommendItem(item.id, e)}
                        className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px]"
                        aria-label="Recommend"
                      >
                        <Share2 size={20} className="text-[#F2994A] mb-1" />
                        <span className="text-[10px] text-[#F2994A]">Recommend</span>
                      </button>

                      <button
                        onClick={(e) => moveToWatchlist(item.id, e)}
                        className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px]"
                        aria-label="Add to Watchlist"
                      >
                        <Plus size={20} className="text-[#F2994A] mb-1" />
                        <span className="text-[10px] text-[#F2994A]">Watchlist</span>
                      </button>

                      <button
                        onClick={(e) => deleteLovedItem(item.id, e)}
                        className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px]"
                        aria-label="Delete"
                      >
                        <Trash2 size={20} className="text-[#F2994A] mb-1" />
                        <span className="text-[10px] text-[#F2994A]">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Confetti Animation Overlay */}
      {showConfetti && confettiItem && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 p-6">
          <div className="bg-[#1C1C1E] rounded-xl p-6 max-w-sm w-full relative overflow-hidden">
            {/* Confetti animation */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-10%`,
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                    borderRadius: "50%",
                    transform: `rotate(${Math.random() * 360}deg)`,
                    animationDuration: `${Math.random() * 2 + 1}s`,
                    animationDelay: `${Math.random() * 0.5}s`,
                  }}
                />
              ))}
            </div>

            <div className="text-center relative z-10">
              <Heart size={60} className="text-[#F2994A] mx-auto mb-4" fill="#F2994A" />
              <h3 className="text-xl font-bold mb-2">You loved {confettiItem.title}!</h3>

              {confettiItem.recommendedBy.length > 0 ? (
                <p className="text-[#8E8E93] mb-4">
                  We've notified {confettiItem.recommendedBy.map((r) => r.name).join(", ")} that you loved their
                  recommendation!
                </p>
              ) : (
                <p className="text-[#8E8E93] mb-4">This title has been added to your loved list!</p>
              )}

              <button
                onClick={() => setShowConfetti(false)}
                className="w-full py-3 bg-[#F2994A] text-white rounded-xl font-medium"
              >
                Great!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS-style tab bar with safe area padding for home indicator */}
      <nav
        className="grid grid-cols-4 bg-[#1C1C1E] border-t border-[#38383A] py-2"
        style={{ paddingBottom: `${safeAreaBottom}px` }}
      >
        {[
          { icon: <Home className="w-6 h-6" />, label: "Home", id: "home", path: "/home" },
          { icon: <Search className="w-6 h-6" />, label: "Search", id: "search", path: "/search" },
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
              item.id === "home" ? "text-[#F2994A]" : "text-[#8E8E93]"
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
