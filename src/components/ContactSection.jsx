import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpLeft, Check, Copy, Mail, Phone, Send } from 'lucide-react'
import { profile } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1]

export default function ContactSection({ onToast }) {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [copiedKey, setCopiedKey] = useState('')

  const copyValue = (key, value, label) => {
    navigator.clipboard?.writeText(value).catch(() => {})
    setCopiedKey(key)
    onToast(label)
    setTimeout(() => setCopiedKey(''), 2000)
  }

  const buildBriefText = () =>
    `سلام وقت بخیر، از طریق پورتفولیو KAVIX پیام می‌دهم.\nنام: ${name.trim()}\nراه ارتباطی: ${contact.trim()}\nشرح پروژه:\n${message.trim()}`

  const handleTelegramSubmit = (e) => {
    e.preventDefault()
    window.open(
      `${profile.telegramUrl}?text=${encodeURIComponent(buildBriefText())}`,
      '_blank',
      'noopener,noreferrer'
    )
    onToast('متن پیام آماده و در تلگرام باز شد')
  }

  const handleEmailFallback = () => {
    if (!name.trim() || !message.trim()) {
      onToast('لطفاً ابتدا نام و شرح پروژه را وارد کنید')
      return
    }
    const subject = encodeURIComponent(`درخواست مشاوره پروژه وب — ${name.trim()}`)
    const body = encodeURIComponent(buildBriefText())
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="relative z-10 pt-24 pb-16 sm:pt-28">
      <div className="mx-auto max-w-[1120px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.75, ease }}
          className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12"
        >
          {/* Direct Contact Info */}
          <div className="lg:col-span-5">
            <div className="mb-3.5 flex items-center gap-2.5 text-xs tracking-wider text-slate-400">
              <span className="h-px w-5 bg-[#00c3ff]" />
              <span>۰۵ — تماس و مشاوره</span>
            </div>

            <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-slate-50 sm:text-4xl">
              پروژه بعدی خود را{' '}
              <span className="font-light text-slate-400">با اطمینان شروع کنید.</span>
            </h2>

            <p className="mt-4 text-[14.5px] leading-8 text-slate-400">
              در چند خط کوتاه نیازها و اهداف کسب‌وکار خود را با ما در میان بگذارید تا در
              کوتاه‌ترین زمان، مشاوره تخصصی و برآورد شفاف پروژه را برایتان آماده کنیم.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {/* Telegram */}
              <a
                href={profile.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 py-4 transition-all duration-300 hover:-translate-x-1 hover:border-[#00c3ff]/45 hover:bg-[#00c3ff]/[0.07]"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00c3ff]/12 text-[#00c3ff]">
                    <Send className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-[11px] text-slate-400">تلگرام (پاسخگویی سریع)</div>
                    <div dir="ltr" className="text-right text-sm font-bold text-slate-100">
                      {profile.telegramHandle}
                    </div>
                  </div>
                </div>
                <ArrowUpLeft className="h-4 w-4 text-slate-400 transition-colors group-hover:text-[#00c3ff]" />
              </a>

              {/* Phone */}
              <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 py-4 transition-all duration-300 hover:border-[#f6c453]/45">
                <a href={`tel:${profile.phone}`} className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f6c453]/12 text-[#f6c453]">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-[11px] text-slate-400">تماس مستقیم</div>
                    <div dir="ltr" className="text-right text-sm font-bold text-slate-100">
                      {profile.phoneDisplay}
                    </div>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() => copyValue('phone', profile.phone, 'شماره تماس کپی شد')}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-[#f6c453] hover:text-[#f6c453]"
                >
                  {copiedKey === 'phone' ? (
                    <Check className="h-3.5 w-3.5 text-[#f6c453]" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>کپی</span>
                </button>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 py-4 transition-all duration-300 hover:border-[#00c3ff]/45">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00c3ff]/12 text-[#00c3ff]">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-[11px] text-slate-400">ایمیل رسمی</div>
                    <div dir="ltr" className="text-right text-sm font-bold text-slate-100">
                      {profile.email}
                    </div>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() => copyValue('email', profile.email, 'ایمیل کپی شد')}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-[#00c3ff] hover:text-[#00c3ff]"
                >
                  {copiedKey === 'email' ? (
                    <Check className="h-3.5 w-3.5 text-[#00c3ff]" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>کپی</span>
                </button>
              </div>
            </div>
          </div>

          {/* Minimalist Project Brief Form (Telegram + Email fallback) */}
          <form
            onSubmit={handleTelegramSubmit}
            className="rounded-[26px] border border-white/[0.08] bg-[#090d16]/85 p-7 shadow-2xl backdrop-blur-md sm:p-9 lg:col-span-7"
          >
            <div className="mb-6">
              <label className="mb-2 block text-xs text-slate-400">نام و نام خانوادگی</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثلاً: علی محمدی"
                className="w-full border-b border-white/15 bg-transparent py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-[#00c3ff]"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-xs text-slate-400">
                شماره تماس یا آیدی تلگرام
              </label>
              <input
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="مثلاً: 0912... یا @username"
                className="w-full border-b border-white/15 bg-transparent py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-[#00c3ff]"
              />
            </div>

            <div className="mb-8">
              <label className="mb-2 block text-xs text-slate-400">
                شرح کوتاه پروژه و نیاز کسب‌وکار شما
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="نوع وب‌سایت (اختصاصی، وردپرس قالب اختصاصی، فروشگاهی، سئو...) و هدف اصلی شما..."
                className="w-full resize-y border-b border-white/15 bg-transparent py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-[#00c3ff]"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="group relative inline-flex flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-l from-[#00c3ff] via-[#1c7dff] to-[#0044ff] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_28px_-8px_rgba(0,195,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-6px_rgba(0,195,255,0.68)]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative">ارسال در تلگرام</span>
                <Send className="relative h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={handleEmailFallback}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-slate-200 transition-all duration-200 hover:border-[#f6c453]/50 hover:text-[#f6c453]"
              >
                <Mail className="h-4 w-4" />
                <span>ارسال با ایمیل</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Editorial Sign-off tied back to Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease }}
          className="mt-24 border-t border-white/[0.08] pt-16 text-center"
        >
          <p className="mb-3 text-xs font-medium tracking-[0.22em] text-slate-500 uppercase" dir="ltr">
            KAVIX WEB STUDIO
          </p>
          <h2 className="text-3xl leading-tight font-black tracking-tight text-slate-50 sm:text-5xl lg:text-[3.4rem]">
            ایده‌ی شما،{' '}
            <span className="text-kavix-gold-gradient font-light">اجرای ماندگار ما.</span>
          </h2>
        </motion.div>
      </div>
    </section>
  )
}