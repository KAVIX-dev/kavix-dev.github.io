import { motion } from 'framer-motion'
import { Code2, PenTool, Rocket, Search } from 'lucide-react'
import { processSteps } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1]

const iconMap = {
  search: Search,
  pen: PenTool,
  code: Code2,
  rocket: Rocket,
}

export default function ProcessArcSection() {
  return (
    <section id="process" className="relative z-10 py-24 sm:py-28">
      <div className="mx-auto max-w-[1120px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease }}
          className="mb-16 grid grid-cols-1 items-start gap-6 lg:grid-cols-[170px_1fr]"
        >
          <div className="flex items-center gap-2.5 pt-2.5 text-xs tracking-wider text-slate-400">
            <span className="h-px w-5 bg-[#00c3ff]" />
            <span>۰۳ — روند اجرا</span>
          </div>

          <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-slate-50 sm:text-4xl">
            یک مسیر شفاف،{' '}
            <span className="font-light text-slate-400">از ایده تا انتشار.</span>
          </h2>
        </motion.div>

        {/* Curved Dotted Arc Stage (Sample #4 inspired) */}
        <div className="relative pt-4 pb-6">
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 84"
            fill="none"
            preserveAspectRatio="none"
            className="pointer-events-none absolute top-9 left-[12.5%] hidden h-16 w-[75%] lg:block"
          >
            <path
              d="M 0 12 Q 500 84 1000 12"
              stroke="rgba(0, 195, 255, 0.30)"
              strokeWidth="1.5"
              strokeDasharray="5 7"
            />
          </svg>

          <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item, idx) => {
              const Icon = iconMap[item.icon] || Search
              const isMiddle = idx === 1 || idx === 2
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease }}
                  className={`group flex flex-col items-center text-center ${
                    isMiddle ? 'lg:translate-y-6' : ''
                  }`}
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#00c3ff]/40 bg-[#070d1c] text-[#00c3ff] shadow-[0_0_32px_rgba(0,195,255,0.22)] transition-all duration-300 group-hover:scale-110 group-hover:border-[#f6c453] group-hover:text-[#f6c453] group-hover:shadow-[0_0_34px_rgba(246,196,83,0.28)]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="mb-1 text-[11px] font-medium tracking-wider text-slate-500">
                    {item.step}
                  </div>
                  <h3 className="mb-2 text-base font-bold text-slate-100">{item.title}</h3>
                  <p className="max-w-[230px] text-xs leading-7 text-slate-400">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
