"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { useRef, useEffect, useState } from "react"

const bounceAnimation = `
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`

const features = [
  { title: "Customized Diets", description: "Tailored meal plans for PCOS nutrition needs." },
  { title: "Fitness Plans", description: "Personalized routines for your health goals." },
  { title: "Symptom Tracker", description: "Monitor and analyze your PCOS symptoms." },
]

export default function Page() {
  const aboutRef = useRef<HTMLDivElement>(null)
  const [isAboutVisible, setIsAboutVisible] = useState(false)

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (aboutRef.current) {
        const rect = aboutRef.current.getBoundingClientRect()
        setIsAboutVisible(rect.top <= 0 && rect.bottom > 0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <style jsx>{bounceAnimation}</style>
      <main
        className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage:
            "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-NFrvBq0kFxQg9PEkRrdUilflhOhQV9.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Large centered background logo with low opacity */}
        <div className="absolute inset-0 flex items-center justify-center translate-y-10 pointer-events-none">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fernlogo-78ippMKqAzdjAACfaGumWnXUnVkqdP.png"
            alt=""
            width={800}
            height={240}
            className="w-4/5 max-w-4xl opacity-10"
            priority
          />
        </div>

        {/* Navigation bar */}
        <nav
          className={`fixed top-8 left-1/2 transform -translate-x-1/2 ${isAboutVisible ? "bg-[#2f2226]" : "bg-white bg-opacity-15 backdrop-filter backdrop-blur-md"} border border-white border-opacity-30 rounded-full px-10 py-4 z-30 transition-colors duration-300`}
        >
          <ul className="flex items-center space-x-12">
            <li>
              <a
                href="#"
                className="text-white font-mono font-thin text-lg md:text-xl hover:opacity-75 transition-opacity duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-white font-mono font-thin text-lg md:text-xl hover:opacity-75 transition-opacity duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/signup"
                className="text-white font-mono font-thin text-lg md:text-xl hover:opacity-75 transition-opacity duration-300"
              >
                Register
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="text-white font-mono font-thin text-lg md:text-xl hover:opacity-75 transition-opacity duration-300"
              >
                Login
              </a>
            </li>
          </ul>
        </nav>

        <div className="w-[97.65625%] max-w-[390px] mb-8 relative z-10">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fernlogowhite-rsTpCgl74GhXANk8FNjt3jRRBZ1OwM.png"
            alt="Fern"
            width={400}
            height={120}
            priority
            className="w-full h-auto"
          />
        </div>
        <p className="text-white font-mono font-thin text-center text-xl md:text-3xl max-w-[90%] tracking-wide leading-relaxed mb-8 relative z-10 mx-auto">
          Nurture, balance, and grow through PCOS.
        </p>
        <button
          onClick={scrollToAbout}
          className="bg-[#2f2226] text-white font-mono font-thin text-lg md:text-xl py-2 px-8 rounded-full hover:bg-opacity-80 transition-colors duration-300 relative z-10 mx-auto block"
        >
          Learn More
        </button>

        {/* Glass chevron */}
        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-15 backdrop-filter backdrop-blur-md border border-white border-opacity-30 rounded-full p-2 hover:bg-opacity-25 transition-all duration-300 z-10 animate-bounce mx-auto"
          aria-label="Scroll to About section"
          style={{ animation: "bounce 2s infinite" }}
        >
          <ChevronDown className="text-white w-4 h-4" />
        </button>
      </main>

      {/* About section */}
      <section
        id="about"
        ref={aboutRef}
        className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#97a683]/60 via-[#97a683]/30 to-white text-[#2f2226] relative overflow-hidden pt-20"
      >
        {/* Background frame */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            backgroundImage:
              "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fernframe-xur1V20cJjF3PU1L82p4okxD36FhLM.png)",
            backgroundSize: "100% auto",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 -mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-3xl font-mono font-thin mb-4 text-[#2f2226]">About Us</h2>
              <p className="text-lg font-mono font-thin leading-relaxed">
                Fern is a platform supporting individuals on their PCOS journey. We offer personalized diet and fitness
                plans, along with an intuitive symptom tracker to empower your path to wellness.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-mono font-thin mb-4 text-[#2f2226]">What is PCOS?</h2>
              <p className="text-lg font-mono font-thin leading-relaxed">
                Polycystic Ovary Syndrome (PCOS) is a common hormonal disorder affecting women. It can cause irregular
                periods, fertility issues, and metabolic problems. Despite its prevalence, PCOS often goes undiagnosed
                and undertreated.
              </p>
            </div>
          </div>

          {/* Feature Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4 relative z-10">
                <h3 className="text-xl font-mono font-thin mb-2">{feature.title}</h3>
                <p className="font-mono font-thin text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => (window.location.href = "/signup")}
              className="bg-[#2f2226] text-white font-mono font-thin text-lg py-2 px-8 rounded-full hover:bg-opacity-80 transition-colors duration-300 relative z-10"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </>
  )
}