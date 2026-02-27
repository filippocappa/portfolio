'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'

const COMMANDS = [
  { id: 'home', label: 'Go to Home', action: '/', category: 'Navigation' },
  { id: 'running', label: 'The Running Club', action: '/work/running-club', category: 'Project' },
  { id: 'finance', label: 'Financial Modelling', action: '/work/financial-modelling', category: 'Project' },
  { id: 'econometrics', label: 'Econometric Analysis', action: '/work/econometric-analysis', category: 'Project' },
  { id: 'cv', label: 'Download CV (PDF)', action: '/cv-filippo-cappa.pdf', category: 'Action', download: true },
  { id: 'contact', label: 'Email Me', action: 'mailto:hello@filippocappa.com', category: 'Action' },
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
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
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
    if (cmd.download) {
      window.open(cmd.action, '_blank')
    } else if (cmd.action.startsWith('mailto:')) {
      window.location.href = cmd.action
    } else {
      router.push(cmd.action)
    }
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 md:p-12 z-[10000]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-off-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className="relative w-full max-w-2xl bg-off-black border border-white/10 rounded-xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] overflow-hidden font-inter"
          >
            <div className="px-6 py-5 border-b border-white/5">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search projects or actions..."
                className="w-full bg-transparent text-cream outline-none text-xl font-light placeholder:text-cream/20"
              />
            </div>
            
            <div className="max-h-[380px] overflow-y-auto py-3">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, index) => (
                  <div
                    key={cmd.id}
                    onClick={() => handleSelect(cmd)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`px-6 py-4 cursor-none flex items-center justify-between transition-all duration-200 ${
                      index === activeIndex ? 'bg-white/10 text-cream translate-x-1' : 'text-cream/40'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <span className="font-geist-mono text-[10px] uppercase tracking-[0.2em] opacity-40 min-w-[80px]">
                        {cmd.category}
                      </span>
                      <span className="text-base font-medium">{cmd.label}</span>
                    </div>
                    {index === activeIndex && (
                      <motion.span 
                        layoutId="enter"
                        className="text-[10px] font-geist-mono opacity-40"
                      >
                        ENTER ↵
                      </motion.span>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-6 py-12 text-center text-cream/20 text-sm font-geist-mono">
                  NO_RESULTS_FOUND
                </div>
              )}
            </div>
            
            <div className="px-6 py-3 bg-white/[0.02] flex justify-between items-center border-t border-white/5">
              <span className="text-[10px] text-cream/20 font-geist-mono uppercase tracking-widest">
                Search via Keyboard
              </span>
              <div className="flex gap-4 text-[10px] text-cream/20 font-geist-mono">
                <span>ESC to close</span>
                <span>↑↓ to navigate</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
