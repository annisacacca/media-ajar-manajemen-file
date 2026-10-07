// src/components/MiniExplorer/RenameField.jsx  (BARU)
// Kolom ganti nama di dalam ikon. Seperti Windows: yang terblok hanya bagian NAMA,
// sedangkan ekstensi (.docx dst.) tidak ikut terblok supaya tidak terhapus tak sengaja.
import { useEffect, useRef, useState } from 'react'
import { splitExt } from '../../lib/fsModel'

export default function RenameField({ name, error, onCommit, onCancel }) {
  const [value, setValue] = useState(name)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    el.focus()
    el.setSelectionRange(0, splitExt(name)[0].length)
    // hanya saat pertama tampil
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span className="mexp__rename">
      <input
        ref={ref}
        className={`mexp__rename-input ${error ? 'is-error' : ''}`}
        value={value}
        spellCheck={false}
        aria-label="Nama baru"
        onChange={(e) => setValue(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          e.stopPropagation()
          if (e.key === 'Enter') onCommit(value)
          if (e.key === 'Escape') onCancel()
        }}
      />
      {error && <span className="mexp__rename-error" role="alert">{error}</span>}
    </span>
  )
}
