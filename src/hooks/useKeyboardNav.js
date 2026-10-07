// src/hooks/useKeyboardNav.js
// Pintasan keyboard untuk mengajar:
//   panah kanan / PageDown = bagian berikutnya   (pointer presentasi biasanya mengirim PageDown/PageUp)
//   panah kiri  / PageUp   = bagian sebelumnya
//   F = layar penuh,  M = buka/tutup daftar bagian
import { useEffect, useRef } from 'react'

export default function useKeyboardNav(handlers) {
  // Simpan handler terbaru di ref supaya listener cukup dipasang SEKALI
  const ref = useRef(handlers)
  useEffect(() => {
    ref.current = handlers
  })

  useEffect(() => {
    const onKey = (e) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return
      // Jangan mengganggu saat mengetik di kolom isian
      const t = e.target
      if (t instanceof HTMLElement && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName))) return

      const h = ref.current
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault()
          h.onNext()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          h.onPrev()
          break
        case 'f':
        case 'F':
          h.onFullscreen()
          break
        case 'm':
        case 'M':
          h.onMenu()
          break
        default:
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
