// src/components/OsSimulator/OsSimulator.jsx
// Diagram berlapis: Pengguna -> File Explorer -> Sistem Operasi -> Penyimpanan.
// Saat sebuah aksi diklik, "perintah" turun lapis demi lapis, lalu tabel catatan OS
// dan blok penyimpanan ikut berubah. Angka ukuran hanyalah contoh simulasi.
import { useEffect, useState } from 'react'
import Dika from '../Dika/Dika'
import { ArrowIcon, ArchiveIcon, ComputerIcon, FolderIcon } from '../../icons'
import './OsSimulator.css'

const BLOCK_COUNT = 16

// Isi awal Desktop Dika. blocks = nomor blok penyimpanan yang dipakai file itu.
const INITIAL_FILES = [
  { id: 'f1', name: 'Tugas_Informatika.docx', loc: 'Desktop', size: '120 KB', type: 'Dokumen', blocks: [0, 1] },
  { id: 'f2', name: 'foto_kelas.jpg', loc: 'Desktop', size: '2 MB', type: 'Gambar', blocks: [2, 3, 4] },
  { id: 'f3', name: 'lagu.mp3', loc: 'Desktop', size: '4 MB', type: 'Audio', blocks: [5, 6, 7, 8, 9] },
]
const FOLDER = { id: 'd1', name: 'Tugas_Dika', loc: 'Desktop', size: '0 byte', type: 'Folder', blocks: [] }
const FOLDER_PATH = 'Desktop\\Tugas_Dika'

// Fungsi murni: hasil perubahan untuk tiap aksi (aman dipanggil dua kali, hasilnya sama)
function applyAction(files, action) {
  let next = files
  if (action === 'buat' && !files.some((f) => f.id === 'd1')) next = [...files, FOLDER]
  if (action === 'pindah') next = files.map((f) => (f.id === 'f1' ? { ...f, loc: FOLDER_PATH } : f))
  if (action === 'hapus') next = files.filter((f) => f.id !== 'f2')
  // Ukuran folder = total isi (folder kosong 0 byte)
  const inside = next.find((f) => f.id === 'f1')?.loc === FOLDER_PATH
  return next.map((f) => (f.id === 'd1' ? { ...f, size: inside ? '120 KB' : '0 byte' } : f))
}

const LAYERS = [
  { id: 'user', title: 'Pengguna', note: 'Kamu memberi perintah' },
  { id: 'explorer', title: 'File Explorer', note: 'Hanya antarmuka: meneruskan perintah' },
  { id: 'os', title: 'Sistem Operasi (file system)', note: 'Mencatat dan menyusun file' },
  { id: 'storage', title: 'Penyimpanan (SSD / hard disk)', note: 'Tempat data disimpan' },
]

// Teks "perintah" di tiap lapis, per aksi
const STEP_TEXT = {
  buat: ['Klik: Buat folder Tugas_Dika', 'Meneruskan perintah: buat folder', 'Menambah catatan: Tugas_Dika, tipe Folder, 0 byte', 'Folder kosong berukuran 0 byte'],
  pindah: ['Klik: pindahkan Tugas_Informatika.docx ke Tugas_Dika', 'Meneruskan perintah: pindah', 'Memperbarui lokasi pada catatan file', 'Data file tetap tersimpan'],
  hapus: ['Klik: hapus foto_kelas.jpg', 'Meneruskan perintah: hapus', 'Menghapus catatan file', 'Ruang penyimpanan dibebaskan'],
}
const FLASH_ID = { buat: 'd1', pindah: 'f1', hapus: null }

export default function OsSimulator() {
  const [files, setFiles] = useState(INITIAL_FILES)
  const [run, setRun] = useState(null) // { action, step } step 0..3 = lapis yang sedang dilewati
  const [flash, setFlash] = useState({ id: null, n: 0 })

  // Jalankan animasi: tiap lapis aktif ~0,75 detik. Perubahan catatan terjadi saat tiba di lapis OS (step 2).
  useEffect(() => {
    if (!run) return undefined
    if (run.step === 2) {
      setFiles((prev) => applyAction(prev, run.action))
      setFlash((f) => ({ id: FLASH_ID[run.action], n: f.n + 1 }))
    }
    const t = setTimeout(() => setRun((r) => (r.step >= 3 ? null : { ...r, step: r.step + 1 })), run.step === 3 ? 1100 : 750)
    return () => clearTimeout(t)
  }, [run])

  const hasFolder = files.some((f) => f.id === 'd1')
  const moved = files.find((f) => f.id === 'f1')?.loc === FOLDER_PATH
  const hasPhoto = files.some((f) => f.id === 'f2')
  const busy = run !== null

  const actions = [
    { id: 'buat', label: 'Buat folder', off: hasFolder, hint: 'Folder Tugas_Dika sudah dibuat.' },
    { id: 'pindah', label: 'Pindahkan tugas', off: !hasFolder || moved, hint: !hasFolder ? 'Buat foldernya dulu.' : 'Tugas sudah dipindah.' },
    { id: 'hapus', label: 'Hapus foto', off: !hasPhoto, hint: 'Foto sudah dihapus.' },
  ]

  // Peta nomor blok -> pemilik (untuk mewarnai kotak penyimpanan)
  const owner = {}
  files.forEach((f) => f.blocks.forEach((b) => { owner[b] = f.id }))

  const reset = () => { setRun(null); setFiles(INITIAL_FILES) }

  return (
    <div className="ossim">
      {/* ---------- Kiri: diagram berlapis ---------- */}
      <div className="ossim__stack">
        {LAYERS.map((layer, i) => {
          const active = run?.step === i
          return (
            <div key={layer.id}>
              <div className={`oslayer oslayer--${layer.id} ${active ? 'is-active' : ''}`}>
                <span className="oslayer__icon" aria-hidden="true">
                  {layer.id === 'user' && <Dika expression={active ? 'mikir' : 'senang'} size={44} idle={false} />}
                  {layer.id === 'explorer' && <FolderIcon size={40} />}
                  {layer.id === 'os' && <ComputerIcon size={40} />}
                  {layer.id === 'storage' && <ArchiveIcon size={40} />}
                </span>
                <div className="oslayer__text">
                  <strong>{layer.title}</strong>
                  <span>{layer.note}</span>
                </div>
                {active && <p key={`${run.action}-${i}`} className="oslayer__chip" role="status">{STEP_TEXT[run.action][i]}</p>}
              </div>
              {layer.id === 'storage' && (
                <div className="blocks" aria-label="Blok penyimpanan">
                  {Array.from({ length: BLOCK_COUNT }, (_, b) => {
                    const o = owner[b]
                    const freed = !o && run?.action === 'hapus' && run.step >= 3 && [2, 3, 4].includes(b)
                    return <span key={b} className={`blocks__b ${o ? `own-${o}` : 'is-free'} ${freed ? 'is-freed' : ''}`} />
                  })}
                </div>
              )}
              {i < LAYERS.length - 1 && (
                <div className={`oslink ${run?.step === i + 1 ? 'is-flow' : ''}`} aria-hidden="true">
                  <ArrowIcon dir="down" size={26} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ---------- Kanan: aksi + catatan OS ---------- */}
      <div className="ossim__side">
        <div className="ossim__actions" role="group" aria-label="Aksi simulasi">
          {actions.map((a) => (
            <button key={a.id} type="button" className="btn btn--red ossim__btn" disabled={busy || a.off} onClick={() => setRun({ action: a.id, step: 0 })}>
              {a.label}
            </button>
          ))}
          <button type="button" className="btn btn--paper ossim__btn" disabled={busy} onClick={reset}>Ulangi</button>
        </div>
        <p className="ossim__hint" aria-live="polite">
          {busy ? 'Perintah sedang turun ke bawah...' : actions.find((a) => a.off)?.hint ?? 'Coba aksi lain, lalu lihat catatannya berubah.'}
        </p>

        <h3 className="ossim__title">Catatan Sistem Operasi</h3>
        <div className="ossim__tablewrap">
          <table className="ostable">
            <thead>
              <tr><th scope="col">Nama</th><th scope="col">Lokasi</th><th scope="col">Ukuran</th><th scope="col">Tipe</th></tr>
            </thead>
            <tbody>
              {files.map((f) => (
                <tr key={`${f.id}-${flash.id === f.id ? flash.n : 0}`} className={flash.id === f.id ? 'is-changed' : ''}>
                  <th scope="row">{f.name}</th>
                  <td>{f.loc}</td>
                  <td>{f.size}</td>
                  <td>{f.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="ossim__note">Angka ukuran hanya contoh untuk simulasi.</p>
      </div>
    </div>
  )
}
