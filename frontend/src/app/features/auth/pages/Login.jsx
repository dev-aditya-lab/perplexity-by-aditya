import React from "react";
import { Link } from "react-router";
import AuthShell from "../components/AuthShell";
import GoogleAuthBtn from "../components/GoogleAuthBtn";
import GithubAuthBtn from "../components/GithubAuthBtn";
import FormGroup from "../components/FormGroup";

export default function Login() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Continue your research flow with secure and seamless access."
      helperText="Don't have an account?"
      helperLink="/register"
      helperLabel="Create one"
    >
      <div className="space-y-4">
      <GoogleAuthBtn/>
      <GithubAuthBtn/>
      </div>

      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-(--ink-muted)">
        <span className="h-px flex-1 bg-(--chip-border)" />
        or
        <span className="h-px flex-1 bg-(--chip-border)" />
      </div>

      <form className="space-y-4">
              <FormGroup label="Email or username" icon="ri-at-line"  placeholder="Enter email or username" />
              <FormGroup label="Password" icon="ri-lock-password-line" type="password" placeholder="Enter your password" />
              
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <label className="inline-flex items-center gap-2 text-(--ink-secondary)">
            <input type="checkbox" className="h-4 w-4 accent-(--accent)" />
            Remember me
          </label>
          <Link to="/" className="font-medium text-(--accent) hover:text-(--accent-strong)">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-(--accent) px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-(--accent-strong)"
        >
          <i className="ri-login-box-line text-base" />
          Sign in to dashboard
        </button>
      </form>
    </AuthShell>
  );
}
