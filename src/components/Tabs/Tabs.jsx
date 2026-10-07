// src/components/Tabs/Tabs.jsx
// "Jalur langkah": daftar langkah bernomor di sisi kiri (seperti peta level), isi di sisi kanan,
// plus tombol Sebelumnya / Lanjut di bawah. API tetap sama: tabs = [{ id, label, content }].
// Sengaja TIDAK memakai tombol panah keyboard, karena panah kiri/kanan dipakai untuk pindah bagian (navigasi guru).
import { useState } from 'react'
import './Tabs.css'

export default function Tabs({ tabs, label = 'Isi materi', initial = 0 }) {
  const [active, setActive] = useState(initial)
  const [seen, setSeen] = useState(() => new Set([initial]))
  const current = tabs[active]
  const last = tabs.length - 1

  const go = (i) => {
    setActive(i)
    setSeen((s) => new Set(s).add(i))
  }

  return (
    <div className="steps">
      <div className="steps__rail" role="tablist" aria-orientation="vertical" aria-label={label}>
        {tabs.map((t, i) => {
          const state = i === active ? 'active' : seen.has(i) ? 'done' : 'todo'
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${t.id}`}
              data-state={state}
              className="steps__item"
              onClick={() => go(i)}
            >
              <span className="steps__node" aria-hidden="true">
                {state === 'done' ? '✓' : i + 1}
              </span>
              <span className="steps__label">{t.label}</span>
            </button>
          )
        })}
      </div>

      <div className="steps__main">
        <div className="steps__meter" aria-hidden="true">
          <span className="steps__meter-fill" style={{ width: `${((active + 1) / tabs.length) * 100}%` }} />
        </div>
        {/* key = id tab: konten tampil dengan animasi setiap ganti langkah */}
        <div key={current.id} id={`panel-${current.id}`} role="tabpanel" aria-labelledby={`tab-${current.id}`} className="steps__panel">
          {current.content}
        </div>
        <div className="steps__nav">
          <button type="button" className="steps__btn" onClick={() => go(active - 1)} disabled={active === 0}>
            ← Sebelumnya
          </button>
          <span className="steps__count">{active + 1} / {tabs.length}</span>
          <button type="button" className="steps__btn steps__btn--next" onClick={() => go(active + 1)} disabled={active === last}>
            Lanjut →
          </button>
        </div>
      </div>
    </div>
  )
}
