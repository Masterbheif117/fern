"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

type DayMark = {
  day: number
  month: number
  year: number
  mark: "check" | "x"
}

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [markedDays, setMarkedDays] = useState<DayMark[]>([])
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const router = useRouter()

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1]

    if (!token) {
      router.push("/login")
    } else {
      setAuthenticated(true)
      try {
        const decoded = JSON.parse(atob(token))
        setUsername(decoded.username)
        localStorage.setItem("currentUser", decoded.username)
      } catch (error) {
        console.error("Error decoding token:", error)
      }
    }
  }, [router])

  useEffect(() => {
    const savedUsername = localStorage.getItem("currentUser")
    if (savedUsername) {
      setUsername(savedUsername)
      const savedProgress = localStorage.getItem(`progress_${savedUsername}`)
      if (savedProgress !== null) {
        setMarkedDays(JSON.parse(savedProgress))
      }
    }
  }, [])

  useEffect(() => {
    if (username) {
      localStorage.setItem(`progress_${username}`, JSON.stringify(markedDays))
    }
  }, [markedDays, username])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const markDay = (mark: "check" | "x") => {
    if (selectedDay) {
      setMarkedDays((prev) => {
        const filtered = prev.filter(
          (d) => !(d.day === selectedDay && d.month === currentDate.getMonth() && d.year === currentDate.getFullYear()),
        )
        return [
          ...filtered,
          {
            day: selectedDay,
            month: currentDate.getMonth(),
            year: currentDate.getFullYear(),
            mark,
          },
        ]
      })
      setSelectedDay(null)
    }
  }

  const changeMonth = (increment: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + increment)
      return newDate
    })
    setSelectedDay(null)
  }

  const changeYear = (increment: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setFullYear(prev.getFullYear() + increment)
      return newDate
    })
    setSelectedDay(null)
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return authenticated ? (
    <div
      className="min-h-screen flex"
      style={{
        backgroundImage:
          "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PinkGreen.jpg-6YjmU6K4uYM7v3fPRcE1WLjgYeJeFm.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "saturate(110%)",
      }}
    >
      {/* Sidebar */}
      <div className="w-64 backdrop-blur-md bg-white bg-opacity-20 p-6 flex flex-col rounded-r-3xl shadow-lg">
        <div className="mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fernlogowhite-rsTpCgl74GhXANk8FNjt3jRRBZ1OwM.png"
            alt="Fern"
            width={200}
            height={60}
            priority
            className="w-full h-auto"
          />
        </div>
        <h1 className="text-xl font-mono font-thin text-[#2f2226] mb-6">Welcome, {username}!</h1>
        <Link
          href="/"
          className="mt-auto mb-4 bg-white text-[#2f2226] font-mono font-thin text-lg py-2 px-4 rounded-full hover:bg-opacity-80 transition-colors duration-300 text-center"
        >
          Back to Home
        </Link>
        <button
          onClick={() => {
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
            localStorage.removeItem("currentUser")
            router.push("/login")
          }}
          className="mt-0 bg-white text-[#2f2226] font-mono font-thin text-lg py-2 px-4 rounded-full hover:bg-opacity-80 transition-colors duration-300"
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="flex items-center justify-center gap-8 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => changeYear(-1)}
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
            >
              <ChevronLeft className="text-[#2f2226]" />
            </button>
            <span className="text-2xl font-mono font-thin text-[#2f2226]">{currentDate.getFullYear()}</span>
            <button
              onClick={() => changeYear(1)}
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
            >
              <ChevronRight className="text-[#2f2226]" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
            >
              <ChevronLeft className="text-[#2f2226]" />
            </button>
            <span className="text-2xl font-mono font-thin text-[#2f2226] min-w-[140px] text-center">
              {months[currentDate.getMonth()]}
            </span>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
            >
              <ChevronRight className="text-[#2f2226]" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-4">
          {currentMonthDays.map((day) => {
            const markedDay = markedDays.find(
              (d) => d.day === day && d.month === currentDate.getMonth() && d.year === currentDate.getFullYear(),
            )
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-[#2f2226] font-mono font-thin text-lg
                           ${selectedDay === day ? "ring-2 ring-[#2f2226]" : ""}
                           ${markedDay ? (markedDay.mark === "check" ? "bg-green-200" : "bg-red-200") : "bg-white bg-opacity-50"}`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      {/* Side panel */}
      {selectedDay && (
        <div className="w-64 backdrop-blur-md bg-white bg-opacity-20 p-6 shadow-lg rounded-l-3xl">
          <h3 className="text-xl font-mono font-thin text-[#2f2226] mb-4">
            Mark {months[currentDate.getMonth()]} {selectedDay}, {currentDate.getFullYear()}
          </h3>
          <div className="flex justify-around">
            <button
              onClick={() => markDay("check")}
              className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-300"
            >
              <Check size={24} />
            </button>
            <button
              onClick={() => markDay("x")}
              className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors duration-300"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  ) : null
}