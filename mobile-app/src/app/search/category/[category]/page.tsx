"use client"

import { useState } from "react"
import { SearchIcon, ArrowLeft, Star, Home, Bell, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useParams } from "next/navigation"

export default function CategoryPage() {
  const params = useParams()
  const category = typeof params.category === "string" ? params.category : ""
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)
  const [activeFilter, setActiveFilter] = useState("All")
  const router = useRouter()

  // Mock category results
  const results = [
    {
      id: 1,
      title: "The Dark Knight",
      type: "Movie",
      year: "2008",
      rating: 9.0,
      image: "/placeholder.svg?height=240&width=160",
    },
    {
      id: 2,
      title: "Breaking Bad",
      type: "TV Series",
      year: "2008-2013",
      rating: 9.5,
      image: "/placeholder.svg?height=240&width=160",
    },
    {
      id: 3,
      title: "Inception",
      type: "Movie",
      year: "2010",
      rating: 8.8,
      image: "/placeholder.svg?height=240&width=160",
    },
    {
      id: 4,
      title: "Stranger Things",
      type: "TV Series",
      year: "2016-Present",
      rating: 8.7,
      image: "/placeholder.svg?height=240&width=160",
    },
    {
      id: 5,
      title: "The Shawshank Redemption",
      type: "Movie",
      year: "1994",
      rating: 9.3,
      image: "/placeholder.svg?height=240&width=160",
    },
    {
      id: 6,
      title: "Game of Thrones",
      type: "TV Series",
      year: "2011-2019",
      rating: 9.2,
      image: "/placeholder.svg?height=240&width=160",
    },
  ]

  const filters = ["All", "Popular", "New", "Top Rated"]

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e] text-white">
      <header className="p-4 bg-[#0e101f]">
        <div className="flex items-center gap-3">
          <Link href="/search">
            <ArrowLeft className="w-6 h-6 text-[#bdbdbd]" />
          </Link>
          <h1 className="text-xl font-bold">{formattedCategory}</h1>
          <div className="ml-auto">
            <Link href="/search">
              <SearchIcon className="w-6 h-6 text-[#bdbdbd]" />
            </Link>
          </div>
        </div>
      </header>

      <div className="px-4 py-3 bg-[#161616]">
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                filter === activeFilter ? "bg-[#ff3b30] text-white" : "bg-[#212121] text-[#bdbdbd]"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            {formattedCategory} ({results.length})
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-[#212121] rounded-lg overflow-hidden"
              onClick={() => router.push(`/content/${result.id}`)}
            >
              <div className="relative aspect-[2/3]">
                <Image src={result.image || "/placeholder.svg"} alt={result.title} fill className="object-cover" />
                <div className="absolute top-2 right-2 bg-[#0e0e0e80] px-2 py-1 rounded-md flex items-center">
                  <Star className="w-3 h-3 text-[#ff3b30] mr-1" />
                  <span className="text-xs">{result.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm truncate">{result.title}</h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-[#bdbdbd] mr-2">{result.type}</span>
                  <span className="text-xs text-[#bdbdbd]">{result.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="grid grid-cols-4 bg-[#212121] border-t border-[#262626] py-2">
        {[
          { icon: <Home className="w-6 h-6" />, label: "Home", id: "home", path: "/home" },
          { icon: <SearchIcon className="w-6 h-6" />, label: "Search", id: "search", path: "/search" },
          { icon: <Bell className="w-6 h-6" />, label: "Notifications", id: "notifications", path: "/notifications" },
          { icon: <User className="w-6 h-6" />, label: "Profile", id: "profile", path: "/profile" },
        ].map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className={`flex flex-col items-center justify-center ${
              item.id === "search" ? "text-[#ff3b30]" : "text-[#bdbdbd]"
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
