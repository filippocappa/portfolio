'use client'

import { OPEN_PALETTE_EVENT } from './CommandPalette'

export default function SearchButton({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      Search
      <kbd className="hidden sm:inline font-sans text-xs border border-current rounded-[3px] px-1.5 py-px opacity-70">⌘K</kbd>
    </button>
  )
}
