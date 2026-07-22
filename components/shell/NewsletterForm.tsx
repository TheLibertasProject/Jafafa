"use client";

import { useState } from "react";

/**
 * Footer newsletter signup. Client-side only (this is a portfolio demo):
 * submitting shows the quiet confirmation instead of posting anywhere.
 */
export function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="font-body text-[16px] md:text-[15px] text-ink-2 border-b border-ink pb-[11px] max-w-[320px] m-0">
        Noted. Two letters a year, no more.
      </p>
    );
  }

  return (
    <form
      className="flex items-center gap-3 border-b border-ink pb-[11px] max-w-[320px]"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        required
        placeholder="Your email"
        className="flex-1 bg-transparent border-0 outline-none font-body text-[16px] md:text-[15px] text-ink placeholder:text-muted"
      />
      <button
        type="submit"
        aria-label="Sign up for letters"
        className="text-ink text-[16px] cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-ink focus-visible:outline-offset-2"
      >
        →
      </button>
    </form>
  );
}
