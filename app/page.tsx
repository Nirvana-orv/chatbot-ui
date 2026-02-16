import { ChatContainer } from "@/components/chat-container"
import { EmberParticles } from "@/components/ember-particles"

export default function Page() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-obsidian p-3 md:p-6">
      {/* Radial glow behind chat */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,130,10,0.08)_0%,_transparent_70%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-[linear-gradient(to_top,_rgba(212,130,10,0.04),_transparent)]" />
      <EmberParticles />
      <div className="relative z-10 h-[calc(100svh-1.5rem)] w-full max-w-lg md:h-[min(720px,calc(100svh-3rem))]">
        <ChatContainer />
      </div>
    </main>
  )
}
