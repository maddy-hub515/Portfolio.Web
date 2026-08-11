/*
  ScrollToTop.jsx - Scroll to Top on Navigation
  ===============================================
  WHY: In SPAs (Single Page Apps), when you click a link,
  the page doesn't reload like in ASP.NET. So you stay
  scrolled down. This component fixes that by scrolling
  to top whenever the URL changes.
  
  useLocation - Gets the current URL (like Request.Path in ASP.NET)
  useEffect - Runs code after render (like middleware pipeline)
*/
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()
  
  /* 
    useEffect runs after every render.
    pathname is the current URL path (e.g., "/about", "/resume")
    When pathname changes, scroll to top.
  */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname]) // Re-run when pathname changes
  
  return null // This component doesn't render anything visual
}

export default ScrollToTop
