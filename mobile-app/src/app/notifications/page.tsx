"use client"

import { useState } from "react"
import { ArrowLeft, Bell, Home, Search, User, Star, Plus, Heart, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notificationCount, setNotificationCount] = useState(3) // Mock notification count
  const router = useRouter()

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "recommendation",
      title: "The Dark Knight",
      contentId: 101, // ID to link to content details
      sender: {
        name: "Marcus Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 9,
      comment: "Best superhero movie ever made! The Joker's performance is legendary.",
      time: "2 hours ago",
      image: "/placeholder.svg?height=80&width=60",
      read: false,
    },
    {
      id: 2,
      type: "recommendation",
      title: "Stranger Things",
      contentId: 102,
      sender: {
        name: "Sophia Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 8,
      comment: "You'll love the 80s nostalgia and the supernatural elements!",
      time: "Yesterday",
      image: "/placeholder.svg?height=80&width=60",
      read: true,
    },
    {
      id: 3,
      type: "friend_request",
      sender: {
        name: "Alex Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      time: "2 days ago",
      read: true,
    },
    {
      id: 4,
      type: "recommendation",
      title: "Breaking Bad",
      contentId: 103,
      sender: {
        name: "Raj Patel",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 10,
      comment: "One of the greatest TV shows of all time. The character development is incredible!",
      time: "3 days ago",
      image: "/placeholder.svg?height=80&width=60",
      read: true,
    },
  ])

  // State for watchlist and loved list
  const [watchlist, setWatchlist] = useState([])
  const [lovedList, setLovedList] = useState([])

  const filteredNotifications = activeTab === "all" ? notifications : notifications.filter((n) => n.type === activeTab)

  // Handle adding to watchlist
  const addToWatchlist = (notification, e) => {
    e.stopPropagation() // Prevent navigation

    // Create a watchlist item from the notification
    const watchlistItem = {
      id: notification.contentId,
      title: notification.title,
      type: "Movie", // Default, would be fetched from API in real app
      year: "2023", // Default, would be fetched from API in real app
      image: notification.image,
      addedDate: "Added just now",
      rating: notification.rating,
      isLiked: false,
      recommendedBy: [
        {
          name: notification.sender.name,
          avatar: notification.sender.avatar,
          rating: notification.rating,
          comment: notification.comment,
        },
      ],
      platforms: [],
    }

    setWatchlist([...watchlist, watchlistItem])

    // Remove from notifications
    setNotifications(notifications.filter((n) => n.id !== notification.id))

    // Navigate to watchlist screen
    router.push("/home")
  }

  // Handle adding to loved list
  const addToLovedList = (notification, e) => {
    e.stopPropagation() // Prevent navigation

    // Create a loved list item from the notification
    const lovedItem = {
      id: notification.contentId,
      title: notification.title,
      type: "Movie", // Default, would be fetched from API in real app
      year: "2023", // Default, would be fetched from API in real app
      image: notification.image,
      addedDate: "Loved just now",
      rating: notification.rating,
      isLiked: true,
      recommendedBy: [
        {
          name: notification.sender.name,
          avatar: notification.sender.avatar,
          rating: notification.rating,
          comment: notification.comment,
        },
      ],
      platforms: [],
    }

    setLovedList([...lovedList, lovedItem])

    // Remove from notifications
    setNotifications(notifications.filter((n) => n.id !== notification.id))

    // Remove from watchlist if it exists there
    setWatchlist(watchlist.filter((item) => item.id !== notification.contentId))

    // Show confirmation
    alert(`"${notification.title}" has been added to your loved list and removed from your watchlist if it was there.`)
  }

  // Handle removing recommendation
  const removeRecommendation = (id, e) => {
    e.stopPropagation() // Prevent navigation

    // Show confirmation
    if (confirm("Remove this recommendation?")) {
      setNotifications(notifications.filter((n) => n.id !== id))
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e] text-white">
      <header className="p-4 bg-[#0e101f]">
        <div className="flex justify-between items-center">
          <button onClick={() => router.back()} className="flex items-center text-[#bdbdbd]">
            <ArrowLeft size={20} className="mr-2" />
            <span>Back</span>
          </button>
          <h1 className="text-[24px] font-bold">Notifications</h1>
          <div className="w-6"></div> {/* Empty div for flex spacing */}
        </div>
      </header>

      {/* Tabs */}
      <div className="px-4 py-3 bg-[#161616]">
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {[
            { id: "all", label: "All" },
            { id: "recommendation", label: "Recommendations" },
            { id: "friend_request", label: "Friend Requests" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeTab === tab.id ? "bg-[#ff3b30] text-white" : "bg-[#212121] text-[#bdbdbd]"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 p-4">
        {filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-[#212121] rounded-lg p-4 ${!notification.read ? "border-l-4 border-[#ff3b30]" : ""}`}
                onClick={() => {
                  if (notification.type === "recommendation") {
                    // Go directly to content details
                    router.push(`/content/${notification.contentId}`)
                  }
                }}
              >
                {notification.type === "recommendation" ? (
                  <div>
                    <div className="flex items-start">
                      <div
                        className="relative w-12 h-12 rounded-full overflow-hidden mr-3 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/profile/friend/${notification.id}`)
                        }}
                      >
                        <Image
                          src={notification.sender.avatar || "/placeholder.svg"}
                          alt={notification.sender.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span
                            className="font-medium cursor-pointer hover:text-[#F2994A]"
                            onClick={(e) => {
                              e.stopPropagation()
                              router.push(`/profile/friend/${notification.id}`)
                            }}
                          >
                            {notification.sender.name}
                          </span>
                          <span className="text-[#bdbdbd]"> recommended </span>
                          <span className="font-medium">{notification.title}</span>
                        </p>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            <Star size={14} className="text-[#f2994a] fill-[#f2994a]" />
                            <span className="ml-1 text-sm">{notification.rating}/10</span>
                          </div>
                          <span className="mx-2 text-xs text-[#bdbdbd]">•</span>
                          <span className="text-xs text-[#bdbdbd]">{notification.time}</span>
                        </div>
                      </div>
                      <div className="relative w-10 h-14 ml-2">
                        <Image
                          src={notification.image || "/placeholder.svg"}
                          alt={notification.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    </div>
                    {notification.comment && (
                      <p className="text-sm text-[#bdbdbd] mt-3 pl-14">"{notification.comment}"</p>
                    )}

                    {/* Action buttons */}
                    <div className="flex justify-end space-x-2 mt-3">
                      <button
                        onClick={(e) => addToWatchlist(notification, e)}
                        className="flex items-center bg-[#2d2b2b] px-3 py-2 rounded-lg"
                      >
                        <Plus size={16} className="text-[#F2994A] mr-1" />
                        <span className="text-sm">Watchlist</span>
                      </button>

                      <button
                        onClick={(e) => addToLovedList(notification, e)}
                        className="flex items-center bg-[#2d2b2b] px-3 py-2 rounded-lg"
                      >
                        <Heart size={16} className="text-[#F2994A] mr-1" />
                        <span className="text-sm">Loved it</span>
                      </button>

                      <button
                        onClick={(e) => removeRecommendation(notification.id, e)}
                        className="flex items-center bg-[#2d2b2b] px-3 py-2 rounded-lg"
                      >
                        <Trash2 size={16} className="text-[#F2994A] mr-1" />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>
                ) : notification.type === "friend_request" ? (
                  <div className="flex items-center">
                    <div
                      className="relative w-12 h-12 rounded-full overflow-hidden mr-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/profile/friend/${notification.id}`)
                      }}
                    >
                      <Image
                        src={notification.sender.avatar || "/placeholder.svg"}
                        alt={notification.sender.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span
                          className="font-medium cursor-pointer hover:text-[#F2994A]"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/profile/friend/${notification.id}`)
                          }}
                        >
                          {notification.sender.name}
                        </span>
                        <span className="text-[#bdbdbd]"> sent you a friend request</span>
                      </p>
                      <p className="text-xs text-[#bdbdbd] mt-1">{notification.time}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-[#ff3b30] rounded-md text-sm">Accept</button>
                      <button className="px-3 py-1 bg-[#333333] rounded-md text-sm">Decline</button>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Bell size={48} className="text-[#333333] mb-4" />
            <h3 className="text-lg font-medium mb-2">No notifications</h3>
            <p className="text-sm text-[#bdbdbd] max-w-xs">
              You don't have any {activeTab === "all" ? "" : activeTab} notifications at the moment.
            </p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="grid grid-cols-4 bg-[#212121] border-t border-[#262626] py-2">
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
            className={`flex flex-col items-center justify-center ${
              item.id === "notifications" ? "text-[#ff3b30]" : "text-[#bdbdbd]"
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
