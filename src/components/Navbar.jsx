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
        {/* 1. Right side (RTL): Styled CTA button + mobile toggle */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0c1324]/70 text-slate-200 backdrop-blur-md md:hidden"
            aria-label="منو"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <a
            href="#contact"
            className="group relative inline-flex rounded-full bg-gradient-to-l from-[#00c3ff]/80 via-[#3b82f6]/65 to-[#f6c453]/80 p-[1px] shadow-[0_0_26px_-6px_rgba(0,195,255,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_30px_-4px_rgba(0,195,255,0.55),0_0_24px_-6px_rgba(246,196,83,0.4)]"
          >
            <span className="relative inline-flex items-center gap-2 rounded-full bg-[#070d1a]/90 px-5 py-2 text-[13px] font-bold text-slate-50 backdrop-blur-xl transition-colors duration-300 group-hover:bg-[#0a1326]/75">
              <span>شروع همکاری</span>
              <ArrowUpLeft className="h-3.5 w-3.5 text-[#00c3ff] transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#f6c453]" />
            </span>
          </a>
        </div>

        {/* 2. Center: Single sleek floating glass pill */}
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

        {/* 3. Left side (RTL): Larger borderless KAVIX logo */}
        <a href="#" className="flex items-center" aria-label="KAVIX">
          <img
            src="/logo-hor.svg"
            alt="KAVIX"
            className="h-10 w-auto object-contain drop-shadow-[0_0_16px_rgba(0,195,255,0.18)] transition-transform duration-300 hover:scale-[1.04] sm:h-12"
          />
        </a>
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