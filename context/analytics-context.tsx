"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type AnalyticsEvent = {
  eventName: string
  properties?: Record<string, any>
  timestamp: number
}

type AnalyticsContextType = {
  trackEvent: (eventName: string, properties?: Record<string, any>) => void
  trackPageView: (pageName: string) => void
  events: AnalyticsEvent[]
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<AnalyticsEvent[]>([])

  // Track an event with optional properties
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    const newEvent = {
      eventName,
      properties,
      timestamp: Date.now(),
    }

    setEvents((prevEvents) => [...prevEvents, newEvent])

    // In a real implementation, you would send this to your analytics service
    console.log("Analytics Event:", newEvent)
  }

  // Track page view
  const trackPageView = (pageName: string) => {
    trackEvent("page_view", { page: pageName })
  }

  // Track initial page load
  useEffect(() => {
    trackPageView("home")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <AnalyticsContext.Provider value={{ trackEvent, trackPageView, events }}>{children}</AnalyticsContext.Provider>
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)

  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider")
  }

  return context
}
