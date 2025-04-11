"use client"

import { useState } from "react"
import { ArrowLeft, User, Search, X, Check, UserX, AlertTriangle } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState("friends")
  const router = useRouter()

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [friendToDelete, setFriendToDelete] = useState(null)

  // Mock friends data
  const [friends, setFriends] = useState([
    { id: 1, name: "Sarah Johnson", avatar: "/placeholder.svg?height=80&width=80", mutualFriends: 5 },
    { id: 2, name: "Michael Chen", avatar: "/placeholder.svg?height=80&width=80", mutualFriends: 3 },
    { id: 3, name: "Alex Rodriguez", avatar: "/placeholder.svg?height=80&width=80", mutualFriends: 7 },
    { id: 4, name: "Emma Wilson", avatar: "/placeholder.svg?height=80&width=80", mutualFriends: 2 },
    { id: 5, name: "Raj Patel", avatar: "/placeholder.svg?height=80&width=80", mutualFriends: 4 },
  ])

  // Mock friend requests data
  const [friendRequests, setFriendRequests] = useState([
    { id: 101, name: "David Kim", avatar: "/placeholder.svg?height=80&width=80", mutualFriends: 2 },
    { id: 102, name: "Sophia Chen", avatar: "/placeholder.svg?height=80&width=80", mutualFriends: 5 },
  ])

  const [searchQuery, setSearchQuery] = useState("")

  const acceptFriendRequest = (id) => {
    const request = friendRequests.find((req) => req.id === id)
    if (request) {
      setFriends([...friends, request])
      setFriendRequests(friendRequests.filter((req) => req.id !== id))
    }
  }

  const declineFriendRequest = (id) => {
    setFriendRequests(friendRequests.filter((req) => req.id !== id))
  }

  const openDeleteConfirmation = (friend) => {
    setFriendToDelete(friend)
    setShowDeleteModal(true)
  }

  const removeFriend = () => {
    if (friendToDelete) {
      setFriends(friends.filter((friend) => friend.id !== friendToDelete.id))
      setShowDeleteModal(false)
      setFriendToDelete(null)
    }
  }

  // Filter friends based on search query
  const filteredFriends = friends.filter((friend) => friend.name.toLowerCase().includes(searchQuery.toLowerCase()))

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
        <h1 className="text-[17px] font-semibold text-center flex-1">Friends</h1>
        <div className="w-20"></div>
      </header>

      {/* Search bar */}
      <div className="px-4 py-3 bg-[#000000]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8E8E93] w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2.5 pl-10 pr-10 bg-[#1C1C1E] rounded-full border border-[#38383A] text-white focus:outline-none focus:ring-1 focus:ring-[#F2994A]"
            placeholder="Search friends..."
          />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8E8E93]"
              onClick={() => setSearchQuery("")}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Tabs - Removed the suggested tab */}
      <div className="px-4 py-3 bg-[#000000]">
        <div className="flex bg-[#1C1C1E] rounded-lg p-1 overflow-hidden">
          {[
            { id: "friends", label: "My Friends" },
            { id: "requests", label: "Requests" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 py-2 text-[13px] font-medium rounded-md ${
                activeTab === tab.id ? "bg-[#2C2C2E] text-white" : "text-[#8E8E93]"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {tab.id === "requests" && friendRequests.length > 0 && (
                <span className="ml-1 bg-[#FF3B30] text-white text-[10px] rounded-full px-1.5 py-0.5">
                  {friendRequests.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 p-4">
        {activeTab === "friends" && (
          <>
            <h2 className="text-lg font-semibold mb-4">
              {searchQuery ? `Search Results (${filteredFriends.length})` : `My Friends (${friends.length})`}
            </h2>

            {filteredFriends.length > 0 ? (
              <div className="space-y-4">
                {filteredFriends.map((friend) => (
                  <div key={friend.id} className="bg-[#1C1C1E] rounded-xl p-4 flex items-center justify-between">
                    <div
                      className="flex items-center flex-1 cursor-pointer"
                      onClick={() => router.push(`/profile/friend/${friend.id}`)}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                        <Image
                          src={friend.avatar || "/placeholder.svg"}
                          alt={friend.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{friend.name}</p>
                        <p className="text-sm text-[#8E8E93]">{friend.mutualFriends} mutual friends</p>
                      </div>
                    </div>
                    <button
                      onClick={() => openDeleteConfirmation(friend)}
                      className="bg-[#2C2C2E] p-2 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <UserX size={20} className="text-[#F2994A]" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-16 h-16 rounded-full bg-[#2C2C2E] flex items-center justify-center mb-4">
                  <User size={24} className="text-[#8E8E93]" />
                </div>
                <h3 className="text-[20px] font-medium mb-2">{searchQuery ? "No friends found" : "No friends yet"}</h3>
                <p className="text-[15px] text-[#8E8E93] max-w-xs mb-6">
                  {searchQuery
                    ? `No friends matching "${searchQuery}"`
                    : "Add friends to share recommendations and see what they're watching."}
                </p>
              </div>
            )}
          </>
        )}

        {activeTab === "requests" && (
          <>
            <h2 className="text-lg font-semibold mb-4">Friend Requests ({friendRequests.length})</h2>

            {friendRequests.length > 0 ? (
              <div className="space-y-4">
                {friendRequests.map((request) => (
                  <div key={request.id} className="bg-[#1C1C1E] rounded-xl p-4">
                    <div
                      className="flex items-center mb-3 cursor-pointer"
                      onClick={() => router.push(`/profile/friend/${request.id}`)}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                        <Image
                          src={request.avatar || "/placeholder.svg"}
                          alt={request.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{request.name}</p>
                        <p className="text-sm text-[#8E8E93]">{request.mutualFriends} mutual friends</p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => acceptFriendRequest(request.id)}
                        className="flex-1 py-2 bg-[#F2994A] text-white rounded-lg flex items-center justify-center"
                      >
                        <Check size={18} className="mr-1" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => declineFriendRequest(request.id)}
                        className="flex-1 py-2 bg-[#2C2C2E] text-white rounded-lg flex items-center justify-center"
                      >
                        <X size={18} className="mr-1" />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-16 h-16 rounded-full bg-[#2C2C2E] flex items-center justify-center mb-4">
                  <User size={24} className="text-[#8E8E93]" />
                </div>
                <h3 className="text-[20px] font-medium mb-2">No friend requests</h3>
                <p className="text-[15px] text-[#8E8E93] max-w-xs">
                  When someone sends you a friend request, it will appear here.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Delete Friend Confirmation Modal */}
      {showDeleteModal && friendToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1C1C1E] rounded-xl p-6 max-w-xs w-full">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#2C2C2E] flex items-center justify-center mb-4">
                <AlertTriangle size={32} className="text-[#F2994A]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Remove Friend</h3>
              <p className="text-[#8E8E93] mb-6">
                Are you sure you want to remove <span className="text-white font-medium">{friendToDelete.name}</span>{" "}
                from your friends?
              </p>
              <div className="flex flex-col w-full space-y-3">
                <button onClick={removeFriend} className="w-full py-3 bg-[#FF3B30] text-white rounded-xl font-medium">
                  Remove Friend
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
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
