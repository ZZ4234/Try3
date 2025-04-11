"use client"

import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RecommendationSentPage() {
  const router = useRouter()

  // Automatically redirect to home after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col min-h-screen bg-[#1e1e1e] text-white">
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-8">
          <CheckCircle size={80} className="mx-auto mb-6 text-[#27ae60]" />
          <h1 className="text-2xl font-bold mb-4">Recommendation Sent!</h1>
          <p className="text-[#bdbdbd] max-w-xs mx-auto">
            Your recommendation has been successfully sent to your selected contacts and groups.
          </p>
        </div>

        <p className="text-sm text-[#bdbdbd]">Redirecting to home...</p>
      </main>
    </div>
  )
}
