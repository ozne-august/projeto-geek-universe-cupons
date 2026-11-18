import { Sparkles } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="relative z-10 border-b border-border/60 bg-background/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-4 sm:flex-row sm:px-8">
        <a
          href="/projeto-geek-universe-cupons/"
          aria-label="Geek Universe — página inicial"
          className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <LogoMark />
          <span className="font-display text-xl font-bold tracking-[0.18em] text-foreground">
            GEEK <span className="text-gradient-brand">UNIVERSE</span>
          </span>
        </a>
        <p className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-accent">
          <Sparkles aria-hidden="true" className="size-3.5" />
          Promoção especial
        </p>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className="size-9 transition-transform group-hover:rotate-12">
      <defs>
        <linearGradient id="gu-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--primary-glow)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="none" stroke="url(#gu-mark)" strokeWidth="2.5" />
      <ellipse cx="20" cy="20" rx="14" ry="5" fill="none" stroke="url(#gu-mark)" strokeWidth="1.5" transform="rotate(-25 20 20)" opacity="0.8" />
      <circle cx="20" cy="20" r="5" fill="url(#gu-mark)" />
    </svg>
  );
}
