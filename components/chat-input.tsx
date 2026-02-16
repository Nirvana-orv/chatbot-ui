"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Flame } from "lucide-react"

interface ChatInputProps {
  onSend: (message: string) => void
  isTyping: boolean
}

export function ChatInput({ onSend, isTyping }: ChatInputProps) {
  const [value, setValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [value])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || isTyping) return
    onSend(trimmed)
    setValue("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const hasValue = value.trim().length > 0

  return (
    <div className="relative border-t border-border bg-scorched px-4 py-3 md:px-6 md:py-4">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,#d4820a_30%,#e6a817_50%,#d4820a_70%,transparent)] animate-smolder" />

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Speak to the dragon..."
            rows={1}
            disabled={isTyping}
            className="w-full resize-none rounded-xl border border-border bg-obsidian px-4 py-2.5 text-sm leading-relaxed text-foreground placeholder:text-ash focus:border-ember focus:ring-2 focus:ring-ember/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 transition-all duration-200"
            aria-label="Chat message input"
          />
        </div>
        <Button
          type="submit"
          size="icon"
          disabled={!hasValue || isTyping}
          className="size-10 shrink-0 rounded-xl bg-[linear-gradient(135deg,#d4820a,#e6a817)] text-obsidian shadow-lg shadow-ember/30 transition-all duration-200 hover:shadow-xl hover:shadow-ember/40 hover:brightness-110 disabled:opacity-30 disabled:shadow-none"
          aria-label="Send message"
        >
          <Flame className="size-4" />
        </Button>
      </form>
      <p className="mt-2 text-center text-[11px] font-mono text-ash/60 tracking-wider">
        {"Fire is the purest death. Verify the flames."}
      </p>
    </div>
  )
}
