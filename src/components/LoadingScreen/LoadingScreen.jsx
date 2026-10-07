// src/components/LoadingScreen/LoadingScreen.jsx
// Layar pembuka: komputer jadul + progress bar pixel, lalu "klik untuk mulai".
import { useEffect, useRef, useState } from 'react'
import Dika from '../Dika/Dika'
import { FolderIcon, DocumentIcon, ImageIcon, ArchiveIcon, StarIcon } from '../../icons'
import './LoadingScreen.css'

const BLOCKS = 20 // jumlah kotak pada progress bar

function statusText(pct) {
  if (pct >= 100) return 'Siap!'
  if (pct >= 85) return 'Hampir selesai...'
  if (pct >= 55) return 'Menyiapkan misi Dika...'
  if (pct >= 25) return 'Menyusun folder...'
  return 'Membaca file...'
}

export default function LoadingScreen({ onStart }) {
  const [pct, setPct] = useState(0)
  const startRef = useRef(null)
  const ready = pct >= 100

  // Progress naik sedikit demi sedikit (pura-pura loading, ~3-4 detik)
  useEffect(() => {
    if (ready) return undefined
    const t = setTimeout(() => setPct((p) => Math.min(100, p + 1 + Math.floor(Math.random() * 4))), 90)
    return () => clearTimeout(t)
  }, [pct, ready])

  // Setelah siap: Enter / spasi juga bisa memulai, dan tombol langsung terfokus
  useEffect(() => {
    if (!ready) return undefined
    startRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onStart()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [ready, onStart])

  const filled = Math.floor((pct / 100) * BLOCKS)

  return (
    <main className={`loading stage ${ready ? 'is-ready' : ''}`} onClick={ready ? onStart : undefined}>
      {/* Stiker hiasan melayang */}
      <div className="loading__stickers" aria-hidden="true">
        <span className="sticker" style={{ '--x': '1.5%', '--y': '10%', '--r': '-8deg', '--d': '0s' }}><FolderIcon size={64} /></span>
        <span className="sticker" style={{ '--x': '84%', '--y': '12%', '--r': '7deg', '--d': '-1s' }}><DocumentIcon size={64} /></span>
        <span className="sticker" style={{ '--x': '1.5%', '--y': '58%', '--r': '6deg', '--d': '-2s' }}><ImageIcon size={64} /></span>
        <span className="sticker" style={{ '--x': '90%', '--y': '46%', '--r': '-6deg', '--d': '-3s' }}><ArchiveIcon size={64} /></span>
        <span className="sticker sticker--star" style={{ '--x': '18%', '--y': '4%', '--r': '10deg', '--d': '-1.5s' }}><StarIcon size={44} /></span>
      </div>

      <div className="loading__scene">
        {/* Konsol genggam pastel (terinspirasi desktop-rice) */}
        <div className="console">
          <div className="console__screen">
            <p className="console__kicker">Informatika &middot; Kelas X</p>
            <h1 className="console__title">
              Yuk, Belajar<br />
              <span className="console__title-big">Manajemen File!</span>
            </h1>
            <p className="console__mission">
              <span className="console__badge">Buka Misi Dika</span>
            </p>

            <div
              className="pbar"
              role="progressbar"
              aria-label="Memuat"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
            >
              {Array.from({ length: BLOCKS }, (_, i) => (
                <span key={i} className={`pbar__block ${i < filled ? 'is-on' : ''}`} />
              ))}
            </div>
            <p className="console__status" aria-live="polite">
              {statusText(pct)} <span className="console__pct">{pct}%</span>
            </p>
      <div className="console__cta">
        {/* Tombol selalu ada supaya layout tidak loncat; baru bisa diklik saat siap */}
        <button type="button" ref={startRef} className="btn btn--red loading__start" disabled={!ready}>
          {ready ? 'Klik untuk mulai' : 'Mohon tunggu...'}
        </button>
        <p className="loading__hint">{ready ? 'atau tekan Enter' : ''}</p>
      </div>
          </div>
          <div className="console__pad" aria-hidden="true">
            <span className="console__dpad"><i /><i /></span>
            <span className="console__brand">DIKA<span>OS</span></span>
            <span className="console__ab"><i>Z</i><i>A</i></span>
          </div>
        </div>

        {/* Dika dalam bingkai polaroid */}
        <figure className="polaroid">
          <div className="polaroid__top" aria-hidden="true"><span className="polaroid__dot" />@dika_misi<span className="polaroid__follow">MISI 1</span></div>
          <div className="polaroid__photo"><Dika expression={ready ? 'semangat' : 'mikir'} size={190} /></div>
          <figcaption className="polaroid__cap">Bantu Dika, yuk!</figcaption>
        </figure>
      </div>

    </main>
  )
}
