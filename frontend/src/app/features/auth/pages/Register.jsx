import React from "react";
import AuthShell from "../components/AuthShell";

export default function Register() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start discovering answers with a trusted AI workspace built for speed."
      helperText="Already have an account?"
      helperLink="/login"
      helperLabel="Sign in"
    >
      <div className="space-y-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[var(--chip-border)] bg-[var(--surface-soft)] px-4 py-3 text-sm font-semibold text-[var(--ink-secondary)] transition hover:-translate-y-0.5 hover:border-[#DB4437]/40 hover:text-[#DB4437]"
        >
          <i className="ri-google-fill text-base" />
          Continue with Google
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[var(--chip-border)] bg-[var(--surface-soft)] px-4 py-3 text-sm font-semibold text-[var(--ink-secondary)] transition hover:-translate-y-0.5 hover:border-[#1F2937]/30 hover:text-[#111827]"
        >
          <i className="ri-github-fill text-base" />
          Continue with GitHub
        </button>
      </div>

      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
        <span className="h-px flex-1 bg-[var(--chip-border)]" />
        or
        <span className="h-px flex-1 bg-[var(--chip-border)]" />
      </div>

      <form className="space-y-4">
        <label className="block">
          <span className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-secondary)]">
            <i className="ri-user-smile-line text-[var(--accent)]" />
            Username
          </span>
          <div className="group flex items-center rounded-xl border border-[var(--chip-border)] bg-[var(--surface-soft)] px-3 transition focus-within:border-[var(--accent)]">
            <i className="ri-user-line text-[var(--ink-muted)] group-focus-within:text-[var(--accent)]" />
            <input
              type="text"
              placeholder="Choose a username"
              className="w-full bg-transparent px-3 py-3 text-sm text-[var(--ink-primary)] outline-none placeholder:text-[var(--ink-muted)]"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-secondary)]">
            <i className="ri-mail-line text-[var(--accent)]" />
            Email
          </span>
          <div className="group flex items-center rounded-xl border border-[var(--chip-border)] bg-[var(--surface-soft)] px-3 transition focus-within:border-[var(--accent)]">
            <i className="ri-at-line text-[var(--ink-muted)] group-focus-within:text-[var(--accent)]" />
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full bg-transparent px-3 py-3 text-sm text-[var(--ink-primary)] outline-none placeholder:text-[var(--ink-muted)]"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-secondary)]">
            <i className="ri-lock-password-line text-[var(--accent)]" />
            Password
          </span>
          <div className="group flex items-center rounded-xl border border-[var(--chip-border)] bg-[var(--surface-soft)] px-3 transition focus-within:border-[var(--accent)]">
            <i className="ri-key-2-line text-[var(--ink-muted)] group-focus-within:text-[var(--accent)]" />
            <input
              type="password"
              placeholder="Create a strong password"
              className="w-full bg-transparent px-3 py-3 text-sm text-[var(--ink-primary)] outline-none placeholder:text-[var(--ink-muted)]"
            />
            <button
              type="button"
              aria-label="Toggle password visibility"
              className="text-[var(--ink-muted)] transition hover:text-[var(--accent)]"
            >
              <i className="ri-eye-line" />
            </button>
          </div>
        </label>

        <label className="inline-flex items-start gap-2 text-sm text-[var(--ink-secondary)]">
          <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[var(--accent)]" />
          <span>
            I agree to the terms and privacy policy.
          </span>
        </label>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[var(--accent-strong)]"
        >
          <i className="ri-user-add-line text-base" />
          Create account
        </button>
      </form>
    </AuthShell>
  );
}
