// src/components/Shell/Shell.jsx
// Kerangka pelajaran: bilah atas (mode guru), daftar bagian di samping, dan area isi.
import { useCallback, useEffect, useRef, useState } from 'react'
import useLesson from '../../hooks/useLesson'
import useFullscreen from '../../hooks/useFullscreen'
import useKeyboardNav from '../../hooks/useKeyboardNav'
import { SECTIONS, indexOfSection } from '../../data/sections'
import Sidebar from '../Sidebar/Sidebar'
import SectionView from '../sections/SectionView/SectionView'
import * as Icons from '../../icons'
const { ArrowIcon, FolderIcon, FullscreenIcon, LockIcon } = Icons
import './Shell.css'


export default function Shell() {
  const lesson = useLesson()
  const { state, section, total, go, next, prev, unlockMission } = lesson
  const fullscreen = useFullscreen()
  const [menuOpen, setMenuOpen] = useState(false)
  const mainRef = useRef(null)

  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), [])
  useKeyboardNav({ onNext: next, onPrev: prev, onFullscreen: fullscreen.toggle, onMenu: toggleMenu })

  // Setiap pindah bagian, gulir isi kembali ke atas
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0)
  }, [state.index])

  const selectSection = (i) => {
    go(i)
    setMenuOpen(false)
  }

  // Tombol guru: buka kunci misi lalu langsung loncat ke halaman misi
  const openMission = () => {
    unlockMission()
    go(indexOfSection('misi'))
  }

  return (
    <div className="stage shell">
      <header className="shell__bar">
        <div className="shell__chip shell__chip--title">
          <FolderIcon size={26} />
          <p className="shell__title">Misi Tugas Dika</p>
          <span className="shell__count" role="status">{state.index + 1}/{total}</span>
        </div>

        <div className="shell__chip shell__chip--ctrl">
          <button type="button" className="btn btn--paper shell__btn" aria-expanded={menuOpen} aria-controls="daftar-bagian" onClick={toggleMenu} title="Daftar bagian (M)">
            <FolderIcon size={24} />
            <span className="shell__label">Daftar</span>
          </button>
          <button type="button" className="btn btn--paper shell__btn" onClick={prev} disabled={state.index === 0} aria-label="Bagian sebelumnya" title="Sebelumnya (panah kiri)">
            <ArrowIcon dir="left" size={24} />
          </button>
          <button type="button" className="btn btn--blue shell__btn" onClick={next} disabled={state.index === total - 1} aria-label="Bagian berikutnya" title="Berikutnya (panah kanan)">
            <ArrowIcon dir="right" size={24} style={{ filter: 'brightness(0) invert(1)' }} />
          </button>
          <button type="button" className={`btn shell__btn ${state.missionUnlocked ? 'btn--green' : 'btn--red'}`} onClick={openMission} title="Mode guru: buka kunci misi">
            <LockIcon open={state.missionUnlocked} size={24} />
            <span className="shell__label">{state.missionUnlocked ? 'Ke Misi' : 'Mulai Misi'}</span>
          </button>
          {fullscreen.supported && (
            <button type="button" className="btn btn--paper shell__btn" onClick={fullscreen.toggle} aria-pressed={fullscreen.isFull} aria-label="Layar penuh" title="Layar penuh (F)">
              <FullscreenIcon size={24} />
            </button>
          )}
        </div>
      </header>

      <div className="shell__body">
        <Sidebar id="daftar-bagian" open={menuOpen} current={state.index} visited={state.visited} missionUnlocked={state.missionUnlocked} onSelect={selectSection} />
        {menuOpen && <button type="button" className="shell__backdrop" aria-label="Tutup daftar bagian" onClick={toggleMenu} />}

        <main className="shell__main" ref={mainRef}>
          {/* key = id bagian: setiap pindah bagian, animasi masuk diputar ulang */}
          <div key={section.id} className={`shell__page ${state.dir > 0 ? 'from-right' : 'from-left'}`}>
            <SectionView lesson={lesson} />
          </div>
          <p className="sr-only" aria-live="polite">Bagian {state.index + 1} dari {total}: {section.label}</p>
        </main>
      </div>
      <footer className="shell__dockwrap">
        <p className="shell__now">{section.label}</p>
        <nav className="shell__dock" aria-label="Pindah bagian">
          {SECTIONS.map((s, i) => {
            const Icon = Icons[s.icon] ?? FolderIcon
            const locked = s.id === 'misi' && !state.missionUnlocked
            return (
              <button
                key={s.id}
                type="button"
                className={`dock__btn ${state.visited[s.id] ? 'is-seen' : ''} ${locked ? 'is-locked' : ''}`}
                aria-current={i === state.index ? 'step' : undefined}
                aria-label={s.label}
                title={s.label}
                onClick={() => selectSection(i)}
              >
                <Icon size={28} />
              </button>
            )
          })}
        </nav>
      </footer>
    </div>
  )
}
