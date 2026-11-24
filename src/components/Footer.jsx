import { profile } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] py-8 text-xs text-slate-400">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="KAVIX" className="h-6 w-6 object-contain" />
          <span>
            <strong className="text-slate-200">{profile.brand}</strong> — طراحی و پیاده‌سازی
            توسط {profile.owner}
          </span>
        </div>

        <div dir="ltr" className="tracking-wider text-slate-500">
          {profile.domain}
        </div>
      </div>
    </footer>
  )
}
