// src/components/FileOrFolderGame/FileOrFolderGame.jsx
// Game tebak singkat: nama ini FILE atau FOLDER? (petunjuknya: folder tidak punya ekstensi)
import { useState } from 'react'
import Dika from '../Dika/Dika'
import FileTile from '../FileTile/FileTile'
import './FileOrFolderGame.css'

export default function FileOrFolderGame({ items }) {
  const [i, setI] = useState(0)
  const [choice, setChoice] = useState(null) // 'file' | 'folder' | null
  const [score, setScore] = useState(0)
  const finished = i >= items.length

  const item = items[i]
  const answered = choice !== null
  const correct = answered && (choice === 'folder') === item.folder

  const pick = (c) => {
    if (answered) return
    setChoice(c)
    if ((c === 'folder') === item.folder) setScore((s) => s + 1)
  }
  const next = () => { setChoice(null); setI((n) => n + 1) }
  const restart = () => { setI(0); setChoice(null); setScore(0) }

  if (finished) {
    return (
      <div className="ffg ffg--end">
        <Dika expression={score >= items.length - 1 ? 'bangga' : 'semangat'} size={150} />
        <div>
          <h3>Selesai! Skor {score} dari {items.length}</h3>
          <p>Ingat: folder tidak punya ekstensi, file umumnya punya.</p>
          <button type="button" className="btn btn--blue" onClick={restart}>Main lagi</button>
        </div>
      </div>
    )
  }

  let face = 'mikir'
  if (answered) face = correct ? 'senang' : 'bingung'

  return (
    <div className="ffg">
      <Dika expression={face} size={150} />
      <div className="ffg__main">
        <p className="ffg__count">Soal {i + 1} dari {items.length}</p>
        <div className="ffg__item">
          {/* Di sini nama ditampilkan apa adanya; ikon sengaja netral supaya tidak jadi bocoran */}
          <span className="ffg__name">{item.name}</span>
        </div>
        <div className="ffg__choices" role="group" aria-label="Pilih jenisnya">
          <button type="button" className={`btn btn--paper ${answered && !item.folder ? 'is-right' : ''}`} disabled={answered} onClick={() => pick('file')}>File</button>
          <button type="button" className={`btn btn--paper ${answered && item.folder ? 'is-right' : ''}`} disabled={answered} onClick={() => pick('folder')}>Folder</button>
        </div>
        {answered && (
          <div className={`ffg__result ${correct ? 'is-ok' : 'is-bad'}`} role="status">
            <FileTile name={item.name} folder={item.folder} size={36} />
            <p>
              <strong>{correct ? 'Benar!' : 'Belum tepat.'}</strong> {item.why}
            </p>
            <button type="button" className="btn btn--blue" autoFocus onClick={next}>
              {i === items.length - 1 ? 'Lihat skor' : 'Berikutnya'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
