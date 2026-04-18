import React from "react";
import AuthShell from "../components/AuthShell";
import GoogleAuthBtn from "../components/GoogleAuthBtn";
import GithubAuthBtn from "../components/GithubAuthBtn";
import FormGroup from "../components/FormGroup";

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
        <GoogleAuthBtn />
        <GithubAuthBtn />
      </div>
      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)]">
        <span className="h-px flex-1 bg-[var(--chip-border)]" />
        or
        <span className="h-px flex-1 bg-[var(--chip-border)]" />
      </div>

      <form className="space-y-4">
        <FormGroup label="Username" icon="ri-user-line" placeholder="Choose a username" />
        <FormGroup label="Email" icon="ri-at-line" type="email" placeholder="you@company.com" />
        <FormGroup label="Password" icon="ri-lock-password-line" type="password" placeholder="Create a strong password" />
        
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
