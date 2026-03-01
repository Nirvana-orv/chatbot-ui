"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChatHeader } from "@/components/chat-header"
import { ChatMessage, type Message } from "@/components/chat-message"
import { ChatInput } from "@/components/chat-input"
import { ChatWelcome } from "@/components/chat-welcome"
import { TypingIndicator } from "@/components/typing-indicator"
import { ScrollArea } from "@/components/ui/scroll-area"

let mood = 0 // grows with stupidity, resets with respect

function generateDrogonReply(input: string): string {
  const text = input.toLowerCase()

  // Escalating sarcasm
  if (text.includes("hi") || text.includes("hello")) {
    return "You greet a dragon as if I were a tavern boy. Brave. Foolish. Continue."
  }

  if (text.includes("who are you")) {
    return "I am Drogon. Scourge of certainty. Collector of bad questions."
  }

  if (text.includes("help")) {
    mood += 1
    return mood > 2
      ? "Help? Again? The flames grow impatient. Ask better."
      : "Help is earned. Speak clearly."
  }

  if (text.includes("why")) {
    mood += 1
    return "'Why' is the favorite word of those who refuse to think."
  }

  if (text.length < 5) {
    mood += 1
    return "That is not a thought. That is a cough."
  }

  // Rare wisdom drop
  if (Math.random() < 0.15) {
    mood = Math.max(0, mood - 1)
    return "Very well. Wisdom, briefly: mastery begins when you stop asking safe questions."
  }

  // Default intelligent chaos
  return mood > 3
    ? "I am losing patience. Refine the thought or be reduced to silence."
    : "Interesting. Dangerous. Continue."
}

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector("[data-slot='scroll-area-viewport']")
      if (viewport) {
        viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" })
      }
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  function handleSend(content: string) {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      role: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    const delay = 1000 + Math.random() * 2000
    setTimeout(() => {
      const botMessage: Message = {
        id: crypto.randomUUID(),
        content: generateDrogonReply(content),
        role: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, delay)
  }

  const hasMessages = messages.length > 0

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-scorched shadow-2xl shadow-ember/10 md:rounded-3xl">
      {/* Outer glow ring */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-[linear-gradient(135deg,rgba(212,130,10,0.15),transparent_40%,transparent_60%,rgba(230,168,23,0.1))] md:rounded-3xl" />

      <ChatHeader />

      <ScrollArea ref={scrollRef} className="flex-1 overflow-hidden">
        {!hasMessages ? (
          <ChatWelcome onSuggestionClick={handleSend} />
        ) : (
          <div className="flex flex-col gap-4 py-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isTyping && <TypingIndicator />}
          </div>
        )}
      </ScrollArea>

      <ChatInput onSend={handleSend} isTyping={isTyping} />
    </div>
  )
}
