"use client"

import { useState } from "react"
import { useAnalytics } from "@/context/analytics-context"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

export function AnalyticsDebugger() {
  const { events } = useAnalytics()
  const [isOpen, setIsOpen] = useState(false)

  if (process.env.NODE_ENV === "production") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/80 border-cyan-800 text-cyan-400 hover:bg-black/90 hover:text-cyan-300"
      >
        Analytics {isOpen ? <ChevronDown className="ml-2 h-4 w-4" /> : <ChevronUp className="ml-2 h-4 w-4" />}
      </Button>

      {isOpen && (
        <div className="mt-2 p-4 bg-black/90 border border-cyan-800 rounded-md w-80 max-h-96 overflow-auto text-xs">
          <h3 className="font-bold text-cyan-400 mb-2">Analytics Events ({events.length})</h3>
          {events.length === 0 ? (
            <p className="text-gray-400">No events tracked yet</p>
          ) : (
            <ul className="space-y-2">
              {events.map((event, index) => (
                <li key={index} className="border-b border-cyan-900/30 pb-2">
                  <div className="font-medium text-white">{event.eventName}</div>
                  <div className="text-gray-400">{new Date(event.timestamp).toLocaleTimeString()}</div>
                  {event.properties && (
                    <pre className="mt-1 text-gray-300 overflow-x-auto">
                      {JSON.stringify(event.properties, null, 2)}
                    </pre>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
