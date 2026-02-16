"use client"

import { useState, useEffect } from "react"

interface Ember {
  id: number
  left: string
  size: number
  duration: number
  delay: number
  opacity: number
}

export function EmberParticles() {
  const [embers, setEmbers] = useState<Ember[]>([])

  useEffect(() => {
    setEmbers(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 4,
        duration: 6 + Math.random() * 10,
        delay: Math.random() * 8,
        opacity: 0.3 + Math.random() * 0.5,
      }))
    )
  }, [])

  if (embers.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {embers.map((e) => (
        <span
          key={e.id}
          className="absolute bottom-0 block rounded-full animate-ember-float"
          style={{
            left: e.left,
            width: e.size,
            height: e.size,
            background: `radial-gradient(circle, #f59e0b, #d4820a)`,
            boxShadow: `0 0 ${e.size * 2}px #d4820a, 0 0 ${e.size * 4}px rgba(230,168,23,0.3)`,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
            opacity: e.opacity,
          }}
        />
      ))}
    </div>
  )
}
