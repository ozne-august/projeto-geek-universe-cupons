import { describe, expect, it } from "vitest";

import {
  isValidCPF,
  maskCPF,
  maskCoupon,
  maskPhone,
  validateAll,
  validateField,
} from "./coupon-validation";

describe("CPF", () => {
  it("accepts a CPF with correct check digits", () => {
    expect(isValidCPF("529.982.247-25")).toBe(true);
  });
  it("rejects a CPF with a wrong check digit", () => {
    expect(isValidCPF("529.982.247-24")).toBe(false);
  });
  it("rejects repeated-digit CPFs", () => {
    expect(isValidCPF("111.111.111-11")).toBe(false);
  });
  it("masks as 000.000.000-00", () => {
    expect(maskCPF("52998224725")).toBe("529.982.247-25");
  });
});

describe("phone", () => {
  it("masks an 11-digit mobile with DDD", () => {
    expect(maskPhone("11987654321")).toBe("(11) 98765-4321");
  });
  it("requires the full mobile number", () => {
    expect(validateField("phone", "(11) 9876-543")).toBeDefined();
  });
  it("requires a 9 after the DDD", () => {
    expect(validateField("phone", "(11) 88765-4321")).toBeDefined();
  });
  it("accepts a valid mobile", () => {
    expect(validateField("phone", "(11) 98765-4321")).toBeUndefined();
  });
});

describe("email", () => {
  it("rejects an address without a domain", () => {
    expect(validateField("email", "voce@exemplo")).toBeDefined();
  });
  it("accepts a normal address", () => {
    expect(validateField("email", "voce@exemplo.com")).toBeUndefined();
  });
});

describe("coupon", () => {
  it("uppercases and strips invalid characters", () => {
    expect(maskCoupon("geek2026-ab cd!")).toBe("GEEK2026-ABCD");
  });
  it("accepts the placeholder format", () => {
    expect(validateField("coupon", "GEEK2026-ABCD")).toBeUndefined();
  });
});

describe("form", () => {
  it("reports every empty required field", () => {
    expect(Object.keys(validateAll({ coupon: "", cpf: "", email: "", phone: "" }))).toEqual([
      "coupon",
      "cpf",
      "email",
      "phone",
    ]);
  });
});
