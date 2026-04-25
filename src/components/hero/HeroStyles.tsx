export function HeroStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');

      .edunews-brand { font-family: 'Cormorant Garamond', Georgia, serif; }
      .edunews-body  { font-family: 'DM Sans', system-ui, sans-serif; }

      /* Rotating text transitions */
      .rotate-enter  { animation: slideUp 0.3s ease forwards; }
      .rotate-exit   { animation: slideDown 0.3s ease forwards; }

      @keyframes slideUp {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideDown {
        from { opacity: 1; transform: translateY(0); }
        to   { opacity: 0; transform: translateY(-10px); }
      }

      /* Gradient shift animation */
      @keyframes gradientShift {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.5; }
      }

      /* Morphing gradient animation */
      @keyframes morphingGradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .morphing-text {
        background-size: 200% 200%;
        animation: morphingGradient 4s ease infinite;
      }

      /* Letter typing animation */
      @keyframes typingMorph {
        0%, 100% { opacity: 1; transform: translateY(0) scale(1); }
        50% { opacity: 0.7; transform: translateY(-2px) scale(1.05); }
      }
      .typing-letter {
        display: inline-block;
        animation: typingMorph 2s ease-in-out infinite;
      }
      .typing-letter:nth-child(1) { animation-delay: 0s; }
      .typing-letter:nth-child(2) { animation-delay: 0.1s; }
      .typing-letter:nth-child(3) { animation-delay: 0.2s; }
      .typing-letter:nth-child(4) { animation-delay: 0.3s; }
      .typing-letter:nth-child(5) { animation-delay: 0.4s; }
      .typing-letter:nth-child(6) { animation-delay: 0.5s; }
      .typing-letter:nth-child(7) { animation-delay: 0.6s; }
      .typing-letter:nth-child(8) { animation-delay: 0.7s; }

      /* Blob animation */
      @keyframes blob {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(20px, -30px) scale(1.1); }
        50% { transform: translate(-20px, 20px) scale(0.9); }
        75% { transform: translate(30px, 10px) scale(1.05); }
      }
      .animate-blob {
        animation: blob 10s ease-in-out infinite;
      }
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      .animation-delay-4000 {
        animation-delay: 4s;
      }

      /* Pulse dot */
      @keyframes pulse-ring {
        0%   { transform: scale(1);   opacity: 1; }
        100% { transform: scale(2.4); opacity: 0; }
      }
      .pulse-dot::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: #60a5fa;
        animation: pulse-ring 1.8s ease-out infinite;
      }

      /* Category pill hover */
      .cat-pill {
        transition: background 0.15s, color 0.15s, border-color 0.15s;
        cursor: pointer;
      }
      .cat-pill:hover {
        background: rgba(59,130,246,0.15);
        border-color: rgba(59,130,246,0.4);
        color: #3b82f6;
      }
      .cat-pill.active {
        background: rgba(59,130,246,0.2);
        border-color: rgba(59,130,246,0.6);
        color: #3b82f6;
      }

      /* Suggestion item */
      .suggest-item {
        transition: background 0.12s;
        cursor: pointer;
      }
      .suggest-item:hover { background: rgba(255,255,255,0.06); }

      /* Ambient glow orb */
      .glow-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(100px);
        pointer-events: none;
      }
    `}</style>
  );
}
