import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function AmbientBackground() {
  const mouseX = useMotionValue(-600)
  const mouseY = useMotionValue(-600)

  const smoothX = useSpring(mouseX, { stiffness: 110, damping: 24, mass: 0.4 })
  const smoothY = useSpring(mouseY, { stiffness: 110, damping: 24, mass: 0.4 })

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  return (
    <>
      {/* Drifting luminous aurora orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="animate-aurora-a absolute -top-44 -right-28 h-[520px] w-[680px] rounded-full opacity-20 blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, rgba(154,128,91,0.46), rgba(133,115,90,0.12) 55%, transparent 72%)',
          }}
        />
        <div
          className="animate-aurora-b absolute top-28 -left-44 h-[460px] w-[560px] rounded-full opacity-15 blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, rgba(127,120,105,0.32), rgba(107,104,97,0.12) 58%, transparent 75%)',
          }}
        />
        <div
          className="animate-aurora-a absolute -bottom-36 left-1/3 h-[380px] w-[440px] rounded-full opacity-15 blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, rgba(246,196,83,0.24), rgba(212,136,23,0.12) 48%, transparent 74%)',
          }}
        />
      </div>

      {/* Subtle film grain texture */}
      <div className="film-grain pointer-events-none fixed inset-0 z-[1] opacity-[0.025]" />

      {/* Interactive mouse spotlight */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="pointer-events-none fixed top-0 left-0 z-[1] hidden h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        aria-hidden="true"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(246,196,83,0.045), rgba(193,175,147,0.02) 42%, transparent 70%)',
          }}
        />
      </motion.div>
    </>
  )
}
