// src/components/sections/CeritaSection/CeritaSection.jsx
// Cerita masalah Dika, 4 babak. Guru menekan "Lanjut cerita"; Desktop Dika ikut berubah.
import { useState } from 'react'
import Dika from '../../Dika/Dika'
import RetroWindow from '../../RetroWindow/RetroWindow'
import FileTile from '../../FileTile/FileTile'
import { DocumentIcon } from '../../../icons'
import { CERITA_BEATS, DESKTOP_FILES, FRIEND_FILE } from '../../../data/cerita'
import './CeritaSection.css'

export default function CeritaSection({ lesson }) {
  const [beat, setBeat] = useState(0)
  const last = CERITA_BEATS.length - 1
  const current = CERITA_BEATS[beat]

  return (
    <RetroWindow title="Cerita_Dika.txt" tone="yellow" icon={<DocumentIcon size={28} />}>
      <div className="cerita">
        <div className="cerita__story">
          <Dika expression={current.dika} size={190} />
          <ol className="cerita__lines" aria-live="polite">
            {CERITA_BEATS.slice(0, beat + 1).map((b, i) => (
              <li key={b.text} className={i === beat ? 'is-now' : ''}>{b.text}</li>
            ))}
          </ol>
          <div className="cerita__controls">
            {beat < last ? (
              <button type="button" className="btn btn--red" autoFocus onClick={() => setBeat((n) => n + 1)}>Lanjut cerita</button>
            ) : (
              <button type="button" className="btn btn--blue" onClick={lesson.next}>Mulai belajar: bagian A</button>
            )}
          </div>
        </div>

        {/* Desktop laptop Dika: makin berantakan seiring cerita */}
        <div className="desk" role="img" aria-label="Desktop laptop Dika yang berantakan">
          <div className="desk__area">
            {beat === 0 && <p className="desk__empty">Desktop Dika</p>}
            {beat >= 1 && <p className="desk__count">&plusmn; ratusan file di Desktop</p>}
            {beat >= 1 && DESKTOP_FILES.map((f, i) => (
              <span key={f.name} className="desk__item" style={{ left: `${f.x}%`, top: `${f.y}%`, '--r': `${f.r}deg`, '--d': `${i * 80}ms` }}>
                <FileTile name={f.name} size={40} />
              </span>
            ))}
            {beat >= 2 && (
              <span className="desk__item desk__item--bad" style={{ left: `${FRIEND_FILE.x}%`, top: `${FRIEND_FILE.y}%`, '--r': `${FRIEND_FILE.r}deg`, '--d': '0ms' }}>
                <FileTile name={FRIEND_FILE.name} size={40} />
              </span>
            )}
            {beat === 2 && (
              <div className="desk__alert">
                <div className="desk__alert-bar">Tidak bisa dibuka</div>
                <p>laporan_praktikum: sistem tidak tahu aplikasi pembukanya.</p>
              </div>
            )}
          </div>
          <div className="desk__taskbar" aria-hidden="true"><span className="desk__start">Start</span></div>
        </div>
      </div>
    </RetroWindow>
  )
}
