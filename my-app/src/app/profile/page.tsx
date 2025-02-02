"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"

export default function ProfilePage() {
  const [username, setUsername] = useState("") // Logged-in user
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [age, setAge] = useState("")
  const [dietaryRestriction, setDietaryRestriction] = useState("No Restrictions")
  const [goal, setGoal] = useState("") // "Gain Weight" or "Lose Weight"
  const [cuisinePreferences, setCuisinePreferences] = useState<string[]>([])
  const [activityHistory, setActivityHistory] = useState("")
  const router = useRouter()

  // Cuisine options
  const cuisineOptions = [
    "Italian",
    "Mexican",
    "Indian",
    "Chinese",
    "Japanese",
    "Mediterranean",
    "French",
    "Thai",
    "Korean",
    "American",
  ]

  useEffect(() => {
    // Get the logged-in user
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUsername(currentUser)

    // Load saved profile data
    const savedProfile = JSON.parse(localStorage.getItem(`profile_${currentUser}`) || "{}")
    if (savedProfile) {
      setHeight(savedProfile.height || "")
      setWeight(savedProfile.weight || "")
      setAge(savedProfile.age || "")
      setDietaryRestriction(savedProfile.dietaryRestriction || "No Restrictions")
      setGoal(savedProfile.goal || "")
      setCuisinePreferences(savedProfile.cuisinePreferences || [])
      setActivityHistory(savedProfile.activityHistory || "")
    }
  }, [router]) // Added router to dependencies

  // Save profile when any field changes
  useEffect(() => {
    if (username) {
      localStorage.setItem(
        `profile_${username}`,
        JSON.stringify({ height, weight, age, dietaryRestriction, goal, cuisinePreferences, activityHistory }),
      )
    }
  }, [height, weight, age, dietaryRestriction, goal, cuisinePreferences, activityHistory, username])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-12"
      style={{
        backgroundImage:
          "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-NFrvBq0kFxQg9PEkRrdUilflhOhQV9.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Decorative line frame overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lineframe-i2YFpjEaL78XnSiM7TKUy0r69m9sFx.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="bg-white bg-opacity-15 backdrop-filter backdrop-blur-md border border-white border-opacity-30 rounded-3xl p-8 max-w-lg w-full mx-auto relative z-10">
        <h1 className="text-3xl font-mono font-thin mb-6 text-[#2f2226] text-center">Your Profile</h1>

        {/* Height Input */}
        <label className="block mb-2 font-mono font-thin text-[#2f2226]">Height (ft'in):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="border border-[#2f2226] bg-white bg-opacity-50 p-2 w-full mb-4 rounded-md font-mono font-thin text-[#2f2226]"
        />

        {/* Weight Input */}
        <label className="block mb-2 font-mono font-thin text-[#2f2226]">Weight (lb):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border border-[#2f2226] bg-white bg-opacity-50 p-2 w-full mb-4 rounded-md font-mono font-thin text-[#2f2226]"
        />

        {/* Age Input */}
        <label className="block mb-2 font-mono font-thin text-[#2f2226]">Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border border-[#2f2226] bg-white bg-opacity-50 p-2 w-full mb-4 rounded-md font-mono font-thin text-[#2f2226]"
        />

        {/* Dietary Restrictions Dropdown */}
        <label className="block mb-2 font-mono font-thin text-[#2f2226]">Dietary Restriction:</label>
        <div className="relative">
          <select
            value={dietaryRestriction}
            onChange={(e) => setDietaryRestriction(e.target.value)}
            className="border border-[#2f2226] bg-white bg-opacity-50 p-2 w-full mb-4 rounded-md font-mono font-thin text-[#2f2226] appearance-none"
          >
            <option>No Restrictions</option>
            <option>Vegetarian</option>
            <option>Nut-Free</option>
            <option>Vegan</option>
            <option>Gluten-Free</option>
            <option>Dairy-Free</option>
            <option>Keto-Friendly</option>
            <option>Low-Carb</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2f2226]" />
        </div>

        {/* Goal: Gain or Lose Weight */}
        <label className="block mb-2 font-mono font-thin text-[#2f2226]">Goal:</label>
        <div className="mb-4 flex space-x-4">
          <button
            className={`p-2 rounded-lg font-mono font-thin ${goal === "Gain Weight" ? "bg-[#2f2226] text-white" : "bg-white bg-opacity-50 text-[#2f2226]"}`}
            onClick={() => setGoal("Gain Weight")}
          >
            Gain Weight
          </button>
          <button
            className={`p-2 rounded-lg font-mono font-thin ${goal === "Lose Weight" ? "bg-[#2f2226] text-white" : "bg-white bg-opacity-50 text-[#2f2226]"}`}
            onClick={() => setGoal("Lose Weight")}
          >
            Lose Weight
          </button>
        </div>

        {/* Cuisine Preferences (Multi-Select) */}
        <label className="block mb-2 font-mono font-thin text-[#2f2226]">Cuisine Preferences (Select up to 3):</label>
        <div className="relative">
          <select
            multiple
            value={cuisinePreferences}
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value)
              if (selectedOptions.length <= 3) {
                setCuisinePreferences(selectedOptions)
              }
            }}
            className="border border-[#2f2226] bg-white bg-opacity-50 p-2 w-full mb-4 rounded-md font-mono font-thin text-[#2f2226]"
          >
            {cuisineOptions.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2f2226]" />
        </div>

        {/* Success Message */}
        <p className="text-white font-mono font-thin mb-4">Profile data is automatically saved!</p>

        {/* Back to Dashboard */}
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full bg-[#2f2226] text-white font-mono font-thin text-lg py-2 px-8 rounded-full hover:bg-opacity-80 transition-colors duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}