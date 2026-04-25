"use client";

import {
  HeroStyles,
  LiveVisitors,
  RotatingText,
  CategoryPills,
} from "./hero";

export default function EducationHero() {
  return (
    <>
      <HeroStyles />

      <section
        className="edunews-body relative w-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white overflow-hidden border-b border-white/5"
        aria-label="EDU NEWS – Education Blog & Learning Resources"
        role="banner"
      >
        {/* Animated gradient background */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          
        />

        {/* Floating geometric shapes */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 border border-blue-400/20 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute top-40 right-20 w-24 h-24 border border-indigo-400/20 rounded-lg rotate-45 animate-pulse" style={{ animationDuration: '5s' }} />
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-purple-400/20 rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute top-1/3 right-1/3 w-20 h-20 border border-cyan-400/20 rounded-lg animate-pulse" style={{ animationDuration: '7s' }} />
        </div>

        {/* Ambient glow orbs with enhanced effects */}
        <div aria-hidden="true">
          <div
            className="glow-orb animate-blob"
            style={{
              width: 400,
              height: 400,
              top: -150,
              left: -100,
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
              animationDuration: '8s',
            }}
          />
          <div
            className="glow-orb animate-blob animation-delay-2000"
            style={{
              width: 300,
              height: 300,
              bottom: -100,
              right: -80,
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)",
              animationDuration: '10s',
            }}
          />
          <div
            className="glow-orb animate-blob animation-delay-4000"
            style={{
              width: 250,
              height: 250,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: "radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)",
              animationDuration: '12s',
            }}
          />
        </div>

        {/* Decorative grid pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Wave decoration at bottom */}
        <div 
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-24 opacity-20"
          style={{
            background: "linear-gradient(to top, rgba(59, 130, 246, 0.3), transparent)",
            clipPath: "polygon(0 100%, 100% 100%, 100% 60%, 75% 80%, 50% 60%, 25% 80%, 0 60%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Live visitors indicator */}
          <LiveVisitors />

          {/* Main content */}
          <div className="py-4 sm:py-6 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
            {/* Left: Brand + search */}
            <div className="flex-1 min-w-0">
              {/* Brand line */}
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-4 mb-1">
                <h2 className="edunews-brand text-4xl sm:text-5xl font-bold leading-none tracking-tight">
                  {'EDU NEWS'.split('').map((letter, index) => (
                    <span key={index} className="typing-letter morphing-text bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-400 bg-clip-text text-transparent">
                      {letter === ' ' ? '\u00A0' : letter}
                    </span>
                  ))}
                </h2>
                <span className="text-slate-300 text-lg sm:text-xl font-medium">
                  Education &amp; Learning Resources
                </span>
              </div>

              {/* Rotating benefit text */}
              <RotatingText />

              {/* Search bar
              <SearchBar /> */}
            </div>
          </div>

          {/* Category pills */}
          <CategoryPills />
        </div>
      </section>
    </>
  );
}
