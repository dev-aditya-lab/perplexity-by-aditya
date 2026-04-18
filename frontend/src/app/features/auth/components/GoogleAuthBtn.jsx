import React from 'react'

export default function GoogleAuthBtn() {
    return (
        <div>
            <button
                type="button"
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-(--chip-border) bg-(--surface-soft) px-4 py-3 text-sm font-semibold text-(--ink-secondary) transition hover:-translate-y-0.5 hover:border-[#DB4437]/40 hover:text-[#DB4437]"
            >
                <i className="ri-google-fill text-base" />
                Continue with Google
            </button>
        </div>
    )
}
