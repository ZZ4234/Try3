"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Heart, Play, Star, Plus, Check, Users, ChevronRight, Share2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ContentDetailPage({ params }: { params: { id: string } }) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [safeAreaBottom, setSafeAreaBottom] = useState(0)
  const [safeAreaTop, setSafeAreaTop] = useState(47) // Default iOS status bar height
  const router = useRouter()

  // Add state for confetti animation
  const [showConfetti, setShowConfetti] = useState(false)

  // Update the heart icon to be filled when clicked
  // Add state to track if the heart is filled
  const [isLoved, setIsLoved] = useState(false)

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

      // Check if coming from watchlist
      const searchParams = new URLSearchParams(window.location.search)
      if (searchParams.get("from") === "watchlist") {
        setIsInWatchlist(true)
      }
    }
  }, [])

  // Mock content data - in a real app, this would come from an API
  const content = {
    id: params.id,
    title: "Interstellar",
    year: "2014",
    duration: "2h 49m",
    imdbRating: "8.6",
    genre: "Adventure, Drama, Sci-Fi",
    description:
      "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans. The mission takes them through a wormhole in search of a planet that can sustain life.",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Matt Damon"],
    streamingOn: [
      { name: "Netflix", logo: "/placeholder.svg?height=40&width=40" },
      { name: "Amazon Prime", logo: "/placeholder.svg?height=40&width=40" },
      { name: "HBO Max", logo: "/placeholder.svg?height=40&width=40" },
    ],
    friendsWhoRecommended: [
      {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 9,
        comment: "Absolutely mind-blowing! The visuals and soundtrack are incredible. One of Nolan's best works.",
      },
      {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 8.5,
        comment: "Great sci-fi with emotional depth. The time dilation scenes really make you think.",
      },
      {
        name: "Alex Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 10,
        comment: "A masterpiece! The perfect blend of science, emotion, and stunning cinematography.",
      },
    ],
    similar: [1, 2, 3, 4],
  }

  const toggleWatchlist = () => {
    // If the item is loved, don't allow adding back to watchlist directly
    if (isLoved) {
      alert("This item is in your Loved list. You can move it back to your Watchlist from the Loved section.")
      return
    }

    setIsInWatchlist(!isInWatchlist)
  }

  const handleRecommend = () => {
    router.push(`/send-recommendation?contentId=${params.id}`)
  }

  // Update the handleLovedIt function to remove from watchlist
  const handleLovedIt = () => {
    // Toggle the loved state
    setIsLoved(true)

    // If it was in the watchlist, remove it
    if (isInWatchlist) {
      setIsInWatchlist(false)

      // In a real app, you would update the global state or make an API call
      // to move the item from watchlist to loved list
      console.log(`Removed ${content.title} from watchlist and added to loved list`)
    }

    // Show confetti animation
    setShowConfetti(true)

    // Hide confetti after 3 seconds
    setTimeout(() => {
      setShowConfetti(false)
    }, 3000)
  }

  const viewWatchlist = () => {
    router.push("/home")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] text-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative h-72 w-full">
          <Image
            src="/placeholder.svg?height=288&width=414"
            alt={content.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#00000080]"></div>
        </div>

        {/* iOS-style status bar - would be handled by native iOS in a real app */}
        <div className="absolute top-0 left-0 right-0 h-[47px]"></div>

        {/* iOS-style navigation bar */}
        <div className="absolute left-4 right-4 flex justify-between items-center" style={{ top: `${safeAreaTop}px` }}>
          <button onClick={() => router.back()} className="flex items-center text-white min-h-[44px] px-2">
            <ArrowLeft size={20} className="mr-1" />
            <span className="text-[17px]">Back</span>
          </button>
          {/* Removed the recommend button from here */}
          <div className="w-10"></div> {/* Empty div for spacing */}
        </div>

        {/* Play Button */}
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F2994A] rounded-full p-4 min-h-[44px] min-w-[44px] flex items-center justify-center">
          <Play size={24} fill="white" />
        </button>

        {/* Content Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-bold">{content.title}</h1>
          <div className="flex items-center mt-1 text-[15px] text-[#8E8E93]">
            <span>{content.year}</span>
            <span className="mx-2">•</span>
            <span>{content.duration}</span>
          </div>
        </div>
      </div>

      <main className="flex-1 p-4">
        {/* IMDB Rating */}
        <div className="flex items-center mb-4 bg-[#1C1C1E] p-3 rounded-xl">
          <div className="flex items-center">
            <Star size={20} className="text-[#FFCC00]" fill="#FFCC00" />
            <span className="ml-2 text-lg font-bold">{content.imdbRating}</span>
          </div>
          <span className="mx-2 text-[#8E8E93]">|</span>
          <span className="text-[15px] text-[#8E8E93]">IMDb Rating</span>
        </div>

        {/* Action Buttons - iOS style with proper touch targets */}
        <div className="flex justify-between mb-6">
          {/* Update the heart button in the Action Buttons section */}
          <button className="flex-1 flex flex-col items-center min-h-[44px] justify-center" onClick={handleLovedIt}>
            <Heart size={24} className="text-white" fill={isLoved ? "#F2994A" : "none"} />
            <span className="text-[13px] mt-1">Loved it</span>
          </button>
          <button
            className={`flex-1 flex flex-col items-center min-h-[44px] justify-center ${isLoved ? "opacity-50" : ""}`}
            onClick={toggleWatchlist}
            disabled={isLoved}
          >
            {isInWatchlist ? (
              <>
                <Check size={24} className="text-[#34C759]" />
                <span className="text-[13px] mt-1">Added</span>
              </>
            ) : (
              <>
                <Plus size={24} className="text-white" />
                <span className="text-[13px] mt-1">Watchlist</span>
              </>
            )}
          </button>
          <button className="flex-1 flex flex-col items-center min-h-[44px] justify-center" onClick={handleRecommend}>
            <Share2 size={24} className="text-white" />
            <span className="text-[13px] mt-1">Recommend</span>
          </button>
        </div>

        {/* Available on */}
        <div className="mb-6">
          <h3 className="text-[17px] font-semibold mb-3">Available on</h3>
          <div className="flex space-x-4 overflow-x-auto -mx-4 px-4">
            {content.streamingOn.map((service, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-xl bg-[#1C1C1E] overflow-hidden mb-2 flex items-center justify-center">
                  <Image
                    src={service.logo || "/placeholder.svg"}
                    alt={service.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <span className="text-[13px] text-center">{service.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Genre Tags - iOS style */}
        <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto -mx-4 px-4">
          {content.genre.split(", ").map((genre, index) => (
            <span key={index} className="px-3 py-1.5 bg-[#1C1C1E] rounded-full text-[13px] whitespace-nowrap">
              {genre}
            </span>
          ))}
        </div>

        {/* Synopsis */}
        <div className="mb-6">
          <h3 className="text-[17px] font-semibold mb-2">Synopsis</h3>
          <p className="text-[15px] text-[#8E8E93]">
            {showFullDescription ? content.description : `${content.description.substring(0, 120)}...`}
          </p>
          <button
            className="text-[#F2994A] text-[15px] mt-2 min-h-[44px] flex items-center"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Show Less" : "Read More"}
          </button>
        </div>

        {/* Friends who recommended - iOS style list */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <h3 className="text-[17px] font-semibold">Friends who recommended</h3>
              <Users className="ml-2 text-[#8E8E93]" size={18} />
            </div>
            <ChevronRight size={20} className="text-[#8E8E93]" />
          </div>
          <div className="bg-[#1C1C1E] rounded-xl overflow-hidden">
            {content.friendsWhoRecommended.length > 0 ? (
              <div>
                {content.friendsWhoRecommended.map((friend, index) => (
                  <div
                    key={index}
                    className={`p-3 min-h-[44px] ${
                      index < content.friendsWhoRecommended.length - 1 ? "border-b border-[#38383A]" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className="w-10 h-10 rounded-full overflow-hidden mr-3 cursor-pointer"
                        onClick={() => router.push(`/profile/friend/${index + 1}`)}
                      >
                        <Image
                          src={friend.avatar || "/placeholder.svg"}
                          alt={friend.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <p
                            className="text-[15px] mr-2 cursor-pointer hover:text-[#F2994A]"
                            onClick={() => router.push(`/profile/friend/${index + 1}`)}
                          >
                            {friend.name}
                          </p>
                          <div className="flex items-center bg-[#2C2C2E] px-2 py-1 rounded-md">
                            <Star size={12} className="text-[#FFCC00] fill-[#FFCC00] mr-1" />
                            <span className="text-[15px]">{friend.rating}</span>
                          </div>
                        </div>
                        <p className="text-[13px] text-[#8E8E93]">Recommended 2 days ago</p>
                      </div>
                    </div>
                    {friend.comment && (
                      <div className="mt-2 bg-[#2C2C2E] p-3 rounded-lg">
                        <p className="text-[14px] text-[#E0E0E0] italic">"{friend.comment}"</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[15px] text-[#8E8E93] p-4">None of your friends have recommended this yet.</p>
            )}
          </div>
        </div>

        {/* Cast - iOS style horizontal scroll */}
        <div className="mb-6">
          <h3 className="text-[17px] font-semibold mb-3">Cast</h3>
          <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4">
            {content.cast.map((actor, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#1C1C1E] overflow-hidden mb-2">
                  <Image
                    src={`/placeholder.svg?height=64&width=64`}
                    alt={actor}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <span className="text-[13px] text-center whitespace-nowrap">{actor}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Confetti Animation Overlay */}
      {showConfetti && (
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
              <h3 className="text-xl font-bold mb-2">You loved {content.title}!</h3>

              {content.friendsWhoRecommended.length > 0 ? (
                <p className="text-[#8E8E93] mb-4">
                  We've notified {content.friendsWhoRecommended.map((r) => r.name).join(", ")} that you loved their
                  recommendation!
                </p>
              ) : (
                <p className="text-[#8E8E93] mb-4">This title has been added to your loved list!</p>
              )}

              {isInWatchlist && (
                <p className="text-[#8E8E93] mb-4">
                  This item has been removed from your watchlist and added to your loved list.
                </p>
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

      {/* Add to Watchlist Button (Fixed at bottom) - iOS style with safe area */}
      {!isInWatchlist && !isLoved ? (
        <div className="p-4 border-t border-[#38383A]" style={{ paddingBottom: `${safeAreaBottom + 16}px` }}>
          <button
            onClick={toggleWatchlist}
            className="w-full py-3.5 bg-[#F2994A] text-white rounded-xl font-medium flex items-center justify-center min-h-[44px]"
          >
            <Plus size={20} className="mr-2" />
            <span>Add to Watchlist</span>
          </button>
        </div>
      ) : isLoved ? (
        <div className="p-4 border-t border-[#38383A]" style={{ paddingBottom: `${safeAreaBottom + 16}px` }}>
          <button
            onClick={viewWatchlist}
            className="w-full py-3.5 bg-[#1C1C1E] text-white rounded-xl font-medium min-h-[44px]"
          >
            View Loved List
          </button>
        </div>
      ) : (
        <div className="p-4 border-t border-[#38383A]" style={{ paddingBottom: `${safeAreaBottom + 16}px` }}>
          <button
            onClick={viewWatchlist}
            className="w-full py-3.5 bg-[#1C1C1E] text-white rounded-xl font-medium min-h-[44px]"
          >
            Back to Watchlist
          </button>
        </div>
      )}
    </div>
  )
}
