import { openTelegramInMiniApp } from '../telegram'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, CheckCircle2, Gauge, Lock, Send, Smartphone, Terminal } from 'lucide-react'
import { profile, heroMetrics } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  const cardRef = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [11, -11]), {
    stiffness: 170,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-11, 11]), {
    stiffness: 170,
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
      {/* Luminous horizon arc at bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[350px] left-1/2 z-[1] h-[470px] w-[1450px] -translate-x-1/2 rounded-[50%] border-t border-[#00c3ff]/35 shadow-[0_-24px_90px_rgba(0,195,255,0.16)]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0,195,255,0.20), rgba(0,68,255,0.06) 46%, transparent 72%)',
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1140px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-12">
        {/* Right Editorial Column (RTL start) */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            className="mb-6 inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide text-slate-300"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#f6c453] shadow-[0_0_12px_#f6c453]" />
            <span>استودیو طراحی و توسعه وب {profile.brand}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="mb-6 text-4xl leading-[1.32] font-black tracking-tight text-slate-50 sm:text-5xl lg:text-[3.4rem]"
          >
            از ایده تا اجرا
            <br />
            <span className="text-kavix-blue-gradient">محصول وب مدرن؛</span>
            <br />
            <span className="font-light text-slate-200">خلاقانه، کارآمد و ماندگار.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="mb-9 max-w-[520px] text-[15px] leading-8 text-slate-400 sm:text-base"
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
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-l from-[#00c3ff] via-[#1c7dff] to-[#0044ff] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_32px_-8px_rgba(0,195,255,0.55),inset_0_1px_1px_rgba(255,255,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_38px_-6px_rgba(0,195,255,0.7)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">مشاهده نمونه‌کارها</span>
              <ArrowDown className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>

            <a
              href={profile.telegramUrl}
              onClick={(e) => {
                if (openTelegramInMiniApp(profile.telegramUrl)) e.preventDefault()
              }}
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
                <div
                  dir="ltr"
                  className="text-right text-2xl font-extrabold tracking-tight text-slate-50 sm:text-[1.7rem]"
                >
                  {m.value}
                  {m.suffix && (
                    <span className="text-kavix-gold-gradient ml-0.5">{m.suffix}</span>
                  )}
                </div>
                <div className="mt-1 text-xs text-slate-400">{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Left 3D Interactive Web Browser & Studio Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.2, ease }}
          className="flex items-center justify-center lg:col-span-6"
          style={{ perspective: 1100 }}
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleCardMove}
            onMouseLeave={handleCardLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="group relative w-full max-w-[490px]"
          >
            {/* Ambient dual glow behind browser */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-[36px] opacity-45 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(0,195,255,0.34), transparent 55%), radial-gradient(circle at 75% 70%, rgba(246,196,83,0.22), transparent 55%)',
              }}
            />

            {/* Main Dark Browser Window */}
            <div className="relative overflow-hidden rounded-[24px] border border-white/[0.11] bg-gradient-to-b from-[#0d1424]/95 via-[#070c18]/95 to-[#050812]/98 shadow-[0_32px_80px_-18px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition-colors duration-300 group-hover:border-[#00c3ff]/35">
              {/* Browser Top Chrome */}
              <div
                dir="ltr"
                className="flex items-center justify-between border-b border-white/[0.07] bg-[#0a1020]/90 px-4 py-3"
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15 transition-colors group-hover:bg-rose-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15 transition-colors group-hover:bg-[#f6c453]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15 transition-colors group-hover:bg-emerald-400/75" />
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-[#040710]/90 px-3.5 py-1 text-[11px] text-slate-400">
                  <Lock className="h-2.5 w-2.5 text-[#00c3ff]" />
                  <span className="tracking-wide text-slate-300">kavix-dev.github.io</span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  <span>LIVE</span>
                </div>
              </div>

              {/* Browser Canvas Body */}
              <div className="relative px-5 pt-6 pb-5">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.16]"
                  style={{
                    backgroundImage:
                      'radial-gradient(rgba(148,163,184,0.45) 1px, transparent 1px)',
                    backgroundSize: '18px 18px',
                  }}
                />

                {/* Split Showcase inside Browser: Logo Stage + Mini UI/Code Preview */}
                <div className="relative z-10 grid grid-cols-12 items-center gap-4">
                  <div
                    style={{ transform: 'translateZ(30px)' }}
                    className="col-span-5 flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-[#050914]/90 p-4 shadow-inner"
                  >
                    <img
                      src="/logo.svg"
                      alt="لوگوی KAVIX"
                      className="h-28 w-28 object-contain drop-shadow-[0_10px_24px_rgba(0,195,255,0.28)] transition-transform duration-500 group-hover:scale-105 sm:h-32 sm:w-32"
                    />
                  </div>

                  <div
                    dir="ltr"
                    className="col-span-7 flex flex-col gap-2.5 text-left font-mono text-[11px]"
                  >
                    <div className="rounded-xl border border-white/[0.07] bg-[#050914]/90 p-3 leading-5">
                      <div className="mb-1.5 flex items-center justify-between text-[10px] text-slate-500">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <Terminal className="h-3 w-3 text-[#00c3ff]" />
                          App.jsx
                        </span>
                        <span className="text-[#f6c453]">React 19</span>
                      </div>
                      <div className="text-slate-400">
                        <span className="text-[#00c3ff]">const</span>{' '}
                        <span className="text-slate-100">website</span> ={' '}
                        <span className="text-[#f6c453]">craft</span>({'{'}
                      </div>
                      <div className="pl-3 text-slate-400">
                        ui: <span className="text-emerald-400">&apos;modern&apos;</span>,
                      </div>
                      <div className="pl-3 text-slate-400">
                        speed: <span className="text-[#00c3ff]">99</span>,
                      </div>
                      <div className="text-slate-400">{'})'}</div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2">
                        <div className="h-1.5 w-8 rounded-full bg-[#00c3ff]/70" />
                        <div className="mt-1.5 h-1 w-12 rounded-full bg-white/15" />
                      </div>
                      <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2">
                        <div className="h-1.5 w-7 rounded-full bg-[#f6c453]/75" />
                        <div className="mt-1.5 h-1 w-10 rounded-full bg-white/15" />
                      </div>
                      <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2">
                        <div className="h-1.5 w-9 rounded-full bg-blue-500/70" />
                        <div className="mt-1.5 h-1 w-11 rounded-full bg-white/15" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Status / Deployment Bar */}
                <div
                  dir="ltr"
                  className="relative z-10 mt-4 flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#040710]/85 px-3.5 py-2.5 text-[11px]"
                >
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Production build ready</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span className="rounded bg-[#00c3ff]/12 px-1.5 py-0.5 text-[#00c3ff]">
                      React
                    </span>
                    <span className="rounded bg-[#f6c453]/12 px-1.5 py-0.5 text-[#f6c453]">
                      UI/UX
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating 3D Depth Pill #1 — Top Right */}
            <div
              style={{ transform: 'translateZ(48px)' }}
              className="pointer-events-none absolute -top-4 -right-3 hidden items-center gap-2 rounded-2xl border border-[#00c3ff]/30 bg-[#081022]/90 px-3.5 py-2 shadow-[0_14px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:flex"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00c3ff]/15 text-[#00c3ff]">
                <Gauge className="h-3.5 w-3.5" />
              </span>
              <div className="leading-tight">
                <div dir="ltr" className="text-right text-xs font-extrabold text-white">
                  99/100
                </div>
                <div className="text-[10px] text-slate-400">سرعت و بهینه‌سازی</div>
              </div>
            </div>

            {/* Floating 3D Depth Pill #2 — Bottom Left */}
            <div
              style={{ transform: 'translateZ(52px)' }}
              className="pointer-events-none absolute -bottom-4 -left-3 hidden items-center gap-2 rounded-2xl border border-[#f6c453]/30 bg-[#081022]/90 px-3.5 py-2 shadow-[0_14px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:flex"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f6c453]/15 text-[#f6c453]">
                <Smartphone className="h-3.5 w-3.5" />
              </span>
              <div className="leading-tight">
                <div className="text-xs font-extrabold text-white">موبایل + دسکتاپ</div>
                <div className="text-[10px] text-slate-400">طراحی کاملاً واکنش‌گرا</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}