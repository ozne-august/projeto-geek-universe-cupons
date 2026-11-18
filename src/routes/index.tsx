import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Gift, ScrollText, ShieldCheck, ShoppingBag, Ticket, Trophy } from "lucide-react";

import { BackgroundDecor } from "@/components/geek/BackgroundDecor";
import { CouponForm } from "@/components/geek/CouponForm";
import { RulesDialog } from "@/components/geek/RulesDialog";
import { SiteFooter } from "@/components/geek/SiteFooter";
import { SiteHeader } from "@/components/geek/SiteHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cadastre seu cupom e concorra! | Geek Universe" },
      {
        name: "description",
        content:
          "Promoção especial Geek Universe: cadastre o código do seu cupom e concorra a prêmios no sorteio.",
      },
      { property: "og:title", content: "Cadastre seu cupom e concorra! | Geek Universe" },
      {
        property: "og:description",
        content: "Preencha seus dados e participe da promoção especial da Geek Universe.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STEPS = [
  { icon: ShoppingBag, title: "Compre", text: "Cada compra participante gera um código de cupom." },
  { icon: Ticket, title: "Cadastre", text: "Informe o código e seus dados no formulário." },
  { icon: Trophy, title: "Concorra", text: "Acompanhe o resultado nos canais oficiais." },
];

function Index() {
  const [rulesOpen, setRulesOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <a
        href="#cadastro"
        className="sr-only z-50 rounded-lg bg-accent px-4 py-2 font-semibold text-accent-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Pular para o formulário
      </a>
      <BackgroundDecor />
      <SiteHeader />

      <main className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-start gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1fr_1.05fr] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-8 lg:py-20">
        <section aria-labelledby="hero-title" className="flex flex-col gap-6 lg:col-start-1 lg:row-start-1">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-glow/40 bg-primary/15 px-3 py-1 font-mono text-xs font-medium text-primary-glow">
            <Gift aria-hidden="true" className="size-3.5" />
            Sorteio Geek Universe 2026
          </p>
          <h1
            id="hero-title"
            className="text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Cadastre seu cupom e <span className="text-gradient-brand">concorra!</span>
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            Preencha seus dados e participe da nossa promoção. Sua próxima aventura pode valer um
            prêmio!
          </p>
        </section>

        <section
          id="cadastro"
          aria-label="Formulário de cadastro do cupom"
          className="scroll-mt-6 lg:col-start-2 lg:row-span-2 lg:row-start-1"
        >
          <div className="card-neon rounded-3xl p-6 sm:p-8">
            <CouponForm onOpenRules={() => setRulesOpen(true)} />
          </div>
        </section>

        <section aria-label="Como participar" className="flex flex-col gap-6 lg:col-start-1 lg:row-start-2">
          <ol className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className="flex gap-3 rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-sm xl:flex-col"
              >
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary-glow"
                >
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-foreground">
                    <span className="mr-1.5 font-mono text-accent">0{i + 1}</span>
                    {title}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button variant="neon" size="lg" className="rounded-xl" onClick={() => setRulesOpen(true)}>
              <ScrollText aria-hidden="true" />
              Consultar regras do sorteio
            </Button>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck aria-hidden="true" className="size-4 text-success" />
              Seus dados não saem do seu navegador.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <RulesDialog open={rulesOpen} onOpenChange={setRulesOpen} />
    </div>
  );
}
