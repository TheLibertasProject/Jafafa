"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import meetingPhoto from "@/public/images/about/meeting.jpeg";
import { CheckIcon, ArrowRightIcon, ChevronDownIcon } from "@/components/ui/Icons";

// ─── Calendar helpers ────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_LABELS = ["Mo","Tu","We","Th","Fr","Sa","Su"];

function buildGrid(year: number, month: number): (number | null)[][] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const rawFirst = new Date(year, month, 1).getDay();
  const offset = (rawFirst + 6) % 7; // Mon-first
  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

// Closed Sundays + Mondays; some dates "fully booked" by simple modulo
function isDayUnavailable(year: number, month: number, day: number): boolean {
  const d = new Date(year, month, day);
  const wd = d.getDay(); // 0=Sun 1=Mon
  if (wd === 0 || wd === 1) return true;
  // deterministic "full" days
  return (day * 7 + month) % 11 === 0;
}

// ─── Time slot data ──────────────────────────────────────────────────────────

interface Slot { time: string; label: string; period: "morning" | "afternoon" | "evening" }

const SLOT_GROUPS: { heading: string; period: Slot["period"]; slots: Slot[] }[] = [
  {
    heading: "Morning",
    period: "morning",
    slots: [
      { time: "10:00", label: "Morning consultation", period: "morning" },
      { time: "11:30", label: "Late morning",         period: "morning" },
    ],
  },
  {
    heading: "Afternoon",
    period: "afternoon",
    slots: [
      { time: "14:00", label: "Early afternoon",  period: "afternoon" },
      { time: "15:30", label: "Afternoon",         period: "afternoon" },
      { time: "17:00", label: "Late afternoon",    period: "afternoon" },
    ],
  },
  {
    heading: "Evening",
    period: "evening",
    slots: [
      { time: "19:00", label: "Evening consultation", period: "evening" },
    ],
  },
];

// deterministic availability per date+slot
function isSlotTaken(date: Date, slotIndex: number): boolean {
  return (date.getDate() * 13 + slotIndex * 7 + date.getMonth()) % 5 === 0;
}

function getSlotsForDate(date: Date): Array<Slot & { available: boolean }> {
  const wd = date.getDay(); // 2-6 for Tue-Sat
  let idx = 0;
  return SLOT_GROUPS.flatMap((g) => {
    if (g.period === "evening" && (wd === 6)) return []; // no evening on Saturday
    return g.slots.map((s) => {
      const available = !isSlotTaken(date, idx++);
      return { ...s, available };
    });
  });
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Crumbs() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
      <div className="flex gap-[10px] items-center font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted py-7 pb-[14px] flex-wrap">
        <Link href="/" className="hover:text-ink transition-colors">Maison</Link>
        <span className="opacity-50">/</span>
        <span className="text-ink">Book a visit</span>
      </div>
    </div>
  );
}

function PrevIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M23 7H2M8 1 2 7l6 6" />
    </svg>
  );
}

interface CalendarProps {
  selected: Date | null;
  onSelect: (d: Date) => void;
}

function Calendar({ selected, onSelect }: CalendarProps) {
  const today = useMemo(() => {
    const d = new Date(); d.setHours(0,0,0,0); return d;
  }, []);
  const minDate = useMemo(() => {
    const d = new Date(today); d.setDate(d.getDate() + 2); return d;
  }, [today]);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const grid = useMemo(() => buildGrid(viewYear, viewMonth), [viewYear, viewMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  // Disable prev if it would go before today's month
  const canGoPrev = viewYear > today.getFullYear() || viewMonth > today.getMonth();

  return (
    <div className="select-none">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          aria-label="Previous month"
          className={[
            "w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-[180ms]",
            canGoPrev ? "hover:bg-cream-deep text-ink cursor-pointer" : "text-muted/30 cursor-default",
          ].join(" ")}
        >
          <PrevIcon />
        </button>
        <div className="font-serif font-light text-[22px] leading-none">
          {MONTH_NAMES[viewMonth]}{" "}
          <span className="font-mono text-[13px] tracking-[0.1em] text-muted">{viewYear}</span>
        </div>
        <button
          onClick={nextMonth}
          aria-label="Next month"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream-deep text-ink transition-colors duration-[180ms] cursor-pointer"
        >
          <ArrowRightIcon />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_LABELS.map((d) => (
          <div key={d} className="text-center font-mono text-[10px] tracking-[0.14em] uppercase text-muted py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid gap-y-1">
        {grid.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7">
            {week.map((day, di) => {
              if (!day) return <div key={di} />;

              const date = new Date(viewYear, viewMonth, day);
              date.setHours(0,0,0,0);
              const isPast = date < minDate;
              const isUnavail = isDayUnavailable(viewYear, viewMonth, day);
              const isDisabled = isPast || isUnavail;
              const isToday = date.getTime() === today.getTime();
              const isSelected =
                selected !== null &&
                selected.getFullYear() === viewYear &&
                selected.getMonth() === viewMonth &&
                selected.getDate() === day;

              return (
                <div key={di} className="flex items-center justify-center py-[2px]">
                  <button
                    onClick={() => !isDisabled && onSelect(date)}
                    disabled={isDisabled}
                    aria-label={`${day} ${MONTH_NAMES[viewMonth]}`}
                    aria-pressed={isSelected}
                    className={[
                      "w-9 h-9 rounded-[4px] font-mono text-[13px] flex items-center justify-center transition-all duration-[160ms] relative",
                      isSelected
                        ? "bg-ink text-cream cursor-pointer"
                        : isDisabled
                        ? "text-muted/25 cursor-default"
                        : "hover:bg-cream-deep cursor-pointer text-ink",
                      isToday && !isSelected ? "font-medium underline underline-offset-2" : "",
                    ].join(" ")}
                  >
                    {day}
                    {!isDisabled && !isSelected && (
                      <span className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-sage opacity-60" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-5 mt-5 font-mono text-[10px] tracking-[0.12em] uppercase text-muted">
        <span className="flex items-center gap-[6px]">
          <span className="w-[3px] h-[3px] rounded-full bg-sage inline-block" /> Available
        </span>
        <span className="flex items-center gap-[6px]">
          <span className="w-[3px] h-[3px] rounded-full bg-muted/25 inline-block" /> Unavailable
        </span>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string; id: string; type?: string; placeholder?: string;
  required?: boolean; autoComplete?: string; value: string;
  onChange: (v: string) => void; className?: string;
}
function Field({ label, id, type = "text", placeholder, required, autoComplete, value, onChange, className = "" }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-mono text-[10px] tracking-[0.16em] uppercase text-muted mb-[6px]">
        {label}{required && <span className="ml-[3px] text-ink-2">*</span>}
      </label>
      <input
        id={id} type={type} placeholder={placeholder} required={required}
        autoComplete={autoComplete} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line bg-paper/70 px-[14px] h-[46px] font-sans text-[14px] text-ink rounded-[4px] focus:outline-none focus:border-ink transition-colors duration-[180ms] placeholder:text-muted/50"
      />
    </div>
  );
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function Confirmed({ date, time, name, ref: refNo }: { date: Date; time: string; name: string; ref: string }) {
  return (
    <main className="page-enter w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
      <div className="min-h-[72vh] flex items-center">
        <div className="max-w-[600px]">
          <div className="w-10 h-10 rounded-full border border-sage flex items-center justify-center text-sage mb-10">
            <CheckIcon />
          </div>
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted mb-4">
            Reference {refNo}
          </div>
          <h1 className="font-serif font-light leading-[0.92] mb-6" style={{ fontSize: "clamp(48px,6vw,88px)" }}>
            We will see<br /><em className="italic">you then.</em>
          </h1>
          <div className="border-t border-line-soft pt-6 pb-6 border-b grid gap-[10px] mb-8">
            <div className="grid gap-1" style={{ gridTemplateColumns: "120px 1fr" }}>
              <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">Date</span>
              <span className="font-serif text-[17px]">{formatDate(date)}</span>
            </div>
            <div className="grid gap-1" style={{ gridTemplateColumns: "120px 1fr" }}>
              <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">Time</span>
              <span className="font-serif text-[17px]">{time}</span>
            </div>
            <div className="grid gap-1" style={{ gridTemplateColumns: "120px 1fr" }}>
              <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">Guest</span>
              <span className="font-serif text-[17px]">{name}</span>
            </div>
            <div className="grid gap-1" style={{ gridTemplateColumns: "120px 1fr" }}>
              <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">Location</span>
              <span className="font-serif text-[17px]">Korkeavuorenkatu 22, Helsinki</span>
            </div>
          </div>
          <p className="text-[16px] leading-[1.7] text-ink-2 max-w-[44ch] mb-10">
            A confirmation letter will arrive by email. If anything changes, write to us at{" "}
            <span className="border-b border-current">hello@jafafa.com</span>.
          </p>
          <Link href="/" className="font-mono text-[11px] tracking-[0.18em] uppercase border-b border-current pb-1 inline-flex gap-[10px] items-center group hover:text-ink transition-colors">
            Return to the maison
            <span className="group-hover:translate-x-1 transition-transform duration-[240ms]"><ArrowRightIcon /></span>
          </Link>
        </div>
      </div>
    </main>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

const EXPECT_ITEMS = [
  { no: "01", label: "Duration", value: "60 minutes, private" },
  { no: "02", label: "Includes", value: "Fragrance profiling · two samples to keep" },
  { no: "03", label: "Location", value: "Korkeavuorenkatu 22, Helsinki" },
  { no: "04", label: "Hours", value: "Tuesday – Saturday, 12:00 – 18:00" },
];

export function BookVisit() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [refNo] = useState(`JF-V-${Math.floor(10000 + Math.random() * 90000)}`);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    guests: "1", notes: "",
  });
  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  const slots = useMemo(
    () => (selectedDate ? getSlotsForDate(selectedDate) : []),
    [selectedDate]
  );

  // Group slots back for display
  const slotGroups = useMemo(() => {
    return SLOT_GROUPS.map(g => ({
      ...g,
      slots: slots.filter(s => s.period === g.period),
    })).filter(g => g.slots.length > 0);
  }, [slots]);

  const canSubmit =
    selectedDate !== null &&
    selectedTime !== null &&
    form.firstName.trim() !== "" &&
    form.lastName.trim() !== "" &&
    form.email.trim() !== "";

  const handleConfirm = () => {
    if (!canSubmit) return;
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setConfirmed(true);
    }, 1200);
  };

  const handleDateSelect = (d: Date) => {
    setSelectedDate(d);
    setSelectedTime(null); // reset time when date changes
  };

  if (confirmed && selectedDate && selectedTime) {
    return (
      <Confirmed
        date={selectedDate}
        time={selectedTime}
        name={`${form.firstName} ${form.lastName}`}
        ref={refNo}
      />
    );
  }

  return (
    <main className="page-enter">
      <Crumbs />

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5">
        <div
          className="grid gap-[60px] items-end pt-[40px] pb-20 max-[880px]:grid-cols-1 max-[880px]:gap-6 max-[880px]:pb-10"
          style={{ gridTemplateColumns: "1.2fr 1fr" }}
        >
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">
              By appointment · Helsinki
            </div>
            <h1
              className="font-serif font-light leading-[0.92] mt-[14px] mb-6"
              style={{ fontSize: "clamp(56px,8vw,128px)" }}
            >
              Book your<br />
              private <em className="italic">visit.</em>
            </h1>
            <p className="font-serif font-light text-[22px] text-ink-2 leading-[1.35] max-w-[480px]">
              Sixty minutes with one of our perfumers. A fragrance profile, a quiet room,
              and two small vials to take home.
            </p>
          </div>
          <div className="relative w-full max-[880px]:hidden" style={{ aspectRatio: "4 / 3" }}>
            <Image
              src={meetingPhoto}
              alt="Laure and Mikael at the Grasse atelier"
              fill
              style={{ objectFit: "cover" }}
              sizes="40vw"
              className="grayscale-[20%]"
            />
          </div>
        </div>
      </section>

      {/* ── Booking section ──────────────────────────────────────────────── */}
      <section className="w-full max-w-[1440px] mx-auto px-10 max-[720px]:px-5 pb-28 border-t border-line-soft">
        <div
          className="grid gap-[80px] pt-14 items-start max-[880px]:grid-cols-1 max-[880px]:gap-12"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >

          {/* ── LEFT: Calendar + info ──────────────────────────────────── */}
          <div className="sticky top-[100px] max-[880px]:static">
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-muted">01</span>
              <h2 className="font-serif font-light text-[28px] leading-none">Choose a date</h2>
            </div>

            <Calendar selected={selectedDate} onSelect={handleDateSelect} />

            {/* What to expect */}
            <div className="mt-14 border-t border-line-soft pt-8">
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted mb-6">
                What to expect
              </div>
              <div className="grid gap-0">
                {EXPECT_ITEMS.map((item, i) => (
                  <div
                    key={item.no}
                    className={`grid gap-5 py-[14px] items-baseline ${i < EXPECT_ITEMS.length - 1 ? "border-b border-line-soft" : ""}`}
                    style={{ gridTemplateColumns: "20px 90px 1fr" }}
                  >
                    <span className="font-mono text-[10px] tracking-[0.12em] text-muted/50">{item.no}</span>
                    <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">{item.label}</span>
                    <span className="font-serif text-[16px] text-ink-2 leading-[1.4]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Slots + Form ────────────────────────────────────── */}
          <div className="grid gap-0">

            {/* Time slots */}
            <div className="pb-10">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-muted">02</span>
                <h2 className="font-serif font-light text-[28px] leading-none">Select a time</h2>
              </div>

              {!selectedDate ? (
                <div className="py-10 border border-dashed border-line rounded-[4px] text-center">
                  <div className="font-serif italic text-[18px] text-muted">
                    Choose a date to see available times.
                  </div>
                </div>
              ) : (
                <div className="grid gap-6">
                  {slotGroups.map((group) => (
                    <div key={group.period}>
                      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted mb-3">
                        {group.heading}
                      </div>
                      <div className="flex flex-wrap gap-[8px]">
                        {group.slots.map((slot) => {
                          const isSelected = selectedTime === `${slot.time} — ${slot.label}`;
                          return (
                            <button
                              key={slot.time}
                              disabled={!slot.available}
                              onClick={() => slot.available && setSelectedTime(`${slot.time} — ${slot.label}`)}
                              className={[
                                "h-[42px] px-4 rounded-[4px] border font-mono text-[11px] tracking-[0.1em] transition-all duration-[180ms]",
                                isSelected
                                  ? "bg-ink border-ink text-cream cursor-pointer"
                                  : slot.available
                                  ? "border-line text-ink-2 hover:border-ink cursor-pointer"
                                  : "border-line-soft text-muted/30 cursor-default line-through",
                              ].join(" ")}
                            >
                              {slot.time}
                              <span className="ml-[8px] font-sans text-[11px] tracking-normal normal-case opacity-70">
                                {slot.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form */}
            <div className="border-t border-line-soft pt-10">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-muted">03</span>
                <h2 className="font-serif font-light text-[28px] leading-none">Your details</h2>
              </div>

              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="First name" id="firstName" required autoComplete="given-name"
                    value={form.firstName} onChange={set("firstName")} />
                  <Field label="Last name" id="lastName" required autoComplete="family-name"
                    value={form.lastName} onChange={set("lastName")} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Email" id="email" type="email" required autoComplete="email"
                    placeholder="your@email.com" value={form.email} onChange={set("email")} />
                  <Field label="Phone" id="phone" type="tel" autoComplete="tel"
                    placeholder="+358 40 000 0000" value={form.phone} onChange={set("phone")} />
                </div>

                {/* Guests */}
                <div>
                  <label htmlFor="guests" className="block font-mono text-[10px] tracking-[0.16em] uppercase text-muted mb-[6px]">
                    Number of guests
                  </label>
                  <div className="relative">
                    <select
                      id="guests"
                      value={form.guests}
                      onChange={(e) => set("guests")(e.target.value)}
                      className="w-full border border-line bg-paper/70 px-[14px] h-[46px] font-sans text-[14px] text-ink rounded-[4px] focus:outline-none focus:border-ink transition-colors duration-[180ms] appearance-none cursor-pointer"
                    >
                      {[1,2,3,4,5,6].map(n => (
                        <option key={n} value={String(n)}>
                          {n} {n === 1 ? "guest" : "guests"}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                      <ChevronDownIcon />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block font-mono text-[10px] tracking-[0.16em] uppercase text-muted mb-[6px]">
                    Special requests
                    <span className="ml-2 opacity-60 normal-case font-sans text-[10px] tracking-normal">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => set("notes")(e.target.value)}
                    placeholder="Allergies, accessibility needs, fragrance preferences…"
                    rows={4}
                    className="w-full border border-line bg-paper/70 px-[14px] py-[12px] font-sans text-[14px] text-ink rounded-[4px] focus:outline-none focus:border-ink transition-colors duration-[180ms] placeholder:text-muted/50 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Summary + CTA */}
            <div className="border-t border-line pt-8 mt-2">
              {/* Booking summary */}
              {(selectedDate || selectedTime) && (
                <div className="bg-paper border border-line-soft rounded-[4px] px-5 py-4 mb-5 grid gap-[6px]">
                  {selectedDate && (
                    <div className="flex justify-between items-baseline font-mono text-[10.5px] tracking-[0.12em] uppercase">
                      <span className="text-muted">Date</span>
                      <span className="text-ink">{formatDate(selectedDate)}</span>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="flex justify-between items-baseline font-mono text-[10.5px] tracking-[0.12em] uppercase">
                      <span className="text-muted">Time</span>
                      <span className="text-ink">{selectedTime}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-baseline font-mono text-[10.5px] tracking-[0.12em] uppercase">
                    <span className="text-muted">Price</span>
                    <span className="text-sage">Complimentary</span>
                  </div>
                </div>
              )}

              {!canSubmit && (
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted mb-4">
                  {!selectedDate
                    ? "Select a date to continue"
                    : !selectedTime
                    ? "Select a time to continue"
                    : "Complete your details to confirm"}
                </p>
              )}

              <button
                onClick={handleConfirm}
                disabled={!canSubmit || placing}
                className={[
                  "w-full h-[54px] rounded-[4px] border font-sans text-[13px] tracking-[0.1em] uppercase font-medium",
                  "transition-all duration-[280ms] flex items-center justify-center gap-[12px]",
                  placing
                    ? "bg-sage border-sage text-cream cursor-default"
                    : canSubmit
                    ? "bg-gold text-ink border-gold hover:bg-gold-soft hover:border-gold-soft cursor-pointer"
                    : "bg-cream-deep border-line text-muted/50 cursor-default",
                ].join(" ")}
              >
                {placing ? (
                  <>
                    <span
                      className="w-[14px] h-[14px] rounded-full border border-cream/30 border-t-cream inline-block"
                      style={{ animation: "spin 0.7s linear infinite" }}
                    />
                    Confirming your visit…
                  </>
                ) : (
                  <>Confirm booking</>
                )}
              </button>

              <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted text-center mt-4">
                Free to attend · Cancellation up to 24 hours before
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
