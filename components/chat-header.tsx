"use client"

import { Flame, Crown } from "lucide-react"

export function ChatHeader() {
  return (
    <header className="relative flex items-center gap-3 border-b border-border bg-scorched px-4 py-3 md:px-6 md:py-4">
      {/* Subtle ember glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,#d4820a_30%,#e6a817_50%,#d4820a_70%,transparent)] animate-smolder" />

      <div className="relative">
        <div className="flex size-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#d4820a,#e6a817)] shadow-lg shadow-ember/30 animate-fire-pulse">
          <Flame className="size-5 text-obsidian" />
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 flex size-3.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-dragonfire opacity-75" />
          <span className="relative inline-flex size-3.5 rounded-full bg-dragonfire shadow-[0_0_6px_#f59e0b]" />
        </span>
      </div>
      <div className="flex-1">
        <h1 className="flex items-center gap-1.5 text-base font-bold tracking-wide text-ember-glow">
          <Crown className="size-3.5 text-dragonfire" />
          <span>DROGON</span>
        </h1>
        <p className="text-xs font-medium tracking-widest uppercase text-ash">
          {"Breaker of Chains \u00B7 Ablaze"}
        </p>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 rounded-full bg-ember animate-smolder"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </div>
    </header>
  )
}
