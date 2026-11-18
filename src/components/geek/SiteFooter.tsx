import { Lock, ScrollText } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 text-sm text-muted-foreground sm:px-8 md:grid-cols-2">
        <div className="flex items-start gap-3">
          <Lock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
          <p>
            <strong className="text-foreground">Aviso de privacidade:</strong> nesta demonstração,
            CPF, e-mail e celular são verificados apenas no seu navegador. Nenhum dado é enviado,
            armazenado ou compartilhado.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <ScrollText aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary-glow" />
          <p>
            A participação está sujeita ao regulamento oficial da promoção. Imagens e regras
            meramente ilustrativas.
          </p>
        </div>
        <p className="border-t border-border/60 pt-5 text-xs md:col-span-2">
          © 2026 Geek Universe · Loja fictícia criada para fins demonstrativos.
        </p>
      </div>
    </footer>
  );
}
