import { useEffect, useMemo, useState } from 'react'
import { motion as Motion, useScroll, useSpring } from 'framer-motion'
import {
  aboutHighlights,
  backgroundStory,
  contactLinks,
  experiences,
  funFacts,
  lifestyleInterests,
  musicProfile,
  navigation,
  personalIdentity,
  personalInfo,
  projectFilters,
  projects,
  quickStats,
  skills,
} from './data/portfolioData'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import BeyondCodeSection from './components/BeyondCodeSection'
import TeamPulseSection from './components/TeamPulseSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import SkillsSection from './components/SkillsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import TechyBackground from './components/TechyBackground'

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

  return (
    <div className="relative min-h-screen overflow-x-hidden text-indigo-50">
      <Motion.div
        className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-gradient-to-r from-brand-700 via-brand-400 to-brand-200"
        style={{ scaleX: progressBar }}
      />

      <TechyBackground scrollYProgress={scrollYProgress} />

      <Navbar navigation={navigation} activeSection={activeSection} name={personalInfo.name} />

      <main className="relative z-10">
        <HeroSection personalInfo={personalInfo} quickStats={quickStats} />
        <AboutSection highlights={aboutHighlights} />
        <BeyondCodeSection
          identity={personalIdentity}
          lifestyle={lifestyleInterests}
          funFacts={funFacts}
          backgroundStory={backgroundStory}
        />
        <TeamPulseSection musicProfile={musicProfile} />
        <ExperienceSection experiences={experiences} />
        <ProjectsSection projects={projects} filters={projectFilters} />
        <SkillsSection skills={skills} />
        <ContactSection links={contactLinks} email={personalInfo.email} />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}

export default App
