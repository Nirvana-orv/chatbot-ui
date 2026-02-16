"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChatHeader } from "@/components/chat-header"
import { ChatMessage, type Message } from "@/components/chat-message"
import { ChatInput } from "@/components/chat-input"
import { ChatWelcome } from "@/components/chat-welcome"
import { TypingIndicator } from "@/components/typing-indicator"
import { ScrollArea } from "@/components/ui/scroll-area"

const botResponses = [
  "Fire cannot kill a dragon. And neither can ignorance\u2014let me scorch it away for you.",
  "I have flown over the bones of empires. What you seek is simpler than you think, mortal.",
  "The ancient scrolls burned long ago, but their knowledge lives in me. Here is what I know...",
  "You dare question the winged shadow? Bold. I respect that. The answer is as follows...",
  "Across a thousand burning horizons I have gathered this truth: every great conquest begins with a single, terrible question.",
  "The weak fear knowledge. The strong breathe it like fire. Let me kindle your understanding.",
  "In the ashes of old worlds, new wisdom is born. Consider this carefully...",
  "My scales have deflected sharper questions than this. But I shall answer anyway, for you have earned my attention.",
]

function getRandomBotResponse(): string {
  return botResponses[Math.floor(Math.random() * botResponses.length)]
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
        content: getRandomBotResponse(),
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
