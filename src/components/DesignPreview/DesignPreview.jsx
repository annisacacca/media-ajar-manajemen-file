// src/components/DesignPreview/DesignPreview.jsx
// Halaman SEMENTARA untuk mengecek design system di Tahap 1.
// Akan dihapus/digantikan di Tahap 2.
import { useState } from 'react'
import Dika from '../Dika/Dika'
import { EXPRESSIONS } from '../../data/dikaPixels'
import RetroWindow from '../RetroWindow/RetroWindow'
import * as Icons from '../../icons'
import './DesignPreview.css'

const SWATCHES = [
  ['Biru layar', '--blue', '#2F5DFF'],
  ['Kuning', '--yellow', '#FFD43B'],
  ['Merah', '--red', '#E8412F'],
  ['Hijau', '--green', '#3BB273'],
  ['Krem', '--cream', '#FFF6E0'],
  ['Hitam kebiruan', '--ink', '#14213D'],
]

// Semua komponen ikon (nama -> komponen), selain Star/Arrow/Lock yang punya prop khusus
const ICON_LIST = Object.entries(Icons)

export default function DesignPreview({ onBack }) {
  const [expr, setExpr] = useState('senang')

  return (
    <main className="stage preview">
      <header className="preview__head">
        <h1>Cek Desain: Tahap 1</h1>
        <button type="button" className="btn btn--paper" onClick={onBack}>
          Ulangi loading
        </button>
      </header>

      <div className="preview__grid">
        <RetroWindow title="Dika.exe" tone="blue" icon={<Icons.ComputerIcon size={28} />} className="preview__dika">
          <div className="preview__stage">
            <Dika expression={expr} size={230} />
          </div>
          <div className="preview__chips" role="group" aria-label="Pilih ekspresi Dika">
            {EXPRESSIONS.map((e) => (
              <button key={e} type="button" className="btn btn--paper chip" aria-pressed={expr === e} onClick={() => setExpr(e)}>
                {e}
              </button>
            ))}
          </div>
        </RetroWindow>

        <RetroWindow title="Palet.png" tone="yellow" icon={<Icons.ImageIcon size={28} />}>
          <ul className="swatches">
            {SWATCHES.map(([name, v, hex]) => (
              <li key={v}>
                <span className="swatch" style={{ background: `var(${v})` }} />
                <span><strong>{name}</strong><br /><code>{hex}</code></span>
              </li>
            ))}
          </ul>
        </RetroWindow>

        <RetroWindow title="Ikon.zip" tone="green" icon={<Icons.ArchiveIcon size={28} />}>
          <ul className="icons">
            {ICON_LIST.map(([name, Icon]) => (
              <li key={name}>
                <Icon size={48} />
                <span>{name.replace('Icon', '')}</span>
              </li>
            ))}
            {/* Varian dengan prop */}
            <li><Icons.StarIcon lit={false} size={48} /><span>Star (off)</span></li>
            <li><Icons.LockIcon open size={48} /><span>Lock (open)</span></li>
            <li><Icons.ArrowIcon dir="left" size={48} /><span>Arrow (left)</span></li>
          </ul>
        </RetroWindow>

        <RetroWindow title="Teks.txt" tone="red" icon={<Icons.DocumentIcon size={28} />}>
          <h2>Judul Pixelify Sans</h2>
          <p>
            Ini contoh teks isi memakai DM Sans. Di layar proyektor, ukurannya minimal 22px
            supaya terbaca dari bangku paling belakang.
          </p>
          <div className="preview__btns">
            <button type="button" className="btn">Kuning</button>
            <button type="button" className="btn btn--blue">Biru</button>
            <button type="button" className="btn btn--green">Hijau</button>
            <button type="button" className="btn btn--red">Merah</button>
          </div>
        </RetroWindow>
      </div>
    </main>
  )
}
