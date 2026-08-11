import { useState, useEffect, useRef, useCallback } from 'react'
import Sidebar from './Sidebar'

function Layout({ children }) {
  const [activeSection, setActiveSection] = useState('home')
  const scrollRef = useRef(null)
  const isScrolling = useRef(false)
  const lastSectionIndex = useRef(0)

  const sectionIds = ['home', 'about', 'resume', 'projects', 'contact']

  const scrollToSection = useCallback((sectionId) => {
    const container = scrollRef.current
    if (!container) return
    const element = container.querySelector(`#${sectionId}`)
    if (element) {
      isScrolling.current = true
      container.scrollTo({ top: element.offsetTop, behavior: 'smooth' })
      setActiveSection(sectionId)
      lastSectionIndex.current = sectionIds.indexOf(sectionId)
      setTimeout(() => { isScrolling.current = false }, 1200)
    }
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleWheel = (e) => {
      if (isScrolling.current) {
        e.preventDefault()
        return
      }

      const direction = e.deltaY > 0 ? 1 : -1
      const currentSectionEl = container.querySelector(`#${sectionIds[lastSectionIndex.current]}`)

      if (currentSectionEl) {
        const sectionScrollTop = currentSectionEl.scrollTop
        const sectionScrollHeight = currentSectionEl.scrollHeight
        const sectionClientHeight = currentSectionEl.clientHeight
        const atSectionBottom = sectionScrollTop + sectionClientHeight >= sectionScrollHeight - 5
        const atSectionTop = sectionScrollTop <= 5

        if (direction > 0 && !atSectionBottom) return
        if (direction < 0 && !atSectionTop) return
      }

      e.preventDefault()

      const nextIndex = Math.max(0, Math.min(sectionIds.length - 1, lastSectionIndex.current + direction))

      if (nextIndex !== lastSectionIndex.current) {
        isScrolling.current = true
        lastSectionIndex.current = nextIndex
        const targetEl = container.querySelector(`#${sectionIds[nextIndex]}`)
        if (targetEl) {
          container.scrollTo({ top: targetEl.offsetTop, behavior: 'smooth' })
        }
        setActiveSection(sectionIds[nextIndex])
        setTimeout(() => { isScrolling.current = false }, 1200)
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const viewportHeight = container.clientHeight

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = container.querySelector(`#${sectionIds[i]}`)
        if (el && el.offsetTop <= scrollTop + viewportHeight * 0.4) {
          setActiveSection(sectionIds[i])
          lastSectionIndex.current = i
          break
        }
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className="d-flex">
        <Sidebar activeSection={activeSection} onNavigate={scrollToSection} />
        <div className="flex-grow-1 main-content scroll-container" ref={scrollRef}>
          <main role="main" className="m-0 p-0">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

export default Layout
