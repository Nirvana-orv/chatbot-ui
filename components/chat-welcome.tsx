"use client"

import { Flame, Swords, BookOpen, Skull, Shield } from "lucide-react"

interface ChatWelcomeProps {
  onSuggestionClick: (text: string) => void
}

const suggestions = [
  { icon: Swords, text: "Tell me a tale of fire and blood" },
  { icon: BookOpen, text: "Share the wisdom of the ancients" },
  { icon: Skull, text: "What terrors lurk in the dark?" },
  { icon: Shield, text: "How do I conquer my fears?" },
]

export function ChatWelcome({ onSuggestionClick }: ChatWelcomeProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-10">
      {/* Dragon flame icon */}
      <div className="relative mb-6">
        <div className="flex size-20 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d4820a,#e6a817,#f59e0b)] shadow-2xl shadow-ember/40 animate-fire-pulse">
          <Flame className="size-10 text-obsidian" />
        </div>
        <div className="absolute -inset-3 -z-10 rounded-3xl bg-ember/10 blur-xl" />
      </div>

      <h2 className="mb-1 text-center text-xl font-bold tracking-wide text-ember-glow">
        {"I AM DROGON"}
      </h2>
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-ash">
        {"The Winged Shadow"}
      </p>
      <p className="mb-8 max-w-xs text-center text-sm leading-relaxed text-muted-foreground">
        {"Born of fire and fury. I have burned cities, crossed seas of stars, and gathered the wisdom of a thousand ages. Speak, and I shall answer."}
      </p>

      <div className="flex w-full max-w-sm flex-col gap-2.5">
        {suggestions.map((s) => (
          <button
            key={s.text}
            onClick={() => onSuggestionClick(s.text)}
            className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-border bg-scorched px-4 py-3.5 text-left text-sm text-card-foreground transition-all duration-300 hover:border-ember/50 hover:shadow-lg hover:shadow-ember/15"
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(212,130,10,0.06),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <s.icon className="relative size-4 shrink-0 text-ember transition-all duration-300 group-hover:text-dragonfire group-hover:scale-110" />
            <span className="relative">{s.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
