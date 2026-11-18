import { Cpu, Dices, Gamepad2, Rocket, Sparkle, Star } from "lucide-react";

const ICONS = [
  { Icon: Gamepad2, className: "left-[6%] top-[18%] size-10 text-primary-glow/25", delay: "0s" },
  { Icon: Dices, className: "right-[8%] top-[12%] size-9 text-accent/25", delay: "-2s" },
  { Icon: Rocket, className: "left-[44%] top-[6%] size-7 text-accent/20", delay: "-4s" },
  { Icon: Cpu, className: "right-[4%] bottom-[22%] size-10 text-primary-glow/20", delay: "-6s" },
  { Icon: Star, className: "left-[3%] bottom-[30%] size-6 text-accent/25", delay: "-3s" },
  { Icon: Sparkle, className: "left-[52%] bottom-[8%] size-6 text-primary-glow/25", delay: "-5s" },
];

export function BackgroundDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="orb-primary absolute -left-40 -top-40 size-[640px] rounded-full" />
      <div className="orb-accent absolute -right-48 top-1/3 size-[560px] rounded-full" />
      {ICONS.map(({ Icon, className, delay }, i) => (
        <Icon
          key={i}
          strokeWidth={1.5}
          className={`absolute hidden md:block motion-safe:animate-float-slow ${className}`}
          style={{ animationDelay: delay }}
        />
      ))}
    </div>
  );
}
