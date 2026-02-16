"use client"

import { cn } from "@/lib/utils"
import { Flame, User } from "lucide-react"

export interface Message {
  id: string
  content: string
  role: "user" | "bot"
  timestamp: Date
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "group flex items-end gap-2.5 px-4 md:px-6",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110",
          isUser
            ? "bg-[linear-gradient(135deg,#d4820a,#e6a817)] shadow-md shadow-ember/20"
            : "bg-secondary border border-border"
        )}
      >
        {isUser ? (
          <User className="size-3.5 text-obsidian" />
        ) : (
          <Flame className="size-3.5 text-ember" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          "flex max-w-[75%] flex-col gap-1",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "relative rounded-2xl px-4 py-2.5 text-sm leading-relaxed transition-shadow duration-200",
            isUser
              ? "rounded-br-sm bg-[linear-gradient(135deg,#d4820a,#b36d08)] text-obsidian font-medium shadow-lg shadow-ember/20 group-hover:shadow-xl group-hover:shadow-ember/30"
              : "rounded-bl-sm bg-scorched text-card-foreground border border-border shadow-sm group-hover:shadow-md group-hover:border-ember/20"
          )}
        >
          {!isUser && (
            <div className="absolute -left-px top-3 h-3 w-px bg-ember/40" />
          )}
          {message.content}
        </div>
        <span className="px-1 text-[10px] text-ash opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  )
}
