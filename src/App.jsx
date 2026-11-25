import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AmbientBackground from './components/AmbientBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectsSection from './components/ProjectsSection'
import ProjectModal from './components/ProjectModal'
import CapabilitiesSection from './components/CapabilitiesSection'
import ProcessArcSection from './components/ProcessArcSection'
import FaqSection from './components/FaqSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [toastMsg, setToastMsg] = useState('')

  const showToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? '' : prev))
    }, 2400)
  }

  return (
    <div className="site-canvas relative min-h-screen text-slate-50">
      <AmbientBackground />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <ProjectsSection onSelectProject={setSelectedProject} />
        <CapabilitiesSection />
        <ProcessArcSection />
        <FaqSection />
        <ContactSection onToast={showToast} />
      </main>

      <Footer />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-6 left-6 z-[200] rounded-full border border-[#00c3ff]/50 bg-[#0b1222]/95 px-5 py-2.5 text-xs font-semibold text-white shadow-2xl backdrop-blur-md"
          >
            ✓ {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
