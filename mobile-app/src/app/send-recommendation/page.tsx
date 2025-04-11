"use client"

import { useState } from "react"
import { ArrowLeft, Search, Share2, Check, Star } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function SendRecommendationPage() {
  const router = useRouter()
  const [selectedContacts, setSelectedContacts] = useState<number[]>([0])
  const [selectedGroups, setSelectedGroups] = useState<number[]>([0])
  const [rating, setRating] = useState(8)
  const [comment, setComment] = useState("")
  const [step, setStep] = useState(1)

  // Mock data for contacts
  const contacts = [
    { id: 0, name: "Marcus Johnson", avatar: "/placeholder.svg?height=80&width=80" },
    { id: 1, name: "Sophia Chen", avatar: "/placeholder.svg?height=80&width=80" },
    { id: 2, name: "Amara Okafor", avatar: "/placeholder.svg?height=80&width=80" },
    { id: 3, name: "Raj Patel", avatar: "/placeholder.svg?height=80&width=80" },
    { id: 4, name: "Elena Rodriguez", avatar: "/placeholder.svg?height=80&width=80" },
    { id: 5, name: "David Kim", avatar: "/placeholder.svg?height=80&width=80" },
  ]

  // Mock data for recommendation groups
  const groups = [
    {
      id: 0,
      name: "Work Group",
      count: 7,
      members: [
        "/placeholder.svg?height=40&width=40",
        "/placeholder.svg?height=40&width=40",
        "/placeholder.svg?height=40&width=40",
      ],
    },
    {
      id: 1,
      name: "School Friends",
      count: 14,
      members: [
        "/placeholder.svg?height=40&width=40",
        "/placeholder.svg?height=40&width=40",
        "/placeholder.svg?height=40&width=40",
        "/placeholder.svg?height=40&width=40",
      ],
    },
    {
      id: 2,
      name: "Bollywood",
      count: 12,
      members: ["/placeholder.svg?height=40&width=40", "/placeholder.svg?height=40&width=40"],
    },
    {
      id: 3,
      name: "Action Boys",
      count: 26,
      members: [
        "/placeholder.svg?height=40&width=40",
        "/placeholder.svg?height=40&width=40",
        "/placeholder.svg?height=40&width=40",
      ],
    },
  ]

  const toggleContact = (id: number) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((contactId) => contactId !== id))
    } else {
      setSelectedContacts([...selectedContacts, id])
    }
  }

  const toggleGroup = (id: number) => {
    if (selectedGroups.includes(id)) {
      setSelectedGroups(selectedGroups.filter((groupId) => groupId !== id))
    } else {
      setSelectedGroups([...selectedGroups, id])
    }
  }

  const handleNext = () => {
    setStep(2)
  }

  const handleBack = () => {
    router.back()
  }

  const handleSend = () => {
    // In a real app, you would handle sending the recommendation here
    router.push("/recommendation-sent")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#1e1e1e] text-white">
      <header className="p-4">
        <button onClick={() => router.back()} className="flex items-center text-[#bdbdbd]">
          <ArrowLeft size={20} className="mr-2" />
          <span>Back</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col p-4">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            <div className={`w-2 h-2 rounded-full ${step === 1 ? "bg-white" : "bg-[#333333]"}`}></div>
            <div className={`w-2 h-2 rounded-full ${step === 2 ? "bg-white" : "bg-[#333333]"}`}></div>
          </div>
        </div>

        {step === 1 ? (
          <>
            {/* Title */}
            <h1 className="text-2xl font-bold text-center mb-10">Who Do You Wish To Send Recommendation To?</h1>

            {/* My Contacts Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">My Contacts</h2>
                <Search className="w-6 h-6 text-[#bdbdbd]" />
              </div>

              <div className="flex space-x-4 overflow-x-auto pb-2">
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex flex-col items-center">
                    <div className="relative w-16 h-16 mb-1" onClick={() => toggleContact(contact.id)}>
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={contact.avatar || "/placeholder.svg"}
                          alt={contact.name}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      {selectedContacts.includes(contact.id) && (
                        <div className="absolute -bottom-1 -right-1 bg-[#27ae60] rounded-full p-1">
                          <Check size={16} className="text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation Groups Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recommendation Groups</h2>
                <Search className="w-6 h-6 text-[#bdbdbd]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="bg-[#2d2b2b] rounded-lg p-4 relative"
                    onClick={() => toggleGroup(group.id)}
                  >
                    {selectedGroups.includes(group.id) && (
                      <div className="absolute -top-2 -left-2 bg-[#27ae60] rounded-full p-1">
                        <Check size={16} className="text-white" />
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{group.name}</h3>
                      <Share2 size={18} className="text-[#bdbdbd]" />
                    </div>
                    <p className="text-sm text-[#bdbdbd] mb-3">{group.count} Recommendations</p>
                    <div className="flex -space-x-2">
                      {group.members.map((member, index) => (
                        <div key={index} className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#2d2b2b]">
                          <Image
                            src={member || "/placeholder.svg"}
                            alt={`Group member ${index}`}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Title */}
            <h1 className="text-2xl font-bold text-center mb-8">Rate & Comment</h1>

            {/* Content Preview */}
            <div className="flex items-center mb-6 bg-[#2d2b2b] p-3 rounded-lg">
              <div className="relative w-16 h-24 mr-3">
                <Image
                  src="/placeholder.svg?height=96&width=64"
                  alt="Content preview"
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div>
                <h3 className="font-medium">Interstellar</h3>
                <p className="text-sm text-[#bdbdbd]">2014 • 2h 49m</p>
              </div>
            </div>

            {/* Rating Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Your Rating</h3>
              <div className="flex items-center justify-between">
                <div className="flex">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                    <button key={star} onClick={() => setRating(star)} className="p-1">
                      <Star size={24} className={star <= rating ? "text-[#f2994a] fill-[#f2994a]" : "text-[#4f4f4f]"} />
                    </button>
                  ))}
                </div>
                <span className="text-xl font-bold">{rating}/10</span>
              </div>
            </div>

            {/* Comment Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Add a Comment (Optional)</h3>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this title..."
                className="w-full p-3 bg-[#2d2b2b] rounded-md border border-[#4f4f4f] text-white focus:outline-none focus:ring-1 focus:ring-[#f2994a] min-h-[120px] resize-none"
              />
            </div>

            {/* Recipients Summary */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Sending to</h3>
              <div className="flex flex-wrap gap-2">
                {selectedContacts.map((id) => {
                  const contact = contacts.find((c) => c.id === id)
                  return contact ? (
                    <div key={`contact-${id}`} className="flex items-center bg-[#2d2b2b] rounded-full px-3 py-1">
                      <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                        <Image
                          src={contact.avatar || "/placeholder.svg"}
                          alt={contact.name}
                          width={24}
                          height={24}
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm">{contact.name}</span>
                    </div>
                  ) : null
                })}
                {selectedGroups.map((id) => {
                  const group = groups.find((g) => g.id === id)
                  return group ? (
                    <div key={`group-${id}`} className="flex items-center bg-[#2d2b2b] rounded-full px-3 py-1">
                      <span className="text-sm">{group.name}</span>
                    </div>
                  ) : null
                })}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Bottom Button */}
      <div className="p-4 border-t border-[#333333]">
        {step === 1 ? (
          <button onClick={handleNext} className="w-full py-3 bg-[#f2994a] text-white rounded-md font-medium">
            Next
          </button>
        ) : (
          <button onClick={handleSend} className="w-full py-3 bg-[#f2994a] text-white rounded-md font-medium">
            Send Recommendation
          </button>
        )}
      </div>
    </div>
  )
}
