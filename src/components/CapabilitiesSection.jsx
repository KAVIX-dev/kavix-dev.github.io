import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { capabilities } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1]

export default function CapabilitiesSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="capabilities" className="relative z-10 py-16 sm:py-24">
      <div className="mx-auto max-w-[1120px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease }}
          className="mb-9 grid grid-cols-1 items-start gap-4 sm:mb-14 lg:grid-cols-[170px_1fr]"
        >
          <div className="flex items-center gap-2.5 pt-2.5 text-xs tracking-wider text-slate-400">
            <span className="h-px w-5 bg-[#00c3ff]" />
            <span>۰۲ — توانمندی‌ها</span>
          </div>

          <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-slate-50 sm:text-4xl">
            خدمات و{' '}
            <span className="font-light text-slate-400">توانمندی‌ها</span>
          </h2>
        </motion.div>

        {/* Studio Hairline Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.1, ease }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-[170px_1fr]"
        >
          <div className="hidden pt-5 text-2xl text-[#f6c453] lg:block" aria-hidden="true">
            ✳
          </div>

          <div className="glass-panel rounded-[26px] px-5 sm:px-8">
            {capabilities.map((cap, idx) => {
              const isOpen = openIndex === idx
              return (
                <div key={cap.title} className="border-b border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="group flex w-full cursor-pointer items-center justify-between gap-4 py-6 pr-1 text-right transition-colors"
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        dir="ltr"
                        className={`text-xs font-semibold tracking-wider transition-colors ${
                          isOpen ? 'text-[#f6c453]' : 'text-slate-500 group-hover:text-[#00c3ff]'
                        }`}
                      >
                        {cap.num}
                      </span>
                      <span
                        className={`text-base font-bold transition-colors duration-200 sm:text-xl ${
                          isOpen ? 'text-white' : 'text-slate-200 group-hover:text-[#00c3ff]'
                        }`}
                      >
                        {cap.title}
                      </span>
                    </div>

                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen ? 'text-[#f6c453]' : 'text-slate-400 group-hover:text-white'
                      }`}
                    >
                      <Plus className="h-5 w-5" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.36, ease }}
                        className="overflow-hidden"
                      >
                        <div className="pr-8 pb-7 sm:pr-9">
                          <p className="max-w-[700px] text-[14.5px] leading-8 text-slate-300">
                            {cap.description}
                          </p>

                          {cap.tags?.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {cap.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-slate-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
