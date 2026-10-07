// src/components/MissionCard/MissionCard.jsx  (DIGANTI)
// Kartu satu misi: tugas, centang OTOMATIS, peringatan kesalahan umum, petunjuk, dan pertanyaan refleksi.
import { useState } from 'react'
import RetroWindow from '../RetroWindow/RetroWindow'
import StarBurst from '../StarBurst/StarBurst'
import { CheckIcon } from '../../icons'
import './MissionCard.css'

export default function MissionCard({ misi, ticks, tip, isLast, onNext }) {
  const [hint, setHint] = useState(false)
  const [answer, setAnswer] = useState(false)
  const i = misi.nomor - 1
  const ok = misi.items.map((_, j) => !!ticks[`m${i}-${j}`])
  const done = ok.every(Boolean)

  return (
    <RetroWindow title={`Misi ${misi.nomor} - ${misi.kode}.exe`} tone={done ? 'green' : misi.tone}>
      <div className="mcard">
        <h3 className="mcard__title">{misi.judul}</h3>
        <p className="mcard__task">{misi.tugas}</p>

        <ul className="mcard__checks" aria-label="Syarat misi, diperiksa otomatis">
          {misi.items.map((t, j) => (
            <li key={t} className={ok[j] ? 'is-ok' : ''}>
              <span className="mcard__box" aria-hidden="true">{ok[j] && <CheckIcon size={20} />}</span>
              <span>{t}<span className="sr-only">{ok[j] ? ' (terpenuhi)' : ' (belum)'}</span></span>
            </li>
          ))}
        </ul>

        {tip && <p className="mcard__warn" role="status"><strong>Hmm:</strong> {tip}</p>}

        <button type="button" className="btn btn--paper" aria-expanded={hint} onClick={() => setHint((v) => !v)}>
          {hint ? 'Tutup petunjuk' : 'Butuh petunjuk?'}
        </button>
        {hint && <ol className="mcard__hint">{misi.langkah.map((l) => <li key={l}>{l}</li>)}</ol>}

        {done && (
          <div className="mcard__done">
            <StarBurst />
            <p><strong>Misi {misi.nomor} berhasil!</strong></p>
            <p className="mcard__q">{misi.refleksi.tanya}</p>
            {answer
              ? <p className="mcard__a">{misi.refleksi.jawab}</p>
              : <button type="button" className="btn btn--paper" onClick={() => setAnswer(true)}>Lihat jawaban contoh</button>}
            {!isLast && <button type="button" className="btn btn--blue" onClick={onNext}>Misi berikutnya</button>}
          </div>
        )}
      </div>
    </RetroWindow>
  )
}
