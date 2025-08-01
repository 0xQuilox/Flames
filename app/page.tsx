"use client"

import Link from "next/link"
import { Play } from "lucide-react"
import FlamesCalculator from "@/components/flames-calculator"
import { useAnalytics } from "@/context/analytics-context"
import { useEffect } from "react"

export default function Home() {
  const { trackEvent, trackPageView } = useAnalytics()

  // Track page view when component mounts
  useEffect(() => {
    trackPageView("home")
  }, [trackPageView])

  const handlePlayNowClick = () => {
    trackEvent("play_now_clicked", {
      location: "hero_section",
      timestamp: new Date().toISOString(),
    })

    // Scroll to calculator
    document.querySelector(".calculator-section")?.scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#051a1f] via-[#062a33] to-[#051a1f] text-white overflow-hidden relative">
      {/* Ambient light effects */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#0ff]/20 blur-[100px]" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-[#0ff]/10 blur-[100px]" />

      {/* Navigation */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-wider">FLAMESD</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-sm uppercase tracking-wider hover:text-cyan-400 transition-colors"
            onClick={() => trackEvent("nav_click", { item: "home" })}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm uppercase tracking-wider hover:text-cyan-400 transition-colors"
            onClick={() => trackEvent("nav_click", { item: "about" })}
          >
            About
          </Link>
          <Link
            href="/history"
            className="text-sm uppercase tracking-wider hover:text-cyan-400 transition-colors"
            onClick={() => trackEvent("nav_click", { item: "history" })}
          >
            History
          </Link>
          <Link
            href="/examples"
            className="text-sm uppercase tracking-wider hover:text-cyan-400 transition-colors"
            onClick={() => trackEvent("nav_click", { item: "examples" })}
          >
            Examples
          </Link>
        </nav>
        <Link
          href="/share"
          className="border border-cyan-400/50 text-cyan-400 rounded-full px-6 py-2 text-sm hover:bg-cyan-400/10 transition-all flex items-center"
          onClick={() => trackEvent("nav_click", { item: "share" })}
        >
          <span>SHARE</span>
        </Link>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          {/* Left side - Game title and description */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold tracking-widest leading-none">
              <span className="block">F L A M E S</span>
              <span className="block text-cyan-400">D E S T I N Y</span>
            </h1>
            <p className="text-gray-400 max-w-md">
              Discover the cosmic connection between two souls. Our algorithm reveals the hidden relationship destiny
              written in your names.
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <button
                className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium rounded-full px-6 py-3 flex items-center space-x-2 transition-colors"
                onClick={handlePlayNowClick}
              >
                <Play size={16} />
                <span>PLAY NOW</span>
              </button>
              <Link
                href="/about"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
                onClick={() => trackEvent("learn_more_clicked")}
              >
                Learn more →
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-cyan-900/50 mt-8">
              <div>
                <p className="text-3xl font-bold text-cyan-400">15K+</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Relationships</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-cyan-400">98%</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Accuracy</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-cyan-400">5M+</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Players</p>
              </div>
            </div>
          </div>

          {/* Right side - Game interface */}
          <div className="relative calculator-section">
            <div className="absolute inset-0 bg-cyan-500/30 blur-[100px] rounded-full"></div>
            <div className="relative bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 shadow-2xl">
              <FlamesCalculator />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 mt-12 border-t border-cyan-900/30 flex justify-between items-center">
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} FlamesD. All rights reserved.</p>
        <div className="flex space-x-4">
          <Link
            href="#"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
            onClick={() => trackEvent("social_click", { platform: "facebook" })}
          >
            <span className="sr-only">Facebook</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
            onClick={() => trackEvent("social_click", { platform: "instagram" })}
          >
            <span className="sr-only">Instagram</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
            onClick={() => trackEvent("social_click", { platform: "twitter" })}
          >
            <span className="sr-only">Twitter</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </Link>
        </div>
      </footer>
    </div>
  )
}
