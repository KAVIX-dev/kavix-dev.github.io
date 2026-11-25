import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpLeft, Send, X } from 'lucide-react'
import { profile } from '../data/portfolio'

export default function ProjectModal({ project, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const closeProject = () => {
    setSelectedImage(null)
    onClose()
  }
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (selectedImage) setSelectedImage(null)
        else onClose()
      }
    }
    if (project) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKey)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [project, onClose, selectedImage])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={closeProject}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02040a]/85 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] w-full max-w-[740px] flex-col overflow-hidden rounded-[26px] border border-[#00c3ff]/30 bg-[#080d18] shadow-[0_32px_90px_-15px_rgba(0,0,0,0.9)]"
          >
            {/* Inner scrollable area without ugly native scrollbar */}
            <div className="no-scrollbar overflow-y-auto p-6 sm:p-7">
              {/* Header */}
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-1 text-xs font-semibold text-[#00c3ff]">
                    {project.category}{project.year && ` • ${project.year}`}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-50 sm:text-2xl">
                    {project.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={closeProject}
                  className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition-colors hover:border-[#f6c453] hover:text-[#f6c453]"
                  aria-label="بستن"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="mb-4 text-[14px] leading-7 text-slate-300">{project.summary}</p>
              <div className="mb-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <h4 className="mb-2 text-sm font-bold text-[#f6c453]">نقش در پروژه</h4>
                <p className="text-sm leading-7 text-slate-300">{project.role}</p>
              </div>
              <div className="mb-5">
                <h4 className="mb-3 text-sm font-bold text-slate-100">امکانات پروژه</h4>
                <ul className="grid grid-cols-1 gap-2 text-sm leading-6 text-slate-300 sm:grid-cols-2">
                  {project.features.map((feature) => <li key={feature}>• {feature}</li>)}
                </ul>
              </div>
              {project.note && <p className="mb-4 text-xs leading-6 text-slate-400">{project.note}</p>}
              <h4 className="mb-3 text-sm font-bold text-slate-100">تصاویر پروژه</h4>
              <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.gallery.map((image) => (
                  <figure key={image.src} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => setSelectedImage(image)}
                      aria-label={`نمایش تمام‌صفحه ${image.label}`}
                      className="block h-[220px] w-full cursor-zoom-in overflow-hidden rounded-xl border border-white/[0.08] bg-[#050811] focus-visible:outline-2 focus-visible:outline-[#00c3ff]"
                    >
                      <img src={image.src} alt={`${project.title} — ${image.label}`} loading="lazy" className="block h-full w-full object-cover object-top" />
                    </button>
                    <figcaption className="mt-2 text-xs text-slate-400">{image.label} <span className="text-slate-500">(برای نمایش بزرگ‌تر کلیک کنید)</span></figcaption>
                  </figure>
                ))}
              </div>

              {/* Tech Tags */}
              <div className="mb-5 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    dir="ltr"
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-l from-[#00c3ff] via-[#1c7dff] to-[#0044ff] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_24px_-6px_rgba(0,195,255,0.45)] transition-all hover:shadow-[0_12px_30px_-4px_rgba(0,195,255,0.65)]"
                  >
                    <span>مشاهده وب‌سایت زنده</span>
                    <ArrowUpLeft className="h-4 w-4" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={closeProject}
                    className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/[0.08]"
                  >
                    بستن پیش‌نمایش
                  </button>
                )}

                <a
                  href={`${profile.telegramUrl}?text=${encodeURIComponent(
                    `سلام حمیدرضا، درباره پروژه‌ای شبیه به «${project.title}» می‌خواستم مشورت بگیرم.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#f6c453]/40 bg-[#f6c453]/12 px-6 py-3 text-sm font-bold text-[#f6c453] transition-all hover:bg-[#f6c453] hover:text-[#03050a]"
                >
                  <span>پروژه مشابه می‌خواهم</span>
                  <Send className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
          {selectedImage && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`نمایش تصویر ${selectedImage.label}`}
              onClick={(e) => e.stopPropagation()}
              className="fixed inset-0 z-[110] flex flex-col bg-[#02040a]/98"
            >
              <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
                <span className="text-sm text-slate-200">{selectedImage.label} — {project.title}</span>
                <button type="button" onClick={() => setSelectedImage(null)} aria-label="بستن تصویر" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white hover:bg-white/10">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-auto p-3 sm:p-6">
                <img src={selectedImage.src} alt={`${project.title} — ${selectedImage.label}`} className="mx-auto block h-auto w-full max-w-[1200px]" />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}