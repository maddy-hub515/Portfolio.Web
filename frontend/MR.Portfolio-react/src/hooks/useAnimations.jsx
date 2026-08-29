import { useState, useEffect, useRef, useCallback } from 'react'

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(query.matches)

    const handler = (e) => setPrefersReducedMotion(e.matches)
    query.addEventListener('change', handler)
    return () => query.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}

export function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setIsInView(true)
          setHasTriggered(true)
          if (options.triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!options.triggerOnce) {
          setIsInView(entry.isIntersecting)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [hasTriggered, options.threshold, options.rootMargin, options.triggerOnce])

  return [ref, isInView]
}

export function useCountUp(end, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!startCounting || hasRun.current) return
    hasRun.current = true

    let startTime = null
    const numericEnd = parseFloat(end)

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuart(progress)

      setCount(Math.floor(easedProgress * numericEnd))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(numericEnd)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, startCounting])

  return count
}

export function RevealSection({ children, className = '', stagger = false }) {
  const prefersReducedMotion = useReducedMotion()
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true })

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={ref}
      className={`${stagger ? 'reveal-stagger' : 'reveal'} ${isInView ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
