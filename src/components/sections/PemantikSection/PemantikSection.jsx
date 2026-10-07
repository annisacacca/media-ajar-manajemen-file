// src/components/sections/PemantikSection/PemantikSection.jsx
// Tiga pertanyaan pemantik: guru menekan tombol untuk memunculkan satu per satu,
// siswa menjawab lisan. Setelah materi selesai (bagian G sudah dibuka), tiap kartu
// bisa dibalik untuk melihat "jawabannya".
import { useState } from 'react'
import Dika from '../../Dika/Dika'
import RetroWindow from '../../RetroWindow/RetroWindow'
import { ComputerIcon, LockIcon } from '../../../icons'
import { PEMANTIK } from '../../../data/pemantik'
import './PemantikSection.css'

export default function PemantikSection({ lesson }) {
  const { state, next, revealPemantik, resetPemantik } = lesson
  const shown = state.pemantikShown
  const total = PEMANTIK.length
  const answersReady = Boolean(state.visited.g) // materi selesai = bagian G sudah dibuka
  const [showAnswer, setShowAnswer] = useState({}) // id kartu -> true kalau sedang melihat jawaban

  // Ekspresi Dika mengikuti pertanyaan yang terakhir tampil
  const expression = shown === 0 ? 'senang' : PEMANTIK[shown - 1].dika

  let bubble = 'Siap menjawab?'
  if (shown > 0 && shown < total) bubble = 'Coba jawab dulu secara lisan ya!'
  if (shown === total) bubble = answersReady ? 'Yuk, cek jawabannya!' : 'Jawabannya kita buka di akhir materi.'

  return (
    <RetroWindow title="Pertanyaan_Pemantik.exe" tone="blue" icon={<ComputerIcon size={28} />}>
      <div className="pemantik">
        <aside className="pemantik__dika">
          <p className="pemantik__bubble" aria-live="polite">{bubble}</p>
          <Dika expression={expression} size={240} />
        </aside>

        <div className="pemantik__main">
          <ol className="pq-list">
            {PEMANTIK.map((item, i) => {
              const revealed = i < shown
              const answer = revealed && showAnswer[item.id]
              return (
                <li key={item.id} className={`pq-card ${revealed ? 'is-revealed' : 'is-hidden'} ${answer ? 'is-answer' : ''}`}>
                  <span className="pq-card__num" aria-hidden="true">{i + 1}</span>
                  {revealed ? (
                    <div key={answer ? 'a' : 'q'} className="pq-card__body">
                      <p className="pq-card__label">{answer ? `Jawaban ${i + 1}` : `Pertanyaan ${i + 1}`}</p>
                      <p className="pq-card__text">{answer ? item.a : item.q}</p>
                      {answersReady && (
                        <button type="button" className="btn btn--paper pq-card__toggle" onClick={() => setShowAnswer((s) => ({ ...s, [item.id]: !s[item.id] }))}>
                          {answer ? 'Lihat pertanyaan' : 'Lihat jawaban'}
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="pq-card__body pq-card__body--locked">
                      <LockIcon size={36} />
                      <p className="pq-card__text">Pertanyaan {i + 1} belum dibuka</p>
                    </div>
                  )}
                </li>
              )
            })}
          </ol>

          <div className="pemantik__controls">
            {shown < total ? (
              <button type="button" className="btn btn--red" autoFocus onClick={() => revealPemantik(total)}>
                Tampilkan pertanyaan {shown + 1}
              </button>
            ) : (
              <button type="button" className="btn btn--blue" onClick={next}>
                Lanjut ke Cerita Dika
              </button>
            )}
            {shown > 0 && (
              <button type="button" className="btn btn--paper" onClick={resetPemantik}>
                Sembunyikan semua
              </button>
            )}
          </div>
          {shown === total && !answersReady && (
            <p className="pemantik__note">Tombol &ldquo;Lihat jawaban&rdquo; muncul setelah materi selesai (setelah bagian G dibuka).</p>
          )}
        </div>
      </div>
    </RetroWindow>
  )
}
