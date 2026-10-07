// src/components/sections/KuisSection/KuisSection.jsx
// Tahap 8: kuis formatif lima soal pilihan ganda. Mode belajar mandiri:
// satu soal per layar, umpan balik langsung (benar atau salah beserta alasannya), lalu ringkasan hasil.
// Jawaban disimpan di state pelajaran (lesson.state.kuis) supaya tidak hilang kalau pindah halaman.
// Pintasan: tombol A sampai D untuk memilih jawaban. (F dan M sudah dipakai navigasi, jadi dihindari.)
import { useEffect, useRef, useState } from 'react'
import Dika from '../../Dika/Dika'
import RetroWindow from '../../RetroWindow/RetroWindow'
import StarBurst from '../../StarBurst/StarBurst'
import { CheckIcon, CloseIcon, StarIcon } from '../../../icons'
import { KUIS } from '../../../data/kuis'
import './KuisSection.css'

const LETTERS = ['A', 'B', 'C', 'D']

// Pesan akhir sesuai skor
const verdict = (score, total) => {
  if (score === total) return { dika: 'senang', title: 'Sempurna!', text: 'Semua jawabanmu benar. Dika bangga padamu!' }
  if (score >= total - 1) return { dika: 'senang', title: 'Hebat!', text: 'Tinggal satu langkah lagi menuju sempurna.' }
  if (score >= Math.ceil(total / 2)) return { dika: 'mikir', title: 'Lumayan!', text: 'Coba baca lagi bagian yang masih keliru, lalu ulangi kuisnya.' }
  return { dika: 'bingung', title: 'Jangan menyerah!', text: 'Tidak apa-apa. Baca ulang materinya pelan-pelan, lalu coba lagi.' }
}

export default function KuisSection({ lesson }) {
  const { state, kuisPick, kuisReset, next } = lesson
  const picks = state.kuis
  const total = KUIS.length
  const firstOpen = KUIS.findIndex((k) => !picks[k.id])
  const [cursor, setCursor] = useState(firstOpen === -1 ? total : firstOpen) // total = layar hasil

  const score = KUIS.filter((k) => picks[k.id] === k.correct).length

  const restart = () => { kuisReset(); setCursor(0) }

  return (
    <RetroWindow title="Kuis.exe" tone="blue" icon={<CheckIcon size={28} />}>
      <div className="kuis">
        <ol className="kuis__steps" aria-label="Kemajuan kuis">
          {KUIS.map((k, i) => {
            const pick = picks[k.id]
            const st = !pick ? (i === cursor ? 'now' : 'todo') : pick === k.correct ? 'right' : 'wrong'
            return (
              <li key={k.id} className="kuis__step" data-state={st} aria-current={i === cursor ? 'step' : undefined}>
                <span className="sr-only">Soal {i + 1}: {st === 'right' ? 'benar' : st === 'wrong' ? 'salah' : i === cursor ? 'sedang dikerjakan' : 'belum dijawab'}</span>
                <span aria-hidden="true">{st === 'right' ? '✓' : st === 'wrong' ? '✗' : i + 1}</span>
              </li>
            )
          })}
        </ol>

        {cursor < total
          ? <Question key={KUIS[cursor].id} item={KUIS[cursor]} index={cursor} total={total} picked={picks[KUIS[cursor].id]} onPick={(o) => kuisPick(KUIS[cursor].id, o)} onNext={() => setCursor(cursor + 1)} />
          : <Result score={score} total={total} picks={picks} onRestart={restart} onNext={next} />}
      </div>
    </RetroWindow>
  )
}

function Question({ item, index, total, picked, onPick, onNext }) {
  const answered = Boolean(picked)
  const right = answered && picked === item.correct
  const nextRef = useRef(null)

  // Pintasan A sampai D
  useEffect(() => {
    if (answered) return undefined
    const onKey = (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return
      const i = LETTERS.indexOf(e.key.toUpperCase())
      if (i === -1 || !item.options[i]) return
      e.preventDefault()
      onPick(item.options[i].id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [answered, item, onPick])

  // Setelah menjawab, fokus pindah ke tombol Lanjut supaya cukup menekan Enter
  useEffect(() => { if (answered) nextRef.current?.focus() }, [answered])

  let bubble = 'Pikirkan baik-baik, lalu pilih satu jawaban.'
  if (answered) bubble = right ? 'Betul sekali!' : 'Belum tepat. Baca penjelasannya ya.'
  const expression = !answered ? 'mikir' : right ? 'senang' : 'bingung'

  return (
    <div className="kuis__grid">
      <aside className="kuis__dika">
        <p className="kuis__bubble" aria-live="polite">{bubble}</p>
        <div className="kuis__mascot">
          <Dika expression={expression} size={200} />
          {right && <StarBurst />}
        </div>
      </aside>

      <div className="kuis__main">
        <p className="kuis__meta">Soal {index + 1} dari {total} <span>· {item.topic}</span></p>
        <h3 className="kuis__q" id={`q-${item.id}`}>{item.q}</h3>

        <ul className="kuis__opts" aria-labelledby={`q-${item.id}`}>
          {item.options.map((o, i) => {
            const isPicked = picked === o.id
            const isRight = o.id === item.correct
            const st = !answered ? 'idle' : isRight ? 'right' : isPicked ? 'wrong' : 'dim'
            return (
              <li key={o.id}>
                <button type="button" className="kuis__opt" data-state={st} aria-disabled={answered} onClick={() => !answered && onPick(o.id)}>
                  <span className="kuis__letter" aria-hidden="true">{LETTERS[i]}</span>
                  <span className="kuis__opt-text">{o.text}</span>
                  {answered && isRight && <CheckIcon size={30} />}
                  {answered && isPicked && !isRight && <CloseIcon size={30} />}
                </button>
              </li>
            )
          })}
        </ul>

        {answered && (
          <div className={`kuis__fb ${right ? 'is-right' : 'is-wrong'}`} role="status">
            <p className="kuis__fb-title">{right ? 'Benar!' : 'Kurang tepat'}</p>
            {!right && <p>{item.wrong[picked]}</p>}
            <p>{item.why}</p>
          </div>
        )}

        <div className="kuis__actions">
          {!answered && <p className="kuis__hint">Tip: tekan tombol A sampai D di keyboard.</p>}
          {answered && (
            <button ref={nextRef} type="button" className="btn btn--blue" onClick={onNext}>
              {index + 1 === total ? 'Lihat hasil' : 'Soal berikutnya'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Result({ score, total, picks, onRestart, onNext }) {
  const v = verdict(score, total)
  return (
    <div className="kuis__grid">
      <aside className="kuis__dika">
        <p className="kuis__bubble" aria-live="polite">{v.text}</p>
        <div className="kuis__mascot">
          <Dika expression={v.dika} size={200} />
          {score === total && <StarBurst />}
        </div>
      </aside>

      <div className="kuis__main">
        <p className="kuis__meta">Hasil kuismu</p>
        <h3 className="kuis__score">{v.title}</h3>
        <p className="kuis__stars" aria-label={`Skor ${score} dari ${total}`}>
          {KUIS.map((k, i) => <StarIcon key={k.id} lit={i < score} size={44} />)}
          <span>{score} / {total}</span>
        </p>

        <ul className="kuis__review">
          {KUIS.map((k, i) => {
            const ok = picks[k.id] === k.correct
            return (
              <li key={k.id} className={ok ? 'is-right' : 'is-wrong'}>
                <span className="kuis__review-icon" aria-hidden="true">{ok ? <CheckIcon size={28} /> : <CloseIcon size={28} />}</span>
                <div>
                  <p className="kuis__review-q"><strong>{i + 1}.</strong> {k.topic}</p>
                  {!ok && <p className="kuis__review-a">Jawaban benar: {k.options.find((o) => o.id === k.correct).text}</p>}
                </div>
              </li>
            )
          })}
        </ul>

        <div className="kuis__actions">
          <button type="button" className="btn btn--paper" onClick={onRestart}>Ulangi kuis</button>
          <button type="button" className="btn btn--blue" onClick={onNext}>Lanjut ke Penutup</button>
        </div>
      </div>
    </div>
  )
}
