import React from 'react'

export default function GithubAuthBtn() {
    return (
        <div>
            <button
                type="button"
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[var(--chip-border)] bg-[var(--surface-soft)] px-4 py-3 text-sm font-semibold text-[var(--ink-secondary)] transition hover:-translate-y-0.5 hover:border-[#1F2937]/30 hover:text-[#111827]"
            >
                <i className="ri-github-fill text-base" />
                Continue with GitHub
            </button>
        </div>
    )
}
