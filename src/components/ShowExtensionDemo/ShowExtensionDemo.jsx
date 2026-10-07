// src/components/ShowExtensionDemo/ShowExtensionDemo.jsx  (BARU)
// Materi D: demo "File name extensions". Centang kotaknya, nama file berubah.
// Saat ekstensi disembunyikan, tugas.pdf.exe tampak seperti "tugas.pdf" (file ekstensi ganda yang menyamar).
import { useState } from 'react'
import * as Icons from '../../icons'
import { typeOf } from '../../data/fileTypes'
import { MATERI_D } from '../../data/materiDE'
import './ShowExtensionDemo.css'

// Windows hanya membuang ekstensi TERAKHIR yang dikenalnya
function displayName(name, show) {
  if (show) return name
  const info = typeOf(name)
  return info.unknown ? name : name.slice(0, name.lastIndexOf('.'))
}

export default function ShowExtensionDemo() {
  const [show, setShow] = useState(false)
  return (
    <div className="sxd">
      <ol className="sxd__steps">
        {MATERI_D.showSteps.map((s) => <li key={s}>{s}</li>)}
      </ol>

      <div className="sxd__explorer" role="group" aria-label="File Explorer tiruan">
        <div className="sxd__bar">File Explorer: View &gt; Show</div>
        <label className="sxd__check">
          <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} />
          <span>File name extensions</span>
        </label>
        <ul className="sxd__list">
          {MATERI_D.showFiles.map((f) => {
            const info = typeOf(f)
            const Icon = Icons[info.icon]
            const danger = f.endsWith('.exe') && f.split('.').length > 2
            return (
              <li key={f} className={`sxd__row ${show && danger ? 'is-danger' : ''}`}>
                <Icon size={32} />
                <span className="sxd__name">{displayName(f, show)}</span>
                <span className="sxd__kind">{info.kind}</span>
              </li>
            )
          })}
        </ul>
        <p className={`sxd__msg ${show ? 'is-on' : ''}`} role="status">
          {show ? 'Terlihat jelas: file terakhir ternyata berekstensi .exe, jadi itu program, bukan dokumen PDF.' : 'Ekstensi tersembunyi: perhatikan kolom jenis di kanan. Apa bedanya dengan namanya?'}
        </p>
      </div>

      <p className="sxd__tip">{MATERI_D.showTip}</p>
    </div>
  )
}
