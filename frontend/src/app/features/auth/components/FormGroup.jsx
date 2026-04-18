import React from 'react'

export default function FormGroup({ label, icon = "ri-user-line", type = "text", placeholder }) {
    return (
        <div>
            <label className="block">
                <span className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-secondary)]">
                    <i className="ri-user-smile-line text-[var(--accent)]" />
                    {label}
                </span>
                <div className="group flex items-center rounded-xl border border-[var(--chip-border)] bg-[var(--surface-soft)] px-3 transition focus-within:border-[var(--accent)]">
                    <i className={`${icon} text-[var(--ink-muted)] group-focus-within:text-[var(--accent)]`} />
                    <input
                        type={type}
                        placeholder={placeholder}
                        className="w-full bg-transparent px-3 py-3 text-sm text-[var(--ink-primary)] outline-none placeholder:text-[var(--ink-muted)]"
                    />
                    {
                        type === "password" && (
                            <button
                                type="button"
                                aria-label="Toggle password visibility"
                                className="text-[var(--ink-muted)] transition hover:text-[var(--accent)]"
                            >
                                <i className="ri-eye-line" />
                            </button>
                        )
                    }
                </div>
            </label>
        </div>
    )
}
