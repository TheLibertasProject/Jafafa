"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckIcon, ArrowRightIcon, ChevronDownIcon } from "@/components/ui/Icons";

// ─── Static info ─────────────────────────────────────────────────────────────

const INFO_ITEMS = [
  { no: "01", label: "Address", value: "Korkeavuorenkatu 22, Helsinki" },
  { no: "02", label: "Hours", value: "Tuesday – Saturday, 12:00 – 18:00" },
  { no: "03", label: "Write", value: "letters@maisonjafafa.com" },
  { no: "04", label: "Press", value: "press@maisonjafafa.com" },
];

const SUBJECTS = ["An order", "A fragrance", "The press", "Something else"];

// ─── Crumbs ───────────────────────────────────────────────────────────────────

function Crumbs() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
      <div className="flex gap-[10px] items-center font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted py-7 pb-[14px]">
        <Link href="/" className="hover:text-ink transition-colors">Maison</Link>
        <span className="opacity-50">/</span>
        <span className="text-ink">Contact</span>
      </div>
    </div>
  );
}

// ─── Form fields ──────────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  value: string;
  onChange: (v: string) => void;
}

function Field({ label, id, type = "text", placeholder, required, autoComplete, value, onChange }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[10px] tracking-[0.16em] uppercase text-muted mb-[6px]">
        {label}
        {required && <span className="ml-[3px] text-ink-2">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line bg-paper/70 px-[14px] h-[46px] font-sans text-[14px] text-ink rounded-[4px] focus:outline-none focus:border-ink transition-colors duration-[180ms] placeholder:text-muted/50"
      />
    </div>
  );
}

// ─── Success state ────────────────────────────────────────────────────────────

function Sent({ name }: { name: string }) {
  return (
    <main className="page-enter w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
      <div className="min-h-[64vh] flex items-center">
        <div className="max-w-[600px]">
          <div className="w-10 h-10 rounded-full border border-sage flex items-center justify-center text-sage mb-10">
            <CheckIcon />
          </div>
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted mb-4">
            Thank you, {name}
          </div>
          <h1 className="font-serif font-light leading-[0.92] mb-6" style={{ fontSize: "clamp(48px,6vw,88px)" }}>
            Your letter is<br />
            with <em className="italic">us.</em>
          </h1>
          <p className="text-[16px] leading-[1.7] text-ink-2 max-w-[44ch] mb-10">
            We reply within three working days. If it is urgent, write to us
            directly at{" "}
            <a href="mailto:letters@maisonjafafa.com" className="border-b border-current">
              letters@maisonjafafa.com
            </a>
            .
          </p>
          <Link
            href="/"
            className="font-mono text-[11px] tracking-[0.18em] uppercase border-b border-current pb-1 inline-flex gap-[10px] items-center group hover:text-ink transition-colors"
          >
            Return to the maison
            <span className="group-hover:translate-x-1 transition-transform duration-[240ms]">
              <ArrowRightIcon />
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: SUBJECTS[0],
    message: "",
  });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const canSubmit = form.name.trim() !== "" && form.email.trim() !== "" && form.message.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSent(true);
  };

  if (sent) {
    return <Sent name={form.name.trim().split(" ")[0]} />;
  }

  return (
    <main className="page-enter">
      <Crumbs />

      {/* Hero */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pt-[40px] pb-16 max-[880px]:pb-10">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">Get in touch</div>
        <h1
          className="font-serif font-light leading-[0.92] mt-[14px] mb-6"
          style={{ fontSize: "clamp(56px,8vw,128px)" }}
        >
          Write to the <em className="italic">maison.</em>
        </h1>
        <p className="font-serif font-light text-[22px] text-ink-2 leading-[1.35] max-w-[520px]">
          For orders, fragrance questions, press, or anything in between.
          A person reads every letter.
        </p>
      </section>

      {/* Info + form */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pb-28 border-t border-line-soft">
        <div className="grid grid-cols-[1fr_1.2fr] gap-[80px] pt-14 items-start max-[880px]:grid-cols-1 max-[880px]:gap-12">

          {/* Left: info */}
          <div className="sticky top-[100px] max-[880px]:static">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted mb-6">
              At the maison
            </div>
            <div className="grid gap-0">
              {INFO_ITEMS.map((item, i) => (
                <div
                  key={item.no}
                  className={`grid gap-5 py-[14px] items-baseline ${i < INFO_ITEMS.length - 1 ? "border-b border-line-soft" : ""}`}
                  style={{ gridTemplateColumns: "20px 90px 1fr" }}
                >
                  <span className="font-mono text-[10px] tracking-[0.12em] text-muted/50">{item.no}</span>
                  <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">{item.label}</span>
                  {item.label === "Write" || item.label === "Press" ? (
                    <a
                      href={`mailto:${item.value}`}
                      className="font-serif text-[16px] text-ink-2 leading-[1.4] border-b border-transparent hover:border-current transition-colors w-fit"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-serif text-[16px] text-ink-2 leading-[1.4]">{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            <p className="text-[14px] leading-[1.7] text-ink-2 max-w-[42ch] mt-10">
              Prefer to talk in person? Sixty minutes with one of our
              perfumers, by appointment.
            </p>
            <Link
              href="/book-visit"
              className="font-mono text-[11px] tracking-[0.18em] uppercase border-b border-current pb-1 inline-flex gap-[10px] items-center mt-4 group"
            >
              Book a visit
              <span className="inline-block transition-transform duration-[240ms] group-hover:translate-x-1">
                <ArrowRightIcon />
              </span>
            </Link>
          </div>

          {/* Right: form */}
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted mb-6">
              Send a letter
            </div>
            <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
              <div className="grid grid-cols-2 gap-4 max-[520px]:grid-cols-1">
                <Field
                  label="Name"
                  id="name"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={set("name")}
                />
                <Field
                  label="Email"
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={set("email")}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block font-mono text-[10px] tracking-[0.16em] uppercase text-muted mb-[6px]">
                  This is about
                </label>
                <div className="relative">
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={(e) => set("subject")(e.target.value)}
                    className="w-full border border-line bg-paper/70 px-[14px] h-[46px] font-sans text-[14px] text-ink rounded-[4px] focus:outline-none focus:border-ink transition-colors duration-[180ms] appearance-none cursor-pointer"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <div className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-[10px] tracking-[0.16em] uppercase text-muted mb-[6px]">
                  Message
                  <span className="ml-[3px] text-ink-2">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  value={form.message}
                  onChange={(e) => set("message")(e.target.value)}
                  placeholder="Tell us what's on your mind…"
                  rows={7}
                  className="w-full border border-line bg-paper/70 px-[14px] py-[12px] font-sans text-[14px] text-ink rounded-[4px] focus:outline-none focus:border-ink transition-colors duration-[180ms] placeholder:text-muted/50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className={[
                  "w-full h-[54px] rounded-[4px] border font-sans text-[13px] tracking-[0.1em] uppercase font-medium mt-2",
                  "transition-all duration-[280ms]",
                  canSubmit
                    ? "bg-ink text-cream border-ink hover:opacity-[0.84] cursor-pointer"
                    : "bg-cream-deep border-line text-muted/50 cursor-default",
                ].join(" ")}
              >
                Send letter
              </button>

              <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted text-center mt-2">
                We reply within three working days
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
