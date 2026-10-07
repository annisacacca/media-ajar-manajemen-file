// src/components/NameChecker/NameChecker.jsx  (BARU)
// Materi D: "Bedah dan uji nama file". Ketik nama file, lalu lihat:
//   1) nama dipecah menjadi nama file + ekstensi (dipisah titik TERAKHIR)
//   2) empat aturan penamaan Windows dicek satu per satu
//   3) saran kebiasaan baik (tidak memblokir, hanya saran)
// Panah kiri/kanan tidak mengganggu karena navigasi diam saat mengetik di kolom isian.
import { useState } from 'react'
import Dika from '../Dika/Dika'
import { CheckIcon, CloseIcon } from '../../icons'
import { MATERI_D } from '../../data/materiDE'
import './NameChecker.css'

const { forbiddenChars, reserved, existingFiles } = MATERI_D

// Pecah di titik terakhir. Titik di awal atau di akhir tidak dianggap pemisah ekstensi.
function splitName(name) {
  const dot = name.lastIndexOf('.')
  if (dot > 0 && dot < name.length - 1) return { base: name.slice(0, dot), ext: name.slice(dot + 1) }
  return { base: name, ext: null }
}

// Jalankan semua aturan. Hasilnya daftar { id, label, ok, detail }
function checkRules(name) {
  const bad = [...new Set([...name].filter((c) => forbiddenChars.includes(c)))]
  const { base } = splitName(name)
  const isReserved = reserved.includes(base.trim().toUpperCase())
  const badEnd = /[ .]$/.test(name)
  const twin = existingFiles.find((f) => f.toLowerCase() === name.toLowerCase())
  return [
    { id: 'char', label: 'Tidak memuat karakter terlarang', ok: bad.length === 0, detail: bad.length ? `Ditemukan: ${bad.join('  ')}` : '' },
    { id: 'reserved', label: 'Bukan nama yang dicadangkan sistem', ok: !isReserved, detail: isReserved ? `"${base.toUpperCase()}" dicadangkan sistem` : '' },
    { id: 'end', label: 'Tidak diakhiri spasi atau titik', ok: !badEnd, detail: badEnd ? 'Nama berakhir dengan spasi atau titik' : '' },
    { id: 'twin', label: 'Tidak kembar dengan file lain di folder ini', ok: !twin, detail: twin ? `Dianggap sama dengan ${twin} (huruf besar dan kecil tidak dibedakan)` : '' },
  ]
}

// Saran kebiasaan baik (bukan aturan keras)
function habitTips(name) {
  const tips = []
  if (/ /.test(name.trim())) tips.push('Ganti spasi dengan _ atau - agar rapi dan aman untuk program.')
  if (/\b(baru|final|revisi terakhir)\b/i.test(name) && !/v\d/i.test(name)) tips.push('Hindari kata ambigu seperti "baru" atau "final" tanpa penanda versi (v1, v2).')
  if (splitName(name).ext === null && name.trim()) tips.push('Nama ini belum punya ekstensi, sehingga sistem tidak tahu aplikasi pembukanya.')
  return tips
}

export default function NameChecker() {
  const [name, setName] = useState('Tugas_Informatika.docx')
  const rules = checkRules(name)
  const allOk = rules.every((r) => r.ok)
  const empty = name.length === 0
  const { base, ext } = splitName(name)
  const tips = empty ? [] : habitTips(name)

  let face = 'mikir'
  if (!empty) face = allOk ? 'senang' : 'kaget'

  return (
    <div className="nchk">
      <div className="nchk__left">
        <label className="nchk__label" htmlFor="nchk-input">Ketik nama file:</label>
        <input
          id="nchk-input"
          className="nchk__input"
          type="text"
          value={name}
          maxLength={60}
          spellCheck={false}
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
        />

        <div className="nchk__examples" role="group" aria-label="Contoh nama untuk dicoba">
          {MATERI_D.nameExamples.map((ex) => (
            <button key={ex} type="button" className="nchk__chip" onClick={() => setName(ex)}>{ex}</button>
          ))}
        </div>

        {/* Bedah nama: tiga kotak berwarna (nama - titik - ekstensi) */}
        <div className="nchk__anatomy" aria-label="Pembagian nama file">
          <div className="nchk__part nchk__part--name">
            <span className="nchk__tag">Nama file</span>
            <span className="nchk__val">{empty ? '...' : base}</span>
          </div>
          <span className="nchk__dot" aria-hidden="true">.</span>
          <div className={`nchk__part nchk__part--ext ${ext === null ? 'is-none' : ''}`}>
            <span className="nchk__tag">Ekstensi</span>
            <span className="nchk__val">{ext === null ? '(tidak ada)' : ext}</span>
          </div>
        </div>
        <p className="nchk__hint">Pemisahnya adalah <strong>titik terakhir</strong>.</p>
      </div>

      <div className="nchk__right">
        <div className="nchk__verdict" role="status">
          <Dika expression={face} size={110} />
          <p className={`nchk__verdict-text ${empty ? '' : allOk ? 'is-ok' : 'is-bad'}`}>
            {empty ? 'Ketik sebuah nama dulu.' : allOk ? 'Nama ini boleh dipakai di Windows.' : 'Nama ini ditolak Windows.'}
          </p>
        </div>

        <ul className="nchk__rules">
          {rules.map((r) => (
            <li key={r.id} className={`nchk__rule ${empty ? '' : r.ok ? 'is-ok' : 'is-bad'}`}>
              <span className="nchk__mark" aria-hidden="true">
                {!empty && (r.ok ? <CheckIcon size={22} /> : <CloseIcon size={22} />)}
              </span>
              <span>
                {r.label}
                {!empty && !r.ok && <small className="nchk__detail">{r.detail}</small>}
              </span>
            </li>
          ))}
        </ul>

        <p className="nchk__folder">Isi folder saat ini: <strong>{existingFiles.join(', ')}</strong></p>
        <p className="nchk__folder">{MATERI_D.rulesExtra}</p>

        {tips.length > 0 && (
          <ul className="nchk__tips" aria-label="Saran">
            {tips.map((t) => <li key={t}>{t}</li>)}
          </ul>
        )}
      </div>
    </div>
  )
}
