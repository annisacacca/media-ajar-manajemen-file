// src/components/ExtensionLab/ExtensionLab.jsx  (BARU)
// Materi D: laboratorium ekstensi. Guru mengubah ekstensi sebuah file, lalu langsung terlihat:
//   - ikon dan aplikasi pembuka bawaan ikut berubah (karena sistem hanya membaca ekstensi),
//   - tetapi "isi sebenarnya" file TIDAK berubah, sehingga saat dibuka bisa gagal.
// Tiga kemungkinan hasil saat tombol "Buka file" ditekan: ok | gagal | tidak tahu aplikasi.
import { useState } from 'react'
import Dika from '../Dika/Dika'
import FileTile from '../FileTile/FileTile'
import { typeOf } from '../../data/fileTypes'
import { MATERI_D } from '../../data/materiDE'
import './ExtensionLab.css'

// Dua file contoh. realExt = format ASLI isi file (tidak pernah berubah).
const FILES = [
  { id: 'docx', base: 'Tugas_Informatika', realExt: 'docx', realLabel: 'Dokumen teks (Word)', presets: ['docx', 'pdf', 'jpg', 'mp3'] },
  { id: 'png', base: 'foto', realExt: 'png', realLabel: 'Gambar', presets: ['png', 'pdf', 'mp3', 'docx'] },
]

// Gambar pixel kecil sebagai "isi" file gambar
const PIC = ['bbbbbbbb', 'bbbyybbb', 'bbyyyybb', 'bbbyybbb', 'ggggggge', 'gggggggg']
const PIC_COLOR = { b: 'var(--sky)', y: 'var(--yellow)', g: 'var(--green)', e: 'var(--green-deep)' }

// Isi sebenarnya file: garis-garis teks (dokumen) atau gambar pixel
function Content({ kind }) {
  if (kind === 'png') {
    return (
      <svg className="xlab__pic" viewBox="0 0 8 6" shapeRendering="crispEdges" role="img" aria-label="Isi file: gambar">
        {PIC.flatMap((row, y) => [...row].map((c, x) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={PIC_COLOR[c]} />))}
      </svg>
    )
  }
  return (
    <div className="xlab__lines" role="img" aria-label="Isi file: teks dokumen">
      <span style={{ width: '55%' }} /><span /><span /><span style={{ width: '80%' }} /><span style={{ width: '40%' }} />
    </div>
  )
}

export default function ExtensionLab() {
  const [fileId, setFileId] = useState('docx')
  const file = FILES.find((f) => f.id === fileId)
  const [ext, setExt] = useState(file.realExt)
  const [opened, setOpened] = useState(false)
  const [flash, setFlash] = useState(0) // naik setiap ekstensi berubah -> animasi nama diputar ulang

  const fullName = ext ? `${file.base}.${ext}` : file.base
  const info = typeOf(fullName)
  // Tiga kemungkinan kondisi file
  const state = ext === '' || info.unknown ? 'noapp' : ext === file.realExt ? 'ok' : 'mismatch'

  const changeExt = (value) => {
    setExt(value.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 5)) // hanya huruf/angka, maks 5 karakter
    setOpened(false)
    setFlash((n) => n + 1)
  }
  const pickFile = (id) => {
    const f = FILES.find((x) => x.id === id)
    setFileId(id)
    setExt(f.realExt)
    setOpened(false)
    setFlash((n) => n + 1)
  }

  const face = !opened ? (state === 'ok' ? 'senang' : 'mikir') : state === 'ok' ? 'bangga' : state === 'mismatch' ? 'kaget' : 'bingung'

  return (
    <div className="xlab">
      <div className="xlab__col">
        <div className="xlab__switch" role="group" aria-label="Pilih file contoh">
          {FILES.map((f) => (
            <button key={f.id} type="button" className="btn btn--paper" aria-pressed={f.id === fileId} onClick={() => pickFile(f.id)}>
              {f.base}.{f.realExt}
            </button>
          ))}
        </div>

        <div className="xlab__stage">
          <div key={flash} className="xlab__file">
            <FileTile name={fullName} size={72} />
          </div>
          <Dika expression={face} size={120} />
        </div>

        <p className="xlab__label">Ubah ekstensinya menjadi:</p>
        <div className="xlab__presets" role="group" aria-label="Pilihan ekstensi">
          {file.presets.map((p) => (
            <button key={p} type="button" className="btn btn--paper" aria-pressed={ext === p} onClick={() => changeExt(p)}>.{p}</button>
          ))}
          <button type="button" className="btn btn--red" aria-pressed={ext === ''} onClick={() => changeExt('')}>Hapus ekstensi</button>
        </div>
        <label className="xlab__custom">
          <span>Atau ketik sendiri:</span>
          <input type="text" value={ext} onChange={(e) => changeExt(e.target.value)} placeholder="mis. xyz" spellCheck={false} autoComplete="off" />
        </label>
      </div>

      <div className="xlab__col">
        <dl className="xlab__facts">
          <div className="xlab__fact">
            <dt>Isi sebenarnya (tidak berubah)</dt>
            <dd className="xlab__real"><Content kind={file.realExt} /><span>{file.realLabel}</span></dd>
          </div>
          <div className="xlab__fact">
            <dt>Menurut sistem (dari ekstensi)</dt>
            <dd>
              {state === 'noapp'
                ? <span className="xlab__bad">{ext === '' ? 'Tidak ada ekstensi' : `.${ext} tidak dikenal`}: aplikasi pembuka tidak diketahui</span>
                : <span><strong>{info.kind}</strong>, dibuka dengan <strong>{info.app}</strong></span>}
            </dd>
          </div>
        </dl>

        <button type="button" className="btn btn--blue xlab__open" onClick={() => setOpened(true)}>Buka file</button>

        {opened && (
          <div key={`${ext}-${fileId}`} className={`xlab__win xlab__win--${state}`} role="status">
            <div className="xlab__bar">{state === 'noapp' ? 'Open with' : state === 'ok' ? info.app : `${info.app}: Error`}</div>
            <div className="xlab__body">
              {state === 'ok' && <Content kind={file.realExt} />}
              {state === 'mismatch' && (
                <p><strong>Gagal dibuka.</strong> {info.app} mengira ini file .{ext}, tetapi isinya adalah {file.realLabel.toLowerCase()}. Aplikasi gagal menafsirkan isinya.</p>
              )}
              {state === 'noapp' && (
                <p><strong>Sistem tidak tahu aplikasi pembukanya.</strong> Tanpa ekstensi yang dikenal, Windows tidak bisa memilih aplikasi yang cocok.</p>
              )}
            </div>
          </div>
        )}

        <p className="xlab__important"><strong>Penting:</strong> {MATERI_D.extension.important}</p>
      </div>
    </div>
  )
}
