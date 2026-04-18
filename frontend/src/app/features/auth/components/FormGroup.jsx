import React from 'react'

export default function FormGroup({ label, icon = "ri-user-line", type = "text", placeholder }) {
    return (
        <div>
            <label className="block">
                <span className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-(--ink-secondary)">
                    <i className="ri-user-smile-line text-(--accent)" />
                    {label}
                </span>
                <div className="group flex items-center rounded-xl border border-(--chip-border) bg-(--surface-soft) px-3 transition focus-within:border-(--accent)">
                    <i className={`${icon} text-(--ink-muted) group-focus-within:text-(--accent)`} />
                    <input
                        type={type}
                        placeholder={placeholder}
                        className="w-full bg-transparent px-3 py-3 text-sm text-(--ink-primary) outline-none placeholder:text-(--ink-muted)"
                    />
                    {
                        type === "password" && (
                            <button
                                type="button"
                                aria-label="Toggle password visibility"
                                className="text-(--ink-muted) transition hover:text-(--accent)"
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
