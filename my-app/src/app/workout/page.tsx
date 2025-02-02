// page.tsx
"use client";

import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  intensity: string;
}

interface DayPlan {
  bodyParts: string;
  exercises: Exercise[];
  notes: string;
}

interface WorkoutPlan {
  workoutSplit: string;
  schedule: {
    [day: string]: DayPlan;
  };
  recovery: string;
}

export default function Workout() {
  // The workoutPlan state holds the structured JSON response.
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [daysPerWeek, setDaysPerWeek] = useState("");
  const [timePerDay, setTimePerDay] = useState("");
  const [exersizeConstraints, setExersizeConstraints] = useState("");
  const [hasSubmittedPreferences, setHasSubmittedPreferences] = useState(false);

  // User profile data
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState("");

  useEffect(() => {
    // Load the user's profile data from localStorage.
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const savedProfile = JSON.parse(localStorage.getItem(`profile_${currentUser}`) || "{}");
      if (savedProfile) {
        setHeight(savedProfile.height || "");
        setWeight(savedProfile.weight || "");
        setAge(savedProfile.age || "");
        setGoal(savedProfile.goal || "");
      }
    }
  }, []);

  const constraintOptions = [
    "Gym Access (Full Equipment)",
    "Home Gym (Bands & Dumbbells)",
    "Dumbbells Only",
    "Bodyweight Only",
    "Resistance Bands Only",
  ];

  const handlePreferencesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!daysPerWeek || !timePerDay || !exersizeConstraints) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: "Generate my workout plan" }],
          daysPerWeek,
          timePerDay,
          exersizeConstraints,
          height,
          weight,
          age,
          goal,
        }),
      });

      const data = await response.json();
      setWorkoutPlan(data);
      setHasSubmittedPreferences(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
      <header className="flex justify-between items-center fixed top-6 left-6 right-6 z-10">
        <Link
          href="/dashboard"
          className="flex items-center bg-[#2f2226] text-white font-mono font-thin text-lg py-2 px-4 rounded-full hover:bg-opacity-80 transition-colors duration-300"
        >
          <ChevronLeft className="mr-2" size={20} />
          Back to Dashboard
        </Link>
      </header>

      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lineframe-i2YFpjEaL78XnSiM7TKUy0r69m9sFx.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="bg-white bg-opacity-15 backdrop-filter backdrop-blur-md border border-white border-opacity-30 rounded-3xl p-8 max-w-3xl w-full mx-auto relative z-10">
        {!hasSubmittedPreferences ? (
          <>
            <h1 className="text-3xl font-mono font-thin mb-6 text-[#2f2226] text-center">
              Custom PCOS Workout Plan
            </h1>

            <form onSubmit={handlePreferencesSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 font-mono font-thin text-[#2f2226]">
                  How many times per week would you like to work out?
                </label>
                <input
                  type="number"
                  min="1"
                  max="7"
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(e.target.value)}
                  className="w-full p-2 rounded-md font-mono font-thin text-[#2f2226] border border-[#2f2226] bg-white bg-opacity-50"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-mono font-thin text-[#2f2226]">
                  How many minutes per day would you like to work out?
                </label>
                <input
                  type="number"
                  min="10"
                  max="180"
                  value={timePerDay}
                  onChange={(e) => setTimePerDay(e.target.value)}
                  className="w-full p-2 rounded-md font-mono font-thin text-[#2f2226] border border-[#2f2226] bg-white bg-opacity-50"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-mono font-thin text-[#2f2226]">
                  What equipment do you have available?
                </label>
                <select
                  value={exersizeConstraints}
                  onChange={(e) => setExersizeConstraints(e.target.value)}
                  className="w-full p-2 rounded-md font-mono font-thin text-[#2f2226] border border-[#2f2226] bg-white bg-opacity-50 appearance-none"
                  required
                >
                  <option value="">Select your equipment</option>
                  {constraintOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#2f2226] text-white font-mono font-thin text-lg py-2 px-8 rounded-full hover:bg-opacity-80 transition-colors duration-300 disabled:opacity-50"
              >
                {isLoading ? "Generating Plan..." : "Generate Workout Plan"}
              </button>
            </form>
          </>
        ) : workoutPlan ? (
          <>
            <h1 className="text-3xl font-mono font-thin mb-6 text-[#2f2226] text-center">
              Your Workout Plan
            </h1>
            <div className="mb-6">
              <p className="font-mono font-thin text-[#2f2226] mb-4">
                <strong>Workout Split:</strong> {workoutPlan.workoutSplit}
              </p>
              {Object.entries(workoutPlan.schedule).map(([day, details]) => (
                <div key={day} className="mb-8 p-4 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30">
                  <h2 className="text-xl font-mono font-bold text-[#2f2226] mb-2">
                    <strong>{day}</strong>
                  </h2>
                  <p className="font-mono font-thin text-[#2f2226]">
                    <strong>Body Parts Targeted:</strong> {details.bodyParts}
                  </p>
                  <div className="mt-2">
                    <strong className="font-mono font-thin text-[#2f2226]">Exercises:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {details.exercises.map((exercise, index) => (
                        <li key={index} className="font-mono font-thin text-[#2f2226]">
                          {exercise.name} – {exercise.sets} sets of {exercise.reps} reps, rest: {exercise.rest}, intensity: {exercise.intensity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-2 font-mono font-thin text-[#2f2226]">
                    <strong>Notes:</strong> {details.notes}
                  </p>
                </div>
              ))}
              <div className="p-4 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30">
                <h2 className="text-xl font-mono font-bold text-[#2f2226] mb-2">Recovery & Stress Management</h2>
                <p className="font-mono font-thin text-[#2f2226]">{workoutPlan.recovery}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setHasSubmittedPreferences(false);
                setWorkoutPlan(null);
              }}
              className="w-full bg-[#2f2226] text-white font-mono font-thin text-lg py-2 px-8 rounded-full hover:bg-opacity-80 transition-colors duration-300"
            >
              Generate New Plan
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}