import { useEffect, useMemo, useState } from 'react'
import { motion as Motion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  aboutHighlights,
  contactLinks,
  experiences,
  navigation,
  personalInfo,
  projectFilters,
  projects,
  quickStats,
  skills,
} from './data/portfolioData'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import SkillsSection from './components/SkillsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

function App() {
  const sectionIds = useMemo(() => navigation.map((item) => item.id), [])
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [sectionIds])

  const { scrollYProgress } = useScroll()
  const progressBar = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 30,
    mass: 0.3,
  })

  const gradientY = useTransform(scrollYProgress, [0, 1], [0, 220])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-page text-slate-100">
      <Motion.div
        className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-gradient-to-r from-brand-400 via-cyan-300 to-brand-200"
        style={{ scaleX: progressBar }}
      />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <Motion.div
          className="absolute -left-52 top-24 h-96 w-96 rounded-full bg-brand-500/12 blur-3xl"
          style={{ y: gradientY }}
        />
        <Motion.div
          className="absolute right-[-7rem] top-[18rem] h-[26rem] w-[26rem] rounded-full bg-cyan-400/10 blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -180]) }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(126,231,168,0.08),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.12),_transparent_35%)]" />
        <div className="absolute inset-0 bg-grid-mask" />
      </div>

      <Navbar navigation={navigation} activeSection={activeSection} name={personalInfo.name} />

      <main>
        <HeroSection personalInfo={personalInfo} quickStats={quickStats} />
        <AboutSection highlights={aboutHighlights} />
        <ExperienceSection experiences={experiences} />
        <ProjectsSection projects={projects} filters={projectFilters} />
        <SkillsSection skills={skills} />
        <ContactSection links={contactLinks} email={personalInfo.email} />
      </main>

      <Footer />
    </div>
  )
}

export default App
