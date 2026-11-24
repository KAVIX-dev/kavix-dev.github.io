import { profile } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] py-8 text-xs text-slate-400">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-3 text-center sm:text-right">
          <img src="/logo.svg" alt="KAVIX" className="h-6 w-6 shrink-0 object-contain" />
          <span className="leading-6">
            © ۱۴۰۵ — کلیه حقوق مادی و معنوی این وب‌سایت متعلق به{' '}
            <strong className="font-semibold text-slate-200">{profile.owner}</strong>{' '}
            (استودیو {profile.brand}) می‌باشد.
          </span>
        </div>

        <div dir="ltr" className="shrink-0 tracking-wider text-slate-500">
          {profile.domain}
        </div>
      </div>
    </footer>
  )
}