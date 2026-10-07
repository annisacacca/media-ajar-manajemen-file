// src/hooks/useFullscreen.js
// Tombol layar penuh memakai Fullscreen API bawaan browser (bukan library).
import { useCallback, useEffect, useState } from 'react'

export default function useFullscreen() {
  const [isFull, setIsFull] = useState(() => Boolean(document.fullscreenElement))
  // Beberapa browser (misalnya Safari di iPhone) tidak mendukung layar penuh
  const supported = Boolean(document.documentElement.requestFullscreen)

  // Browser memberi tahu kita saat layar penuh berubah (termasuk saat menekan Esc)
  useEffect(() => {
    const onChange = () => setIsFull(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggle = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.()
    } else {
      document.documentElement.requestFullscreen?.().catch(() => {})
    }
  }, [])

  return { isFull, supported, toggle }
}
