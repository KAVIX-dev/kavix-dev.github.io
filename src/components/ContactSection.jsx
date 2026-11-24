import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpLeft, Check, Copy, Mail, Phone, Send } from 'lucide-react'
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = `سلام حمیدرضا، من ${name.trim()} هستم.\nراه ارتباطی: ${contact.trim()}\nتوضیحات پروژه:\n${message.trim()}`
    window.open(
      `${profile.telegramUrl}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    )
    onToast('پیام برای ارسال در تلگرام آماده شد')
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
              <span>۰۵ — تماس و شروع همکاری</span>
            </div>

            <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-slate-50 sm:text-4xl">
              بیایید پروژه بعدی را{' '}
              <span className="font-light text-slate-400">متفاوت بسازیم.</span>
            </h2>

            <p className="mt-4 text-[14.5px] leading-8 text-slate-400">
              کافیست در چند خط کوتاه درباره ایده یا نیاز کسب‌وکارتان بگویید تا خیلی سریع
              مشاوره و برآورد شفاف در اختیارتان بگذارم.
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
                    <div className="text-[11px] text-slate-400">ایمیل</div>
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

          {/* Minimalist Underline Form (Samples #2 & #4) */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[26px] border border-white/[0.08] bg-[#090d16]/85 p-7 shadow-2xl backdrop-blur-md sm:p-9 lg:col-span-7"
          >
            <div className="mb-6">
              <label className="mb-2 block text-xs text-slate-400">نام شما</label>
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
                درباره پروژه یا نیاز خود بنویسید
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="نوع سایت (شرکتی، فروشگاهی، لندینگ...) و هدف اصلی شما..."
                className="w-full resize-y border-b border-white/15 bg-transparent py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-[#00c3ff]"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-50 px-6 py-3.5 text-sm font-bold text-[#03050a] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-6px_rgba(248,250,252,0.35)]"
            >
              <span>ارسال سریع پیام در تلگرام</span>
              <ArrowLeft className="h-4 w-4" />
            </button>
          </form>
        </motion.div>

        {/* Giant Editorial Sign-off (Sample #4) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease }}
          className="mt-24 border-t border-white/[0.08] pt-16 text-center"
        >
          <h2 className="text-4xl leading-tight font-black tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
            بیایید <span className="text-kavix-gold-gradient font-light">چیز ماندگاری</span>{' '}
            بسازیم.
          </h2>
        </motion.div>
      </div>
    </section>
  )
}
