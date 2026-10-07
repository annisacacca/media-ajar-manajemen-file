// src/lib/fsModel.js  (BARU)
// Model sistem file TIRUAN + fungsi bantu murni (tanpa React), jadi gampang diuji dan dipakai ulang
// di mini File Explorer (Tahap 5), diagram pohon (Tahap 6), dan misi (Tahap 7).
//
// Bentuk data: semua file/folder disimpan "rata" dalam satu objek { id: node }.
//   node = { id, name, parent, type: 'folder' | 'file', deleted?: true }
//   parent = id folder induknya (root punya parent null).
//   deleted = true berarti sedang berada di Recycle Bin (parent tetap mengingat lokasi asal).
import { MATERI_D } from '../data/materiDE.js'

export const ROOT_ID = 'root'

// Ubah daftar (array) menjadi objek { id: node }
export function toNodes(list) {
  const nodes = {}
  list.forEach((n) => { nodes[n.id] = { deleted: false, ...n } })
  return nodes
}

// Urutan tampil: folder dulu, lalu nama (huruf besar/kecil tidak dibedakan)
const byName = (a, b) =>
  a.type === b.type ? a.name.localeCompare(b.name, 'id', { numeric: true, sensitivity: 'base' }) : a.type === 'folder' ? -1 : 1

export const listIn = (nodes, parentId) =>
  Object.values(nodes).filter((n) => n.parent === parentId && !n.deleted).sort(byName)

export const trashList = (nodes) => Object.values(nodes).filter((n) => n.deleted).sort(byName)

// Path lengkap, contoh: D:\Informatika\Kelas_X
export function pathOf(nodes, id) {
  const parts = []
  let cur = nodes[id]
  while (cur) {
    parts.unshift(cur.name)
    cur = cur.parent ? nodes[cur.parent] : null
  }
  return parts.length === 1 ? `${parts[0]}\\` : parts.join('\\')
}

// Apakah `id` berada di dalam folder `ancestorId` (di kedalaman berapa pun)?
export function isInside(nodes, id, ancestorId) {
  let cur = nodes[id]
  while (cur && cur.parent) {
    if (cur.parent === ancestorId) return true
    cur = nodes[cur.parent]
  }
  return false
}

export function extOf(name) {
  const dot = name.lastIndexOf('.')
  return dot > 0 ? name.slice(dot) : ''
}

// Pecah nama jadi [bagian nama, ekstensi]; dipakai saat rename (yang diblok hanya bagian nama)
export function splitExt(name) {
  const e = extOf(name)
  return [e ? name.slice(0, name.length - e.length) : name, e]
}

// Aturan penamaan Windows (Materi Ajar D). Mengembalikan teks error, atau '' kalau nama aman.
export function validateName(name, siblings) {
  if (!name.trim()) return 'Nama tidak boleh kosong.'
  const bad = [...new Set([...name].filter((c) => MATERI_D.forbiddenChars.includes(c)))]
  if (bad.length) return `Nama tidak boleh memuat karakter: ${bad.join(' ')}`
  if (MATERI_D.reserved.includes(splitExt(name)[0].trim().toUpperCase())) return 'Nama itu dicadangkan oleh sistem.'
  if (/[ .]$/.test(name)) return 'Nama tidak boleh diakhiri spasi atau titik.'
  if (siblings.some((s) => s.name.toLowerCase() === name.toLowerCase())) return 'Sudah ada file atau folder dengan nama itu di sini.'
  return ''
}

// Nama yang belum dipakai di folder tujuan: "New folder", "New folder (2)", ...
export function uniqueName(nodes, parentId, name) {
  const taken = new Set(Object.values(nodes).filter((n) => n.parent === parentId && !n.deleted).map((n) => n.name.toLowerCase()))
  if (!taken.has(name.toLowerCase())) return name
  const [base, ext] = splitExt(name)
  let i = 2
  while (taken.has(`${base} (${i})${ext}`.toLowerCase())) i += 1
  return `${base} (${i})${ext}`
}

// Nama untuk salinan di folder yang sama: "foto.jpg" -> "foto - Copy.jpg"
export function copyName(nodes, parentId, name) {
  const [base, ext] = splitExt(name)
  return uniqueName(nodes, parentId, `${base} - Copy${ext}`)
}

// Hapus node beserta seluruh isinya selamanya
export function removeSubtree(nodes, id) {
  const next = { ...nodes }
  const kill = (x) => {
    Object.values(next).filter((n) => n.parent === x).forEach((c) => kill(c.id))
    delete next[x]
  }
  kill(id)
  return next
}

// Gandakan node (dan isinya) ke folder baru. counter = nomor id berikutnya.
export function cloneSubtree(nodes, id, parent, name, counter) {
  const added = {}
  let n = counter
  const walk = (srcId, parentId, nm) => {
    const src = nodes[srcId]
    const newId = `n${n}`
    n += 1
    added[newId] = { ...src, id: newId, parent: parentId, name: nm, deleted: false }
    Object.values(nodes).filter((c) => c.parent === srcId && !c.deleted).forEach((c) => walk(c.id, newId, c.name))
  }
  walk(id, parent, name)
  return { added, counter: n, rootId: `n${counter}` }
}
