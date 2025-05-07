"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Heart, Flame, User, Users, Star } from "lucide-react"
import { useAnalytics } from "@/context/analytics-context"

export default function FlamesCalculator() {
  const [name1, setName1] = useState("")
  const [name2, setName2] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [animation, setAnimation] = useState(false)
  const { trackEvent } = useAnalytics()

  const calculateFlames = () => {
    if (!name1.trim() || !name2.trim()) return

    setLoading(true)
    setResult(null)
    setAnimation(true)

    // Track calculation started
    trackEvent("calculation_started", {
      name1,
      name2,
      timestamp: new Date().toISOString(),
    })

    // Simulate calculation with delay for effect
    setTimeout(() => {
      const relationship = computeRelationship(name1, name2)
      setResult(relationship)
      setLoading(false)

      // Track calculation completed
      trackEvent("calculation_completed", {
        name1,
        name2,
        result: relationship,
        timestamp: new Date().toISOString(),
      })
    }, 2000)
  }

  const computeRelationship = (name1: string, name2: string) => {
    // Remove spaces from names
    const n1 = name1.toLowerCase().replace(/\s+/g, "")
    const n2 = name2.toLowerCase().replace(/\s+/g, "")

    // Count remaining characters after cancellation
    const remainingChars = [...n1]

    for (const char of n2) {
      const index = remainingChars.indexOf(char)
      if (index !== -1) {
        remainingChars.splice(index, 1)
      } else {
        remainingChars.push(char)
      }
    }

    // FLAMES stands for Friends, Lovers, Affection, Marriage, Enemies, Siblings, Dating
    const flames = ["Friends", "Lovers", "Affection", "Marriage", "Enemies", "Siblings", "Dating"]
    const count = remainingChars.length

    // If count is 0, default to "Friends"
    if (count === 0) return "Friends"

    // Calculate the index in the FLAMES array
    const index = (count % 7) - 1
    return flames[index >= 0 ? index : 6]
  }

  const getRelationshipIcon = () => {
    switch (result) {
      case "Friends":
        return <Users className="h-8 w-8 text-blue-400" />
      case "Lovers":
        return <Heart className="h-8 w-8 text-pink-500" />
      case "Affection":
        return <Star className="h-8 w-8 text-purple-400" />
      case "Marriage":
        return <Flame className="h-8 w-8 text-orange-500" />
      case "Enemies":
        return <Flame className="h-8 w-8 text-red-500" />
      case "Siblings":
        return <User className="h-8 w-8 text-green-400" />
      case "Dating":
        return <Heart className="h-8 w-8 text-cyan-400" />
      default:
        return null
    }
  }

  const getRelationshipDescription = () => {
    switch (result) {
      case "Friends":
        return "You two share a strong platonic bond. Your friendship will be meaningful and supportive."
      case "Lovers":
        return "There's a passionate romantic connection between you. The chemistry is undeniable."
      case "Affection":
        return "You share a deep affection and care for each other. Your bond is tender and nurturing."
      case "Marriage":
        return "Your connection has long-term potential. You complement each other perfectly."
      case "Enemies":
        return "There's tension in this relationship. You may challenge each other in difficult ways."
      case "Siblings":
        return "You have a familial bond, like siblings who support each other through thick and thin."
      case "Dating":
        return "You two have a casual but meaningful connection. Your relationship is developing and has potential to grow."
      default:
        return ""
    }
  }

  const handleShare = () => {
    if (!result) return

    // Track share attempt
    trackEvent("result_share", {
      name1,
      name2,
      result,
      method: "button_click",
    })

    // In a real app, this would open a share dialog
    alert(`Shared result: ${name1} and ${name2} are ${result}`)
  }

  const handleNameChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string, fieldName: string) => {
    setter(value)

    // Track input when user types more than 3 characters
    if (value.length === 3) {
      trackEvent("name_input", {
        field: fieldName,
        length: value.length,
      })
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-center mb-6">Discover Your Relationship Destiny</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="name1" className="block text-sm font-medium text-gray-300 mb-1">
            First Person's Name
          </label>
          <Input
            id="name1"
            value={name1}
            onChange={(e) => handleNameChange(setName1, e.target.value, "name1")}
            className="bg-black/50 border-cyan-900/50 focus:border-cyan-500 text-white"
            placeholder="Enter first name"
          />
        </div>

        <div>
          <label htmlFor="name2" className="block text-sm font-medium text-gray-300 mb-1">
            Second Person's Name
          </label>
          <Input
            id="name2"
            value={name2}
            onChange={(e) => handleNameChange(setName2, e.target.value, "name2")}
            className="bg-black/50 border-cyan-900/50 focus:border-cyan-500 text-white"
            placeholder="Enter second name"
          />
        </div>
      </div>

      <Button
        onClick={calculateFlames}
        disabled={!name1.trim() || !name2.trim() || loading}
        className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-medium py-2 transition-colors"
      >
        {loading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Calculating...
          </span>
        ) : (
          <span className="flex items-center">
            <Sparkles className="mr-2 h-4 w-4" />
            Reveal Relationship
          </span>
        )}
      </Button>

      {result && (
        <div
          className={`mt-6 p-4 rounded-lg bg-gradient-to-r from-cyan-900/30 to-cyan-800/20 border border-cyan-500/30 text-center ${animation ? "animate-fade-in" : ""}`}
        >
          <div className="flex justify-center mb-2">{getRelationshipIcon()}</div>
          <h3 className="text-xl font-bold text-cyan-400 mb-2">{result}</h3>
          <p className="text-gray-300 text-sm">{getRelationshipDescription()}</p>

          <Button
            onClick={handleShare}
            variant="outline"
            size="sm"
            className="mt-4 text-cyan-400 border-cyan-900/50 hover:bg-cyan-900/20"
          >
            Share Result
          </Button>
        </div>
      )}
    </div>
  )
}
