import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpLeft, Menu, X } from 'lucide-react'

const navItems = [
  { label: 'نمونه‌کارها', href: '#work' },
  { label: 'توانمندی‌ها', href: '#capabilities' },
  { label: 'روند اجرا', href: '#process' },
  { label: 'سوالات متداول', href: '#faq' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="fixed top-4 right-0 left-0 z-50 px-4 sm:px-6">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-[1120px] items-center justify-between rounded-full border border-white/[0.08] bg-[#070a12]/75 px-3.5 py-2 shadow-[0_14px_40px_-14px_rgba(0,0,0,0.8)] backdrop-blur-xl"
      >
        {/* Horizontal KAVIX SVG logo */}
        <a href="#" className="flex items-center pr-1.5" aria-label="KAVIX">
          <img
            src="/logo-hor.svg"
            alt="KAVIX"
            className="h-9 w-auto object-contain transition-transform duration-300 hover:scale-[1.03]"
          />
        </a>

        {/* Center pill links */}
        <div className="hidden items-center gap-1 rounded-full border border-white/[0.05] bg-white/[0.03] p-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-1.5 text-[13px] font-medium text-slate-300 transition-colors duration-200 hover:bg-white/[0.07] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-4 py-2 text-[13px] font-bold text-[#03050a] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-6px_rgba(248,250,252,0.35)]"
          >
            <span>شروع همکاری</span>
            <ArrowUpLeft className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 md:hidden"
            aria-label="منو"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2.5 max-w-[1120px] rounded-3xl border border-white/10 bg-[#070b14]/95 p-4 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
