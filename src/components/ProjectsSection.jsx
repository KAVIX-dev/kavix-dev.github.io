import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowUpLeft, Plus } from 'lucide-react'
import { projects } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1]

export default function ProjectsSection({ onSelectProject }) {
  const [viewMode, setViewMode] = useState('showcase') // 'showcase' | 'list'
  const [hoveredId, setHoveredId] = useState(projects[0]?.id ?? 1)

  const activeHoverProject =
    projects.find((p) => p.id === hoveredId) || projects[0]

  return (
    <section id="work" className="relative z-10 py-16 sm:py-24">
      <div className="mx-auto max-w-[1120px] px-6">
        {/* Editorial 2-column Section Header (Samples #2 & #4) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease }}
          className="mb-9 grid grid-cols-1 items-start gap-4 sm:mb-14 lg:grid-cols-[170px_1fr]"
        >
          <div className="flex items-center gap-2.5 pt-2.5 text-xs tracking-wider text-slate-400">
            <span className="h-px w-5 bg-[#00c3ff]" />
            <span>۰۱ — نمونه‌کارها</span>
          </div>

          <div>
            <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-slate-50 sm:text-4xl">
              گلچین پروژه‌های{' '}
              <span className="font-light text-slate-400">اجرا شده</span>
            </h2>
            <p className="mt-3.5 max-w-[540px] text-[15px] leading-8 text-slate-400">
              روی هر پروژه کلیک کنید تا جزئیات، تصاویر و در صورت دسترسی لینک نسخه زنده آن را ببینید.
            </p>

            {/* View Mode Toggle: Editorial Showcase (Sample #4) vs Interactive Hover List (Sample #1) */}
            <div className="mt-5 inline-flex gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
              <button
                type="button"
                onClick={() => setViewMode('showcase')}
                className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  viewMode === 'showcase'
                    ? 'bg-[#00c3ff]/20 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                نمایش استودیویی
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-[#00c3ff]/20 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                لیست تعاملی
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mode A: Alternating Full-Bleed Showcase Rows (Sample #4) */}
        <AnimatePresence mode="wait">
          {viewMode === 'showcase' ? (
            <motion.div
              key="showcase"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease }}
              className="flex flex-col gap-6 sm:gap-8 lg:gap-8"
            >
              {projects.map((project, idx) => {
                const isReversed = idx % 2 === 1
                return (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{ duration: 0.75, ease }}
                    className="glass-panel grid grid-cols-1 items-center gap-5 overflow-hidden rounded-[26px] p-3 sm:p-5 lg:grid-cols-12 lg:gap-10 lg:p-6"
                  >
                    {/* Visual Media */}
                    <div
                      onClick={() => onSelectProject(project)}
                      className={`group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#080c15] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#00c3ff]/40 hover:shadow-[0_20px_45px_-24px_rgba(0,195,255,0.16)] lg:col-span-7 ${
                        isReversed ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                      />
                      <span className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-50/95 text-[#03050a] shadow-lg transition-all duration-300 group-hover:rotate-90 group-hover:scale-105 group-hover:bg-[#f6c453]">
                        <Plus className="h-5 w-5" />
                      </span>
                    </div>

                    {/* Editorial Copy */}
                    <div
                      className={`px-2 pb-3 sm:px-3 lg:col-span-5 lg:px-0 lg:pb-0 ${
                        isReversed ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <div className="mb-3 flex items-center gap-2.5 text-xs font-semibold tracking-wide">
                        <span className="text-[#91d8e9]">{project.category}</span>
                        {project.year && (
                          <><span className="text-slate-600">•</span><span className="text-slate-400">{project.year}</span></>
                        )}
                      </div>

                      <h3 className="mb-3.5 text-2xl font-extrabold tracking-tight text-slate-50">
                        {project.title}
                      </h3>

                      <p className="mb-6 text-[14.5px] leading-8 text-slate-300">
                        {project.summary}
                      </p>

                      <div className="mb-7 flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            dir="ltr"
                            className="interactive-tag rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="group/btn inline-flex cursor-pointer items-center gap-2 border-b border-white/25 pb-1 text-sm font-bold text-slate-100 transition-all duration-200 hover:gap-3.5 hover:border-[#f6c453] hover:text-[#f6c453]"
                      >
                        <span>مشاهده جزئیات پروژه</span>
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover/btn:-translate-x-1" />
                      </button>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          ) : (
            /* Mode B: Interactive Hover-List + Live Preview (Sample #1) */
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease }}
              className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12"
            >
              <div className="group/list border-t border-white/[0.08] lg:col-span-7">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onMouseEnter={() => setHoveredId(project.id)}
                    onClick={() => onSelectProject(project)}
                    className="flex cursor-pointer items-center justify-between gap-4 border-b border-white/[0.08] py-7 pr-2 transition-all duration-300 hover:pr-5 group-hover/list:opacity-35 hover:!opacity-100"
                  >
                    <div className="flex items-baseline gap-4">
                      <span dir="ltr" className="text-xs font-medium text-slate-500">
                        {project.num}
                      </span>
                      <span className="text-xl font-bold text-slate-100 sm:text-2xl">
                        {project.title}
                      </span>
                    </div>
                    <span className="flex shrink-0 items-center gap-1.5 text-xs text-slate-400">
                      <span>{project.category}</span>
                      <ArrowUpLeft className="h-3.5 w-3.5 text-[#f6c453]" />
                    </span>
                  </div>
                ))}
              </div>

              {/* Smooth cross-fading preview window */}
              <div className="lg:col-span-5">
                <div
                  onClick={() => onSelectProject(activeHoverProject)}
                  className="relative aspect-[16/11] cursor-pointer overflow-hidden rounded-[22px] border border-[#00c3ff]/30 bg-[#080c15] shadow-[0_28px_65px_-20px_rgba(0,195,255,0.28)]"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeHoverProject.id}
                      src={activeHoverProject.image}
                      alt={activeHoverProject.title}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease }}
                      className="h-full w-full object-cover"
                    />
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
