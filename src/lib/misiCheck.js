// src/lib/misiCheck.js  (BARU)
// Pemeriksa misi otomatis. Murni (tanpa React): menerima isi file system tiruan, mengembalikan status centang.
// Pemeriksaan berdasarkan KONDISI folder (bukan urutan klik), jadi cara apa pun yang benar akan diterima.
import { ROOT_ID, extOf, isInside, pathOf } from './fsModel.js'
import { DIKA_ID, DIKA_FILES, DUPLIKAT } from '../data/misi.js'

const low = (s) => s.toLowerCase()
const live = (nodes, id) => (nodes[id] && !nodes[id].deleted ? nodes[id] : null)
const kids = (nodes, pid) => Object.values(nodes).filter((n) => n.parent === pid && !n.deleted)
const CATEGORY = { '.docx': 'Dokumen', '.xlsx': 'Dokumen', '.pptx': 'Dokumen', '.pdf': 'Dokumen', '.jpg': 'Foto', '.jpeg': 'Foto', '.png': 'Foto', '.zip': 'Arsip' }
const NEED = ['tugas', 'foto', 'dokumen', 'arsip']

// Folder induk = folder (bukan D:, bukan folder Dika) yang berisi keempat subfolder
export function findHome(nodes) {
  return Object.values(nodes).find((p) => p.type === 'folder' && !p.deleted && p.id !== ROOT_ID && p.id !== DIKA_ID && (() => {
    const names = kids(nodes, p.id).filter((k) => k.type === 'folder').map((k) => low(k.name))
    return NEED.every((n) => names.includes(n))
  })())
}
const sub = (nodes, home, name) => (home ? kids(nodes, home.id).find((k) => k.type === 'folder' && low(k.name) === name) : undefined)

// track = { trashed: [id...], restored: bool }  ->  { items: [[bool..] x5], tips: [teks x5] }
export function evaluate(nodes, track) {
  const home = findHome(nodes)
  const dok = sub(nodes, home, 'dokumen'), foto = sub(nodes, home, 'foto'), arsip = sub(nodes, home, 'arsip'), tugas = sub(nodes, home, 'tugas')
  const tips = ['', '', '', '', '']

  // Misi 1
  const m1 = [
    Object.values(nodes).some((n) => n.type === 'folder' && !n.deleted && n.id !== ROOT_ID && n.id !== DIKA_ID && !isInside(nodes, n.id, DIKA_ID)),
    !!home,
  ]

  // Misi 2: salinan (id berbeda dari f1) bernama sama ada di Tugas, dan f1 tidak ikut pindah ke sana
  const f1 = live(nodes, 'f1')
  const copy = tugas && kids(nodes, tugas.id).some((k) => k.type === 'file' && k.id !== 'f1' && low(k.name) === low(DIKA_FILES[0].name))
  const m2 = [!!(copy && f1 && f1.parent !== tugas.id), !!copy]
  if (tugas && f1 && f1.parent === tugas.id) tips[1] = 'File aslinya ikut pindah ke Tugas. Itu memindahkan, bukan menyalin. Kembalikan ke folder awal, lalu pakai Salin (Ctrl + C).'

  // Misi 3: tiap jenis file (menurut ekstensi SEKARANG) harus berada langsung di subfolder jenisnya
  const allIn = (cat, folder) => {
    const list = DIKA_FILES.map((f) => live(nodes, f.id)).filter((n) => n && CATEGORY[low(extOf(n.name))] === cat)
    return !!folder && list.length > 0 && list.every((n) => n.parent === folder.id)
  }
  const f5 = live(nodes, 'f5')
  const m3 = [allIn('Dokumen', dok), allIn('Foto', foto), allIn('Arsip', arsip), !!(f5 && dok && low(extOf(f5.name)) === '.docx' && f5.parent === dok.id)]

  // Misi 4: nama berubah pada >= 3 file asli, dan ekstensi file yang tadinya punya ekstensi tidak berubah
  const renamed = DIKA_FILES.filter((f) => nodes[f.id] && nodes[f.id].name !== f.name).length
  const extOk = DIKA_FILES.every((f) => !nodes[f.id] || !extOf(f.name) || low(extOf(nodes[f.id].name)) === low(extOf(f.name)))
  const m4 = [renamed >= 3, renamed >= 3 && extOk]
  if (!extOk) tips[3] = 'Ada file yang ekstensinya berubah. Ganti nama lagi supaya ekstensi aslinya kembali.'

  // Misi 5
  const important = DIKA_FILES.map((f) => f.id).filter((id) => !DUPLIKAT.includes(id))
  const m5 = [
    DUPLIKAT.every((id) => track.trashed.includes(id)),
    track.trashed.length > 0 && track.restored,
    track.trashed.length > 0 && important.every((id) => live(nodes, id)),
  ]
  if (track.trashed.length > 0 && !m5[2]) tips[4] = 'Ada file penting yang ada di Recycle Bin atau sudah hilang. Pulihkan lewat Recycle Bin (Restore).'

  return { items: [m1, m2, m3, m4, m5], tips }
}

// Satu baris catatan langkah (pengganti "pencatat" di LKPD) dari event mini File Explorer
export function logLine(ev, nodes) {
  const d = ev.detail || {}
  const where = d.to && nodes?.[d.to] ? ` ke ${pathOf(nodes, d.to)}` : ''
  switch (ev.type) {
    case 'create': return 'Membuat folder baru'
    case 'copy': return d.to ? `Menyalin "${d.name}"${where}` : null
    case 'move': return `Memindahkan "${d.name}"${where}`
    case 'rename': return `Mengganti nama "${d.from}" menjadi "${d.to}"`
    case 'delete': return `Menghapus ke Recycle Bin: ${d.names.join(', ')}`
    case 'restore': return `Memulihkan dari Recycle Bin: ${d.names.join(', ')}`
    case 'purge': return `Menghapus PERMANEN: ${d.names.join(', ')}`
    default: return null
  }
}
