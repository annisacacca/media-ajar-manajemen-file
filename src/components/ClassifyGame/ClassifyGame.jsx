// src/components/ClassifyGame/ClassifyGame.jsx  (BARU)
// Materi E: klasifikasi file dengan HTML5 drag and drop (draggable, onDragStart, onDragOver, onDrop).
// Cadangan tanpa mouse/seret: klik sebuah file (atau Enter), lalu klik kategorinya.
// Jawaban benar -> file masuk ke kategori; salah -> kotak bergetar dan file kembali (tanpa membocorkan jawaban).
import { useState } from 'react'
import Dika from '../Dika/Dika'
import FileTile from '../FileTile/FileTile'
import StarBurst from '../StarBurst/StarBurst'
import * as Icons from '../../icons'
import { MATERI_E } from '../../data/materiDE'
import './ClassifyGame.css'

const { classify, categories } = MATERI_E

export default function ClassifyGame() {
  const [placed, setPlaced] = useState({}) // { namaFile: idKategori } untuk yang sudah benar
  const [selected, setSelected] = useState(null) // file yang dipilih lewat klik
  const [overId, setOverId] = useState(null) // kategori yang sedang disorot saat diseret
  const [wrongs, setWrongs] = useState(0)
  const [shake, setShake] = useState({ id: null, n: 0 })
  const [burst, setBurst] = useState({ id: null, n: 0 })
  const [msg, setMsg] = useState('Seret file ke kategori yang tepat.')
  const [face, setFace] = useState('mikir')

  const remaining = classify.filter((f) => !placed[f.name])
  const done = remaining.length === 0

  // Inti permainan: cek apakah file `name` cocok dengan kategori `catId`
  const place = (name, catId) => {
    const item = classify.find((f) => f.name === name)
    if (!item || placed[name]) return
    const cat = categories.find((c) => c.id === catId)
    if (item.cat === catId) {
      setPlaced((p) => ({ ...p, [name]: catId }))
      setBurst((b) => ({ id: catId, n: b.n + 1 }))
      setMsg(`Tepat! ${name} termasuk ${cat.label}.`)
      setFace(remaining.length === 1 ? 'bangga' : 'senang')
    } else {
      setWrongs((w) => w + 1)
      setShake((s) => ({ id: catId, n: s.n + 1 }))
      setMsg(`${name} bukan ${cat.label}. Lihat lagi ekstensinya, lalu coba kategori lain.`)
      setFace('bingung')
    }
    setSelected(null)
  }

  const restart = () => {
    setPlaced({}); setSelected(null); setWrongs(0); setMsg('Seret file ke kategori yang tepat.'); setFace('mikir')
  }

  return (
    <div className="clg">
      <div className="clg__top">
        <Dika expression={done ? 'bangga' : face} size={110} />
        <p className="clg__msg" role="status">{done ? `Semua file sudah tepat! Kesalahan: ${wrongs}.` : msg}</p>
        {done && <button type="button" className="btn btn--blue" onClick={restart}>Main lagi</button>}
      </div>

      {/* Tumpukan file yang belum dikelompokkan */}
      <div className="clg__pool" aria-label="File yang belum dikelompokkan">
        {remaining.map((f) => (
          <button
            key={f.name}
            type="button"
            className={`clg__chip ${selected === f.name ? 'is-selected' : ''}`}
            draggable
            aria-pressed={selected === f.name}
            onDragStart={(e) => { e.dataTransfer.setData('text/plain', f.name); e.dataTransfer.effectAllowed = 'move'; setSelected(f.name) }}
            onDragEnd={() => { setOverId(null); setSelected(null) }}
            onClick={() => setSelected((s) => (s === f.name ? null : f.name))}
          >
            <FileTile name={f.name} size={40} />
          </button>
        ))}
        {done && <p className="clg__empty">Tumpukan kosong.</p>}
      </div>

      {/* Lima kategori sebagai kotak tujuan */}
      <div className="clg__zones">
        {categories.map((c) => {
          const Icon = Icons[c.icon]
          const inside = classify.filter((f) => placed[f.name] === c.id)
          return (
            <div
              key={c.id}
              className={`clg__zone clg__zone--${c.tone} ${overId === c.id ? 'is-over' : ''} ${selected ? 'is-ready' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={`Kategori ${c.label}, berisi ${inside.length} file`}
              onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; if (overId !== c.id) setOverId(c.id) }}
              onDragLeave={() => setOverId((o) => (o === c.id ? null : o))}
              onDrop={(e) => { e.preventDefault(); setOverId(null); place(e.dataTransfer.getData('text/plain') || selected, c.id) }}
              onClick={() => selected && place(selected, c.id)}
              onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && selected) { e.preventDefault(); place(selected, c.id) } }}
            >
              <span key={shake.id === c.id ? shake.n : 0} className={`clg__zone-in ${shake.id === c.id && shake.n ? 'is-shake' : ''}`}>
                <span className="clg__zone-head"><Icon size={30} /><strong>{c.label}</strong></span>
                <span className="clg__zone-items">
                  {inside.map((f) => <FileTile key={f.name} name={f.name} size={30} className="clg__placed" />)}
                </span>
              </span>
              {burst.id === c.id && <StarBurst key={burst.n} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
