import React from "react";
import { Link } from "react-router";

const logoUrl =
  "https://framerusercontent.com/images/gcMkPKyj2RX8EOEja8A1GWvCb7E.jpg?width=5000&height=5000";

export default function AuthShell({
  title,
  subtitle,
  helperText,
  helperLink,
  helperLabel,
  children,
}) {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-(--page-bg) text-(--ink-primary)">
      <div className="pointer-events-none absolute -left-16 top-10 h-52 w-52 rounded-full bg-(--accent-soft) blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 rounded-full bg-(--brand-soft) blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-(--surface-soft) blur-3xl" />

      <section className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 px-4 py-8 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:px-8">
        <aside className="relative hidden items-center lg:flex">
          <div className="space-y-8 rounded-4xl border border-(--card-border) bg-(--card-bg) p-10 shadow-[0_30px_80px_-35px_rgba(16,24,40,0.35)] backdrop-blur-md">
            <div className="inline-flex items-center gap-3 rounded-full border border-(--chip-border) bg-(--chip-bg) px-4 py-2 text-sm font-semibold text-(--ink-secondary)">
              <i className="ri-sparkling-2-line text-(--accent)" />
              AI Knowledge Assistant
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-5xl leading-tight tracking-tight text-(--ink-primary)">
                Ask faster.
                <br />
                Think deeper.
              </h1>
              <p className="max-w-md text-base leading-7 text-(--ink-muted)">
                Perplexity-inspired workspace for focused answers, trusted sources, and
                clean conversations.
              </p>
            </div>

            <ul className="space-y-4 text-sm text-(--ink-secondary)">
              <li className="flex items-center gap-3">
                <i className="ri-shield-check-line text-lg text-(--accent)" />
                Enterprise-grade account security and privacy
              </li>
              <li className="flex items-center gap-3">
                <i className="ri-flashlight-line text-lg text-(--accent)" />
                Smart retrieval with contextual AI responses
              </li>
              <li className="flex items-center gap-3">
                <i className="ri-links-line text-lg text-(--accent)" />
                Source-backed answers for better confidence
              </li>
              <li className="flex items-center gap-3">
                <i className="ri-shield-user-line text-lg text-(--accent)" />
                Build by Aditya Gupta
              </li>
            </ul>
          </div>
        </aside>

        <div className="flex items-center justify-center py-4 lg:py-8">
          <article className="w-full max-w-lg animate-rise rounded-4xl border border-(--card-border) bg-(--card-bg) p-6 shadow-[0_30px_90px_-40px_rgba(16,24,40,0.45)] sm:p-8">
            <div className="mb-8 flex items-center justify-between">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-(--chip-border) bg-(--chip-bg) px-3 py-1.5 text-xs font-semibold tracking-[0.08em] text-(--ink-secondary) transition hover:border-(--accent) hover:text-(--accent)"
              >
                <i className="ri-arrow-left-line" />
                BACK
              </Link>

              <div className="inline-flex items-center gap-3">
                <img
                  src={logoUrl}
                  alt="Perplexity Logo"
                  className="h-10 rounded-xl object-cover ring-2 ring-(--chip-border)"
                />
                <div>
                  <p className="font-display text-base leading-none text-(--ink-primary)">
                    Perplexity
                  </p>
                  <p className="text-xs text-(--ink-muted)">Intelligent answers</p>
                </div>
              </div>
            </div>

            <header className="mb-6 space-y-2">
              <h2 className="font-display text-3xl leading-tight text-(--ink-primary)">
                {title}
              </h2>
              <p className="text-sm text-(--ink-muted)">{subtitle}</p>
            </header>

            {children}

            <p className="mt-6 text-center text-sm text-(--ink-muted)">
              {helperText}{" "}
              <Link
                to={helperLink}
                className="font-semibold text-(--accent) transition hover:text-(--accent-strong)"
              >
                {helperLabel}
              </Link>
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
