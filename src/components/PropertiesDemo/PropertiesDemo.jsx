// src/components/PropertiesDemo/PropertiesDemo.jsx
// Simulasi jendela "Properties" (klik kanan -> Properties). Klik sebuah karakteristik di kiri,
// bagian yang sesuai pada jendela di kanan menyala. Bisa ganti antara File dan Folder.
// Tanggal dan ukuran hanya contoh simulasi.
import { useState } from 'react'
import FileTile from '../FileTile/FileTile'
import { MATERI_C } from '../../data/materi'
import './PropertiesDemo.css'

const VALUES = {
  file: {
    nama: 'Tugas_Informatika',
    ekstensi: '.docx (Dokumen)',
    ukuran: '120 KB',
    lokasi: 'D:\\Informatika\\Kelas_X',
    tanggal: ['Created: 5 Oktober 2026', 'Modified: 6 Oktober 2026', 'Accessed: 7 Oktober 2026'],
  },
  folder: {
    nama: 'Tugas_Dika',
    ekstensi: 'Tidak ada (folder tidak punya ekstensi)',
    ukuran: '240 KB (total ukuran seluruh isinya)',
    lokasi: 'D:\\Informatika\\Kelas_X',
    tanggal: ['Created: 5 Oktober 2026', 'Modified: 6 Oktober 2026', 'Accessed: 7 Oktober 2026'],
  },
}

export default function PropertiesDemo() {
  const [kind, setKind] = useState('file')
  const [active, setActive] = useState('nama')
  const [attrs, setAttrs] = useState({ readonly: false, hidden: false })
  const v = VALUES[kind]
  const isFolder = kind === 'folder'

  const rows = [
    { id: 'nama', label: 'Nama', value: v.nama },
    { id: 'ekstensi', label: 'Tipe', value: v.ekstensi },
    { id: 'lokasi', label: 'Lokasi', value: v.lokasi },
    { id: 'ukuran', label: 'Ukuran', value: v.ukuran },
  ]

  return (
    <div className="props">
      <div className="props__list">
        <div className="props__switch" role="group" aria-label="Pilih yang diperiksa">
          <button type="button" className="btn btn--paper" aria-pressed={!isFolder} onClick={() => setKind('file')}>File</button>
          <button type="button" className="btn btn--paper" aria-pressed={isFolder} onClick={() => setKind('folder')}>Folder</button>
        </div>
        <ul className="props__traits">
          {MATERI_C.fileTraits.map((t) => (
            <li key={t.id}>
              <button type="button" className={`props__trait ${active === t.id ? 'is-on' : ''}`} aria-pressed={active === t.id} onClick={() => setActive(t.id)}>
                <strong>{t.title}</strong>
                <span>{t.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Jendela Properties tiruan */}
      <div className="pwin" role="group" aria-label="Jendela Properties tiruan">
        <div className="pwin__bar"><span>Properties</span><span aria-hidden="true">x</span></div>
        <div className="pwin__body">
          <div className="pwin__head">
            <FileTile name={isFolder ? v.nama : 'Tugas_Informatika.docx'} folder={isFolder} size={44} />
          </div>
          {rows.map((r) => (
            <div key={r.id} className={`pwin__row ${active === r.id ? 'is-hot' : ''}`}>
              <span className="pwin__label">{r.label}:</span>
              <span>{r.value}</span>
            </div>
          ))}
          <div className={`pwin__row ${active === 'tanggal' ? 'is-hot' : ''}`}>
            <span className="pwin__label">Tanggal:</span>
            <span>{v.tanggal.map((d) => <span key={d} className="pwin__line">{d}</span>)}</span>
          </div>
          <div className={`pwin__row ${active === 'atribut' ? 'is-hot' : ''}`}>
            <span className="pwin__label">Atribut:</span>
            <span className="pwin__attrs">
              <label><input type="checkbox" checked={attrs.readonly} onChange={(e) => setAttrs((a) => ({ ...a, readonly: e.target.checked }))} /> Read-only</label>
              <label><input type="checkbox" checked={attrs.hidden} onChange={(e) => setAttrs((a) => ({ ...a, hidden: e.target.checked }))} /> Hidden</label>
            </span>
          </div>
          {(attrs.readonly || attrs.hidden) && (
            <p className="pwin__note" role="status">
              {attrs.readonly && 'Read-only: file hanya bisa dibaca. '}
              {attrs.hidden && 'Hidden: file disembunyikan dari tampilan biasa.'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
