import { useEffect, useRef } from "react";
import { CheckCircle2, Info, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SuccessPanel({ onReset }: { onReset: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-6 py-6 text-center animate-in fade-in-0 zoom-in-95 duration-500"
    >
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 rounded-full bg-success/25 blur-xl animate-pulse-glow" />
        <div className="relative flex size-20 items-center justify-center rounded-full border-2 border-success/60 bg-success/10 text-success">
          <CheckCircle2 aria-hidden="true" className="size-10" />
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-success">
          Sucesso
        </p>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl font-bold leading-tight text-foreground outline-none sm:text-3xl"
        >
          Cadastro demonstrativo realizado com sucesso!
        </h2>
      </div>

      <div className="flex max-w-md items-start gap-3 rounded-xl border border-accent/30 bg-accent/5 p-4 text-left text-sm text-muted-foreground">
        <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
        <p>
          <strong className="text-foreground">Esta é apenas uma demonstração.</strong> Seus dados
          foram verificados somente no seu navegador e não foram enviados nem armazenados em nenhum
          banco de dados.
        </p>
      </div>

      <Button type="button" variant="neon" size="lg" onClick={onReset} className="rounded-xl">
        <RotateCcw aria-hidden="true" />
        Cadastrar outro cupom
      </Button>
    </div>
  );
}
