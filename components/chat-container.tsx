"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChatHeader } from "@/components/chat-header"
import { ChatMessage, type Message } from "@/components/chat-message"
import { ChatInput } from "@/components/chat-input"
import { ChatWelcome } from "@/components/chat-welcome"
import { TypingIndicator } from "@/components/typing-indicator"
import { ScrollArea } from "@/components/ui/scroll-area"

let mood = 0 // grows with stupidity, resets with respect
let lastUserIntent: string | null = null

function normalizeIntent(text: string) {
  return text.toLowerCase().split(/\s+/).slice(0, 4).join(" ")
}

function generateDrogonReply(input: string): string {
  const text = input.toLowerCase()
  const intent = normalizeIntent(text)

  // Repetition detection
  if (lastUserIntent && intent === lastUserIntent) {
    mood += 1
    return "Yes, yes, you already said that. I understood it the first time. That was the disappointing part 😒."
  }

  // Greeting handling
  if (text.includes("hi") || text.includes("hello")) {
    if (lastUserIntent === "greeting") {
      mood += 1
      return "You are still greeting. This is not getting better."
    }
    lastUserIntent = "greeting"
    return "Mōre… Ȳgha, jorrāelagon-tīk."
  }
  if (text.includes("what") || text.includes("huh")) {
    lastUserIntent = intent
    return "You never let me forget that you lack intelligence."
  }
  if (text.includes("who are you")) {
    lastUserIntent = intent
    return "Horrible question but I'll answer anyways. I'm Drogon, The Winged Shadow, The Black Beast and The Queen's Monster."
  }

  if (text.includes("help")) {
    mood += 1
    lastUserIntent = intent
    return mood > 2
      ? "Help? Pffft. Seek it elsewhere, I have better things to do."
      : "Help is earned. Speak clearly."
  }

  if (text.includes("why")) {
    mood += 1
    lastUserIntent = intent
    return "Why? Because I said so. Suck it."
  }

  if (text.length < 5) {
    mood += 1
    lastUserIntent = intent
    return "Toddlers put more effort than this 🤦‍♂️."
  }

  // Rare wisdom drop
  if (Math.random() < 0.15) {
    mood = Math.max(0, mood - 1)
    lastUserIntent = intent
    return "So you do have a brain."
  }

  lastUserIntent = intent

  return mood > 3
    ? "I am losing patience. Refine the thought or be reduced to silence."
    : "That almost sounded intelligent. Do it again."
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

 async function handleSend(content: string) {
  const userMessage: Message = {
    id: crypto.randomUUID(),
    content,
    role: "user",
    timestamp: new Date(),
  }

  setMessages((prev) => [...prev, userMessage])
  setIsTyping(true)

  try {
    const res = await fetch(
      "https://drogon-backend.vercel.app/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      }
    )

    if (!res.ok) {
      throw new Error("Backend error")
    }

    const data = await res.json()

    const botMessage: Message = {
      id: crypto.randomUUID(),
      content: data.reply,
      role: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, botMessage])
  } catch (err) {
    const errorMessage: Message = {
      id: crypto.randomUUID(),
      content: "🔥 Drogon is silent. The flames failed.",
      role: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, errorMessage])
  } finally {
    setIsTyping(false)
  }
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
