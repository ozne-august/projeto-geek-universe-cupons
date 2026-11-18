import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

type FormFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
  valid?: boolean | undefined;
  icon?: ReactNode | undefined;
};

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(function FormField(
  { id, label, hint, error, valid, icon, className, ...inputProps },
  ref,
) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex items-center gap-1 text-sm font-semibold text-foreground">
        {label}
        <span aria-hidden="true" className="text-accent">
          *
        </span>
        <span className="sr-only">(obrigatório)</span>
      </label>

      <div className="relative">
        {icon && (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors [&_svg]:size-[18px]",
              error && "text-destructive",
            )}
          >
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          required
          aria-required="true"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "h-13 w-full rounded-xl border-2 border-input bg-field px-4 text-base text-foreground placeholder:text-muted-foreground/60 transition-[border-color,box-shadow] outline-none",
            "hover:border-primary-glow/60 focus-visible:border-accent focus-visible:shadow-glow-accent",
            icon && "pl-11",
            "pr-11",
            error && "border-destructive hover:border-destructive focus-visible:border-destructive",
            valid && !error && "border-success/60",
            className,
          )}
          {...inputProps}
        />
        {(error || valid) && (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 [&_svg]:size-[18px]",
              error ? "text-destructive" : "text-success",
            )}
          >
            {error ? <AlertCircle /> : <CheckCircle2 />}
          </span>
        )}
      </div>

      {error ? (
        <p id={errorId} className="flex items-start gap-1.5 text-sm font-medium text-destructive">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span>
            <span className="sr-only">Erro: </span>
            {error}
          </span>
        </p>
      ) : hint ? (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
