"use client"

import { CheckCircle, ArrowRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function AccountCreatedPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromRecommendation = searchParams.get("fromRecommendation") === "true"
  const [destinationText, setDestinationText] = useState("Start Exploring")

  useEffect(() => {
    // Update the button text based on where the user will be directed
    setDestinationText(fromRecommendation ? "View Recommendations" : "Discover Content")
  }, [fromRecommendation])

  const handleGetStarted = () => {
    if (fromRecommendation) {
      // If user signed up from a recommendation, take them to the notifications/recommendations screen
      router.push("/notifications")
    } else {
      // Otherwise, take them to the search screen
      router.push("/search")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e] text-white">
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-8">
          <CheckCircle size={80} className="mx-auto mb-6 text-[#F2994A]" />
          <h1 className="text-2xl font-bold mb-4">Account Created!</h1>
          <p className="text-[#bdbdbd] max-w-xs mx-auto">
            Your account has been successfully created. You can now{" "}
            {fromRecommendation ? "view your recommendations" : "start exploring content"}.
          </p>
        </div>

        <button
          onClick={handleGetStarted}
          className="w-full max-w-xs py-3 bg-[#F2994A] text-white rounded-md flex items-center justify-center space-x-2"
        >
          <span>{destinationText}</span>
          <ArrowRight size={18} />
        </button>
      </main>
    </div>
  )
}
