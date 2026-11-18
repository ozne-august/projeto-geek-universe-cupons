/**
 * Local-only validation and input masks for the coupon sign-up demo.
 * Nothing here sends or stores personal data.
 */

export type CouponFormValues = {
  coupon: string;
  cpf: string;
  email: string;
  phone: string;
};

export type CouponFormField = keyof CouponFormValues;
export type CouponFormErrors = Partial<Record<CouponFormField, string>>;

export const FIELD_ORDER: CouponFormField[] = ["coupon", "cpf", "email", "phone"];

export const EMPTY_VALUES: CouponFormValues = { coupon: "", cpf: "", email: "", phone: "" };

export const onlyDigits = (value: string) => value.replace(/\D/g, "");

/** 000.000.000-00 */
export function maskCPF(value: string): string {
  const d = onlyDigits(value).slice(0, 11);
  let out = d.slice(0, 3);
  if (d.length > 3) out += "." + d.slice(3, 6);
  if (d.length > 6) out += "." + d.slice(6, 9);
  if (d.length > 9) out += "-" + d.slice(9, 11);
  return out;
}

/** (00) 00000-0000 — falls back to (00) 0000-0000 while typing up to 10 digits */
export function maskPhone(value: string): string {
  const d = onlyDigits(value).slice(0, 11);
  if (!d) return "";
  if (d.length <= 2) return `(${d}`;
  const ddd = d.slice(0, 2);
  const rest = d.slice(2);
  if (rest.length <= 4) return `(${ddd}) ${rest}`;
  if (d.length <= 10) return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`;
  return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`;
}

/** Uppercase, letters/digits/hyphen only, max 24 chars */
export function maskCoupon(value: string): string {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 24);
}

export function isValidCPF(value: string): boolean {
  const d = onlyDigits(value);
  if (d.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(d)) return false;
  const nums = d.split("").map(Number);
  const check = (len: number) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += (nums[i] ?? 0) * (len + 1 - i);
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };
  return check(9) === nums[9] && check(10) === nums[10];
}

const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/;

export function isValidEmail(value: string): boolean {
  const v = value.trim();
  return v.length <= 254 && EMAIL_RE.test(v);
}

export function validateField(field: CouponFormField, raw: string): string | undefined {
  const value = raw.trim();
  switch (field) {
    case "coupon": {
      if (!value) return "Informe o código do cupom.";
      if (value.length < 6) return "O código deve ter pelo menos 6 caracteres.";
      if (!/^[A-Z0-9]+(-[A-Z0-9]+)*$/.test(value))
        return "Use apenas letras, números e hífen, como em GEEK2026-ABCD.";
      return undefined;
    }
    case "cpf": {
      const d = onlyDigits(value);
      if (!d) return "Informe seu CPF.";
      if (d.length < 11) return "O CPF deve ter 11 dígitos.";
      if (!isValidCPF(d)) return "CPF inválido. Confira os números digitados.";
      return undefined;
    }
    case "email": {
      if (!value) return "Informe seu e-mail.";
      if (!isValidEmail(value)) return "Digite um e-mail válido, como voce@exemplo.com.";
      return undefined;
    }
    case "phone": {
      const d = onlyDigits(value);
      if (!d) return "Informe seu celular com DDD.";
      if (d.length < 11) return "Digite o celular completo com DDD: (00) 00000-0000.";
      if (d[0] === "0" || Number(d.slice(0, 2)) < 11) return "DDD inválido. Confira os dois primeiros dígitos.";
      if (d[2] !== "9") return "Números de celular começam com 9 logo após o DDD.";
      return undefined;
    }
  }
}

export function validateAll(values: CouponFormValues): CouponFormErrors {
  const errors: CouponFormErrors = {};
  for (const field of FIELD_ORDER) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}
