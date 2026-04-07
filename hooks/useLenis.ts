'use client'
import { useEffect } from 'react'

export function useLenis() {
  useEffect(() => {
    // Lenis is disabled for this scroll-jacked experience.
    // The scroll engine takes full control of wheel/touch events.
    // Overflow hidden on body prevents native scroll.
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])
}
