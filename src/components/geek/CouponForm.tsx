import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AlertTriangle, AtSign, Fingerprint, Loader2, Smartphone, Ticket } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  EMPTY_VALUES,
  FIELD_ORDER,
  maskCPF,
  maskCoupon,
  maskPhone,
  validateAll,
  validateField,
  type CouponFormField,
  type CouponFormValues,
} from "@/lib/coupon-validation";
import { FormField } from "./FormField";
import { SuccessPanel } from "./SuccessPanel";

const MASKS: Partial<Record<CouponFormField, (v: string) => string>> = {
  coupon: maskCoupon,
  cpf: maskCPF,
  phone: maskPhone,
};

const PROCESSING_MS = 1400;

type Status = "idle" | "processing" | "success";

export function CouponForm({ onOpenRules }: { onOpenRules: () => void }) {
  const [values, setValues] = useState<CouponFormValues>(EMPTY_VALUES);
  const [touched, setTouched] = useState<Partial<Record<CouponFormField, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const refs = useRef<Partial<Record<CouponFormField, HTMLInputElement | null>>>({});

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const allErrors = validateAll(values);
  const visibleError = (field: CouponFormField) =>
    touched[field] || submitted ? allErrors[field] : undefined;
  const isValid = (field: CouponFormField) =>
    Boolean(touched[field] || submitted) && !allErrors[field] && values[field].length > 0;
  const visibleErrorCount = FIELD_ORDER.filter((f) => visibleError(f)).length;

  const handleChange = (field: CouponFormField) => (e: ChangeEvent<HTMLInputElement>) => {
    const mask = MASKS[field];
    const next = mask ? mask(e.target.value) : e.target.value;
    setValues((prev) => ({ ...prev, [field]: next }));
  };

  const handleBlur = (field: CouponFormField) => () => {
    if (values[field] || submitted) setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === "processing") return;
    setSubmitted(true);
    const errors = validateAll(values);
    const firstInvalid = FIELD_ORDER.find((f) => errors[f]);
    if (firstInvalid) {
      refs.current[firstInvalid]?.focus();
      return;
    }
    setStatus("processing");
    timer.current = setTimeout(() => {
      // Demo only: discard everything, nothing is sent or stored.
      setValues(EMPTY_VALUES);
      setTouched({});
      setSubmitted(false);
      setStatus("success");
    }, PROCESSING_MS);
  };

  const reset = () => {
    setStatus("idle");
    setTimeout(() => refs.current.coupon?.focus(), 0);
  };

  if (status === "success") return <SuccessPanel onReset={reset} />;

  const processing = status === "processing";
  const common = (field: CouponFormField) => ({
    ref: (el: HTMLInputElement | null) => {
      refs.current[field] = el;
    },
    name: field,
    value: values[field],
    onChange: handleChange(field),
    onBlur: handleBlur(field),
    error: visibleError(field),
    valid: isValid(field),
    disabled: processing,
  });

  return (
    <form noValidate onSubmit={handleSubmit} aria-labelledby="form-title" className="flex flex-col gap-5">
      <div className="space-y-1">
        <h2 id="form-title" className="text-xl font-bold text-foreground sm:text-2xl">
          Seus dados de participação
        </h2>
        <p className="text-sm text-muted-foreground">
          Campos marcados com <span aria-hidden="true" className="text-accent">*</span>
          <span className="sr-only">asterisco</span> são obrigatórios.
        </p>
      </div>

      {submitted && visibleErrorCount > 0 && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-foreground"
        >
          <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-destructive" />
          <p>
            {visibleErrorCount === 1
              ? "Corrija 1 campo destacado para continuar."
              : `Corrija ${visibleErrorCount} campos destacados para continuar.`}
          </p>
        </div>
      )}

      <FormField
        {...common("coupon")}
        id="coupon"
        label="Código do Cupom"
        placeholder="GEEK2026-ABCD"
        hint="Está impresso na sua nota fiscal ou no e-mail de confirmação da compra."
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        maxLength={24}
        icon={<Ticket />}
        className="font-mono tracking-wider"
      />

      <div className="grid gap-5">
        <FormField
          {...common("cpf")}
          id="cpf"
          label="CPF"
          placeholder="000.000.000-00"
          inputMode="numeric"
          autoComplete="off"
          maxLength={14}
          icon={<Fingerprint />}
          className="font-mono"
        />
        <FormField
          {...common("email")}
          id="email"
          label="E-mail"
          type="email"
          placeholder="voce@exemplo.com"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          maxLength={254}
          icon={<AtSign />}
        />
        <FormField
          {...common("phone")}
          id="phone"
          label="Celular / WhatsApp"
          type="tel"
          placeholder="(00) 00000-0000"
          inputMode="tel"
          autoComplete="tel-national"
          maxLength={15}
          icon={<Smartphone />}
          className="font-mono"
        />
      </div>

      <Button type="submit" variant="cta" size="xl" disabled={processing} aria-busy={processing} className="mt-2 w-full">
        {processing ? (
          <>
            <Loader2 aria-hidden="true" className="animate-spin" />
            Processando…
          </>
        ) : (
          "Cadastrar cupom"
        )}
      </Button>

      <p className="sr-only" aria-live="polite">
        {processing ? "Processando seu cadastro demonstrativo." : ""}
      </p>

      <div className="flex flex-col items-center gap-1 text-center text-sm text-muted-foreground">
        <span>Antes de participar, leia como funciona.</span>
        <button
          type="button"
          onClick={onOpenRules}
          className="rounded-md font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Consultar regras do sorteio
        </button>
      </div>
    </form>
  );
}
