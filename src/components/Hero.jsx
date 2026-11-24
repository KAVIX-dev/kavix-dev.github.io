import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, Send } from 'lucide-react'
import { profile, heroMetrics } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  const cardRef = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [13, -13]), {
    stiffness: 180,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-13, 13]), {
    stiffness: 180,
    damping: 20,
  })

  const handleCardMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rawX.set(x)
    rawY.set(y)
  }

  const handleCardLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <header className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-32 pb-24">
      {/* Luminous horizon arc at bottom (Sample #6) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[350px] left-1/2 z-[1] h-[470px] w-[1450px] -translate-x-1/2 rounded-[50%] border-t border-[#00c3ff]/35 shadow-[0_-24px_90px_rgba(0,195,255,0.16)]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0,195,255,0.20), rgba(0,68,255,0.06) 46%, transparent 72%)',
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1120px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-12">
        {/* Right Editorial Column (RTL start) */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            className="mb-6 inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide text-slate-300"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#f6c453] shadow-[0_0_12px_#f6c453]" />
            <span>
              {profile.owner} • استودیو طراحی و توسعه وب {profile.brand}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="mb-6 text-4xl leading-[1.28] font-black tracking-tight text-slate-50 sm:text-5xl lg:text-[3.65rem]"
          >
            طراحی تجربه‌های وب
            <br />
            <span className="font-light text-slate-300">که دقیقاً </span>
            <span className="text-kavix-blue-gradient">بی‌نقص و روان</span>
            <br />
            عمل می‌کنند.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="mb-9 max-w-[540px] text-[15px] leading-8 text-slate-400 sm:text-base"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24, ease }}
            className="mb-12 flex flex-wrap items-center gap-3.5"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-7 py-3.5 text-sm font-bold text-[#03050a] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-8px_rgba(248,250,252,0.35)]"
            >
              <span>مشاهده نمونه‌کارها</span>
              <ArrowDown className="h-4 w-4" />
            </a>

            <a
              href={profile.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00c3ff]/50 hover:bg-[#00c3ff]/10"
            >
              <span>گفتگو در تلگرام</span>
              <Send className="h-3.5 w-3.5" />
            </a>
          </motion.div>

          {/* Clean editorial metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.36 }}
            className="flex flex-wrap gap-x-10 gap-y-5 border-t border-white/[0.08] pt-6"
          >
            {heroMetrics.map((m) => (
              <div key={m.label}>
                <div className="text-2xl font-extrabold tracking-tight text-slate-50">
                  {m.value}
                  <span className="text-kavix-gold-gradient mr-0.5">{m.suffix}</span>
                </div>
                <div className="mt-1 text-xs text-slate-400">{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Left 3D Interactive KAVIX Emblem Stage (Sample #1 inspired) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.95, delay: 0.2, ease }}
          className="flex items-center justify-center lg:col-span-5"
          style={{ perspective: 1000 }}
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleCardMove}
            onMouseLeave={handleCardLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="group relative flex h-[350px] w-[300px] flex-col items-center justify-center rounded-[30px] border border-white/[0.09] bg-gradient-to-b from-[#0d1322]/85 to-[#050914]/95 p-7 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.85),0_0_85px_-24px_rgba(0,195,255,0.28)] transition-colors duration-300 hover:border-[#00c3ff]/35 sm:w-[325px]"
          >
            {/* Subtle engineering blueprint dashed frame */}
            <div className="pointer-events-none absolute inset-4 rounded-[22px] border border-dashed border-white/[0.08]" />
            {/* Soft warm-gold & cyan dual backlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-14 h-40 w-40 rounded-full opacity-35 blur-3xl transition-opacity duration-500 group-hover:opacity-55"
              style={{
                background:
                  'radial-gradient(circle, rgba(0,195,255,0.55), rgba(246,196,83,0.35) 65%, transparent)',
              }}
            />

            <img
              src="/logo.svg"
              alt="لوگوی KAVIX"
              style={{ transform: 'translateZ(42px)' }}
              className="relative z-10 h-44 w-44 object-contain drop-shadow-[0_18px_32px_rgba(0,0,0,0.65)] transition-transform duration-500 group-hover:scale-[1.04]"
            />

            <div
              style={{ transform: 'translateZ(24px)' }}
              className="relative z-10 mt-5 text-center"
            >
              <div className="text-sm font-bold text-slate-100">
                طراحی می‌کنم. پیاده می‌کنم.
              </div>
              <div
                dir="ltr"
                className="mt-1 text-[11px] font-medium tracking-[0.2em] text-slate-400"
              >
                KAVI<span className="text-[#f6c453]">X</span> // WEB STUDIO
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}
