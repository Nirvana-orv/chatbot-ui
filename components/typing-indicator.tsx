"use client"

import { Flame } from "lucide-react"

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 px-4 md:px-6">
      <div className="flex size-8 items-center justify-center rounded-full bg-secondary border border-border">
        <Flame className="size-3.5 text-ember" />
      </div>
      <div className="rounded-2xl rounded-bl-sm border border-border bg-scorched px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5" aria-label="Drogon is breathing fire">
          <span className="size-2 animate-bounce rounded-full bg-ember [animation-delay:0ms] shadow-[0_0_4px_#d4820a]" />
          <span className="size-2 animate-bounce rounded-full bg-dragonfire [animation-delay:150ms] shadow-[0_0_4px_#f59e0b]" />
          <span className="size-2 animate-bounce rounded-full bg-ember-glow [animation-delay:300ms] shadow-[0_0_4px_#e6a817]" />
        </div>
      </div>
    </div>
  )
}
