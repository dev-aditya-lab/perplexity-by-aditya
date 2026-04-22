import React from "react";

export default function Loading({
  label = "Loading secure workspace...",
  compact = false,
  fullScreen = false,
  detail = "Validating credentials and preparing session",
}) {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 text-sm text-(--ink-secondary)">
        <i className="ri-loader-4-line animate-spin text-(--accent)" />
        <span>{label}</span>
      </div>
    );
  }

  if (fullScreen) {
    return (
      <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-(--page-bg) px-4">
        <div className="pointer-events-none absolute -left-16 top-10 h-52 w-52 rounded-full bg-(--accent-soft) blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 rounded-full bg-(--brand-soft) blur-3xl" />

        <section className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-(--card-border) bg-(--card-bg) p-6 shadow-[0_30px_90px_-40px_rgba(16,24,40,0.45)] sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(14,165,164,0.12)_30%,transparent_60%)] animate-[shine_1.8s_linear_infinite]" />

          <div className="relative flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-(--surface-soft) ring-1 ring-(--chip-border)">
              <i className="ri-loader-4-line animate-spin text-2xl text-(--accent)" />
            </div>

            <div className="space-y-1">
              <p className="font-display text-lg font-semibold text-(--ink-primary)">{label}</p>
              <p className="text-sm text-(--ink-muted)">{detail}</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-(--card-border) bg-(--chip-bg) p-4">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(14,165,164,0.12)_30%,transparent_60%)] animate-[shine_1.6s_linear_infinite]" />

      <div className="relative flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-(--surface-soft) ring-1 ring-(--chip-border)">
          <i className="ri-loader-4-line animate-spin text-lg text-(--accent)" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-semibold text-(--ink-primary)">{label}</p>
          <p className="text-xs text-(--ink-muted)">{detail}</p>
        </div>
      </div>
    </div>
  );
}
