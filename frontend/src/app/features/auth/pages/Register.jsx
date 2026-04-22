import React, { useState } from "react";
import { useSelector } from "react-redux";
import AuthShell from "../components/AuthShell";
import GoogleAuthBtn from "../components/GoogleAuthBtn";
import GithubAuthBtn from "../components/GithubAuthBtn";
import FormGroup from "../components/FormGroup";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";
import Loading from "../../../components/Loading";

export default function Register() {
    const {user,loading} = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleRegisterUser } = useAuth();
  const navigate = useNavigate();

  const handleRegisterSubmit = async(e) => {
    e.preventDefault();
    try {
      await handleRegisterUser({ username, email, password });
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  if(!loading && user){
    return <Navigate to="/" replace />
  }
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
      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-(--ink-muted)">
        <span className="h-px flex-1 bg-(--chip-border)" />
        or
        <span className="h-px flex-1 bg-(--chip-border)" />
      </div>

      <form className="space-y-4" onSubmit={handleRegisterSubmit}>
        <FormGroup onChange={(e)=>setUsername(e.target.value)} label="Username" icon="ri-user-line" placeholder="Choose a username" />
        <FormGroup onChange={(e)=>setEmail(e.target.value)} label="Email" icon="ri-at-line" type="email" placeholder="you@company.com" />
        <FormGroup onChange={(e)=>setPassword(e.target.value)} label="Password" icon="ri-lock-password-line" type="password" placeholder="Create a strong password" />
        
        <label className="inline-flex items-start gap-2 text-sm text-(--ink-secondary)">
          <input required type="checkbox" className="mt-0.5 h-4 w-4 accent-(--accent)" />
          <span>
            I agree to the terms and privacy policy.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-(--accent) px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-(--accent-strong) disabled:cursor-not-allowed disabled:opacity-85 disabled:hover:translate-y-0 disabled:hover:bg-(--accent)"
        >
          {loading ? (
            <>
              <i className="ri-loader-4-line animate-spin text-base" />
              Creating your account...
            </>
          ) : (
            <>
              <i className="ri-user-add-line text-base" />
              Create account
            </>
          )}
        </button>

        {loading && <Loading label="Creating your secure workspace..." />}
      </form>
    </AuthShell>
  );
}
