import { CalendarRange, FileWarning, Megaphone, ShieldCheck, Users } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Section = { icon: ReactNode; title: string; items: string[] };

const SECTIONS: Section[] = [
  {
    icon: <CalendarRange />,
    title: "Período da promoção",
    items: [
      "Cadastros aceitos de 01/12/2026 a 31/01/2027, até 23h59 (horário de Brasília).",
      "Cupons cadastrados fora desse período não serão considerados.",
    ],
  },
  {
    icon: <Users />,
    title: "Critérios de participação",
    items: [
      "Pessoas físicas, maiores de 18 anos, residentes no Brasil e com CPF válido.",
      "Cada compra acima de R$ 150,00 na Geek Universe gera 1 cupom.",
      "Não há limite de cupons por participante, mas cada código só pode ser cadastrado uma vez.",
    ],
  },
  {
    icon: <ShieldCheck />,
    title: "Validação dos cupons",
    items: [
      "Os códigos seguem o formato GEEK2026-XXXX e são conferidos com a nota fiscal da compra.",
      "Cupons duplicados, rasurados ou vinculados a compras canceladas serão invalidados.",
      "Os dados informados devem ser os mesmos do titular da compra.",
    ],
  },
  {
    icon: <Megaphone />,
    title: "Sorteio e divulgação dos resultados",
    items: [
      "O sorteio acontecerá em 10/02/2027, com transmissão ao vivo nos canais oficiais.",
      "Os ganhadores serão divulgados no site e contatados por e-mail e WhatsApp em até 5 dias úteis.",
      "O prêmio deve ser resgatado em até 30 dias após o contato.",
    ],
  },
];

export function RulesDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="card-neon max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl gap-0 overflow-y-auto rounded-2xl border-0 p-0 sm:rounded-2xl">
        <DialogHeader className="space-y-2 border-b border-border p-6 pr-14 text-left">
          <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-accent">
            Geek Universe · Promoção especial
          </p>
          <DialogTitle className="font-display text-2xl font-bold">Regras do sorteio</DialogTitle>
          <DialogDescription>Confira como funciona a participação na promoção.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 p-6">
          <div
            role="note"
            className="flex items-start gap-3 rounded-xl border border-warning/50 bg-warning/10 p-4 text-sm"
          >
            <FileWarning aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-warning" />
            <p className="text-foreground">
              <strong>Regras ilustrativas.</strong> Este conteúdo é apenas demonstrativo e deve ser
              substituído pelo regulamento oficial da promoção antes de qualquer uso real.
            </p>
          </div>

          {SECTIONS.map((section) => (
            <section key={section.title} className="space-y-3">
              <h3 className="flex items-center gap-2.5 text-base font-bold text-foreground">
                <span
                  aria-hidden="true"
                  className="flex size-8 items-center justify-center rounded-lg bg-primary/20 text-primary-glow [&_svg]:size-4"
                >
                  {section.icon}
                </span>
                {section.title}
              </h3>
              <ul className="space-y-2 pl-11 text-sm text-muted-foreground">
                {section.items.map((item) => (
                  <li key={item} className="relative before:absolute before:-left-4 before:top-2 before:size-1.5 before:rounded-full before:bg-accent">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="flex justify-end border-t border-border p-6">
          <DialogClose asChild>
            <Button variant="neon" size="lg" className="w-full rounded-xl sm:w-auto">
              Entendi, fechar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
