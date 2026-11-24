import { useEffect, useState } from 'react'
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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gradient-to-b from-[#03050a]/85 via-[#03050a]/45 to-transparent py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <motion.nav
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-[1160px] items-center justify-between px-6"
      >
        {/* 1. Open floating brand logo (no outer bar) */}
        <a href="#" className="flex items-center" aria-label="KAVIX">
          <img
            src="/logo-hor.svg"
            alt="KAVIX"
            className="h-8 w-auto object-contain transition-transform duration-300 hover:scale-[1.03] sm:h-9"
          />
        </a>

        {/* 2. Single sleek floating glass pill in the center (Sample #4 style) */}
        <div className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-[#0c1324]/60 px-2 py-1.5 shadow-[0_10px_32px_-12px_rgba(0,0,0,0.75)] backdrop-blur-xl md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-1.5 text-[13px] font-medium text-slate-300/90 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* 3. Crisp floating white CTA pill + mobile toggle */}
        <div className="flex items-center gap-2.5">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-5 py-2.5 text-[13px] font-bold text-[#03050a] shadow-[0_8px_24px_-8px_rgba(248,250,252,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_30px_-6px_rgba(248,250,252,0.42)]"
          >
            <span>شروع همکاری</span>
            <ArrowUpLeft className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0c1324]/70 text-slate-200 backdrop-blur-md md:hidden"
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
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mx-6 mt-3 rounded-3xl border border-white/10 bg-[#080d19]/95 p-4 shadow-2xl backdrop-blur-2xl md:hidden"
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
    </header>
  )
}
