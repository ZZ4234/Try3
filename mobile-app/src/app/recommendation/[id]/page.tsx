"use client"

import { useState } from "react"
import { ArrowLeft, Star, Plus, Check, MessageCircle } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function RecommendationDetailPage({ params }: { params: { id: string } }) {
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const router = useRouter()

  // Mock recommendation data - in a real app, this would come from an API
  const recommendation = {
    id: params.id,
    title: "The Dark Knight",
    year: "2008",
    duration: "2h 32m",
    genre: "Action, Crime, Drama",
    image: "/placeholder.svg?height=240&width=160",
    sender: {
      name: "Marcus Johnson",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    rating: 9,
    comment:
      "Best superhero movie ever made! The Joker's performance is legendary. This is definitely a must-watch if you're into action movies with deep character development and amazing performances.",
    time: "2 hours ago",
  }

  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist)
  }

  const viewContent = () => {
    router.push(`/content/${recommendation.id}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e] text-white">
      <header className="p-4">
        <button onClick={() => router.back()} className="flex items-center text-[#bdbdbd]">
          <ArrowLeft size={20} className="mr-2" />
          <span>Back</span>
        </button>
      </header>

      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-6">Recommendation</h1>

        {/* Sender Info */}
        <div className="flex items-center mb-6">
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
            <Image
              src={recommendation.sender.avatar || "/placeholder.svg"}
              alt={recommendation.sender.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{recommendation.sender.name}</p>
            <p className="text-sm text-[#bdbdbd]">Recommended {recommendation.time}</p>
          </div>
        </div>

        {/* Content Preview */}
        <div className="flex mb-6" onClick={viewContent}>
          <div className="relative w-24 h-36 mr-4">
            <Image
              src={recommendation.image || "/placeholder.svg"}
              alt={recommendation.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{recommendation.title}</h2>
            <div className="flex items-center mt-1 text-sm text-[#bdbdbd]">
              <span>{recommendation.year}</span>
              <span className="mx-2">•</span>
              <span>{recommendation.duration}</span>
            </div>
            <p className="text-sm text-[#bdbdbd] mt-1">{recommendation.genre}</p>

            <div className="flex items-center mt-3 bg-[#212121] rounded-lg px-3 py-2">
              <Star size={18} className="text-[#f2994a] fill-[#f2994a]" />
              <span className="ml-2 font-bold">{recommendation.rating}/10</span>
              <span className="ml-2 text-sm text-[#bdbdbd]">Rating</span>
            </div>
          </div>
        </div>

        {/* Comment */}
        {recommendation.comment && (
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <MessageCircle size={18} className="text-[#bdbdbd] mr-2" />
              <h3 className="text-lg font-semibold">Comment</h3>
            </div>
            <div className="bg-[#212121] p-4 rounded-lg">
              <p className="text-[#bdbdbd]">"{recommendation.comment}"</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button onClick={viewContent} className="py-3 bg-[#ff3b30] text-white rounded-md font-medium">
            View Details
          </button>
          <button
            onClick={toggleWatchlist}
            className={`py-3 rounded-md font-medium flex items-center justify-center ${
              isInWatchlist ? "bg-[#212121] border border-[#ff3b30] text-[#ff3b30]" : "bg-[#212121] text-white"
            }`}
          >
            {isInWatchlist ? (
              <>
                <Check size={18} className="mr-2" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus size={18} className="mr-2" />
                <span>Add to Watchlist</span>
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  )
}
