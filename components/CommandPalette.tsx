'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'

export const OPEN_PALETTE_EVENT = 'open-command-palette'

const COMMANDS = [
  { id: 'home', label: 'Home', action: '/', category: 'Page' },
  { id: 'roen', label: 'Roen Labs', action: '/work/roen-labs', category: 'Project' },
  { id: 'deal', label: 'Deal Autopsy', action: '/work/deal-autopsy', category: 'Project' },
  { id: 'aide', label: 'Aide', action: '/work/aide', category: 'Project' },
  { id: 'email', label: 'Email Filippo', action: 'mailto:hello@filippocappa.com', category: 'Contact' },
  { id: 'linkedin', label: 'LinkedIn', action: 'https://www.linkedin.com/in/filippo-cappa', category: 'Contact' },
  { id: 'github', label: 'GitHub', action: 'https://github.com/filippocappa', category: 'Contact' },
  { id: 'roen-site', label: 'Open roenlabs.com', action: 'https://www.roenlabs.com', category: 'Link' },
]

const fuse = new Fuse(COMMANDS, {
  keys: ['label', 'category'],
  threshold: 0.4,
})

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === 'Escape') setIsOpen(false)
    }
    const open = () => setIsOpen(true)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener(OPEN_PALETTE_EVENT, open)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener(OPEN_PALETTE_EVENT, open)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setActiveIndex(0)
      setQuery('')
    }
  }, [isOpen])

  const filteredCommands = query.trim() === ''
    ? COMMANDS
    : fuse.search(query).map(result => result.item)

  const handleSelect = (cmd: typeof COMMANDS[0]) => {
    if (cmd.action.startsWith('http')) {
      window.open(cmd.action, '_blank', 'noopener,noreferrer')
    } else if (cmd.action.startsWith('mailto:')) {
      window.location.href = cmd.action
    } else {
      router.push(cmd.action)
    }
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredCommands.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (prev + 1) % filteredCommands.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
    } else if (e.key === 'Enter') {
      if (filteredCommands[activeIndex]) {
        handleSelect(filteredCommands[activeIndex])
      }
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-start justify-center px-4 pt-[15vh] z-50" role="dialog" aria-modal="true" aria-label="Search the site">
          <div
            onClick={() => setIsOpen(false)}
            className="palette-fade absolute inset-0 bg-ink/40"
          />
          <div
            className="palette-drop relative w-full max-w-xl bg-paper border border-rule shadow-[0_24px_48px_-16px_rgba(0,0,0,0.35)] font-sans"
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setActiveIndex(0)
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search projects and links"
              aria-label="Search projects and links"
              className="w-full bg-transparent px-5 py-4 text-lg outline-none border-b-2 border-ink placeholder:text-muted"
            />

            <ul className="max-h-[360px] overflow-y-auto py-2">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, index) => (
                  <li
                    key={cmd.id}
                    onClick={() => handleSelect(cmd)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`px-5 py-2.5 cursor-pointer flex items-baseline justify-between gap-4 ${
                      index === activeIndex ? 'bg-ink text-paper' : 'text-ink'
                    }`}
                  >
                    <span className="font-medium">{cmd.label}</span>
                    <span className={`text-sm ${index === activeIndex ? 'text-paper/70' : 'text-muted'}`}>
                      {cmd.category}
                    </span>
                  </li>
                ))
              ) : (
                <li className="px-5 py-8 text-muted">No matches. Try a project name, or “email”.</li>
              )}
            </ul>

            <div className="px-5 py-2.5 border-t border-rule flex gap-5 text-sm text-muted">
              <span>Enter to open</span>
              <span>Arrows to move</span>
              <span>Esc to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
