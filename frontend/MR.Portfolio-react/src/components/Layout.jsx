import { useState, useEffect, useCallback } from 'react'
import Sidebar from './Sidebar'

function Layout({ children }) {
  const [activeSection, setActiveSection] = useState('home')

  const sectionIds = ['home', 'about', 'skills', 'projects', 'resume', 'contact']

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      let currentSection = 'home'
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.offsetTop <= scrollPosition) {
          currentSection = sectionIds[i]
        }
      }
      setActiveSection(currentSection)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="layout-wrapper">
      <Sidebar activeSection={activeSection} onNavigate={scrollToSection} />
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout
