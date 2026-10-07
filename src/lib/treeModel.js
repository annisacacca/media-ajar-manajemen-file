// src/lib/treeModel.js  (BARU)
// Fungsi bantu murni (tanpa React) untuk diagram pohon folder: rantai induk, hubungan antar node,
// kalimat penjelasan, dan deskripsi event dari mini File Explorer. Bergantung pada lib/fsModel.js.
import { ROOT_ID, listIn, pathOf, isInside } from './fsModel.js'

// Gabung path dan nama: "D:\" + "a" -> "D:\a", "D:\x" + "a" -> "D:\x\a"
export const joinPath = (base, name) => (base.endsWith('\\') ? `${base}${name}` : `${base}\\${name}`)

// Rantai id dari akar sampai node, contoh: ['root', 'info', 'kelas', 'tugas1']
export function chainOf(nodes, id) {
  const ids = []
  let cur = nodes[id]
  while (cur) {
    ids.unshift(cur.id)
    cur = cur.parent ? nodes[cur.parent] : null
  }
  return ids
}

export const depthOf = (nodes, id) => Math.max(0, chainOf(nodes, id).length - 1)

// Hubungan node `id` terhadap node yang sedang dipilih: self | parent | child | ancestor | other
export function relationOf(nodes, selectedId, id) {
  if (!selectedId || !nodes[selectedId]) return 'other'
  if (id === selectedId) return 'self'
  if (nodes[selectedId].parent === id) return 'parent'
  if (nodes[id]?.parent === selectedId) return 'child'
  if (isInside(nodes, selectedId, id)) return 'ancestor'
  return 'other'
}

// Hitung isi pohon yang TERLIHAT (dari akar, tanpa yang ada di Recycle Bin)
export function treeStats(nodes, rootId = ROOT_ID) {
  let files = 0
  let folders = 0
  let deepest = 0
  const walk = (id, depth) => {
    listIn(nodes, id).forEach((n) => {
      if (n.type === 'file') {
        files += 1
      } else {
        folders += 1
        deepest = Math.max(deepest, depth + 1)
        walk(n.id, depth + 1)
      }
    })
  }
  walk(rootId, 0)
  return { files, folders, deepest }
}

// "D:" -> "Drive D"; nama lain dibiarkan
const driveLabel = (name) => (/^[A-Za-z]:$/.test(name) ? `Drive ${name[0]}` : name)

// Kalimat penjelasan hubungan sebuah node. rootAs: 'drive' (akar = drive) | 'folder' (akar = folder biasa)
export function explainNode(nodes, id, { rootAs = 'drive' } = {}) {
  const n = nodes[id]
  if (!n) return { lines: [], path: '', depth: 0, kind: 'none' }
  const parent = n.parent ? nodes[n.parent] : null
  const kids = listIn(nodes, id)
  const folderKids = kids.filter((k) => k.type === 'folder')
  const fileKids = kids.filter((k) => k.type === 'file')
  const names = (arr) => arr.map((k) => k.name).join(', ')
  const label = (p) => (!p.parent && rootAs === 'drive' ? driveLabel(p.name) : p.name)
  const lines = []

  if (!parent) {
    lines.push(rootAs === 'drive'
      ? `${driveLabel(n.name)} adalah drive (root), titik awal seluruh struktur.`
      : `${n.name} adalah folder paling atas pada rancangan ini.`)
  } else if (n.type === 'file') {
    lines.push(`${n.name} adalah file yang tersimpan di dalam ${label(parent)}.`)
    lines.push('File adalah ujung cabang: tidak bisa memuat folder atau file lain.')
  } else {
    lines.push(`${n.name} adalah subfolder dari ${label(parent)}.`)
    lines.push(!parent.parent && rootAs === 'drive'
      ? `${label(parent)} adalah akar (root) dari struktur ini.`
      : `${label(parent)} adalah folder induk dari ${n.name}.`)
  }

  if (n.type === 'folder' || !parent) {
    const self = label(n)
    if (!kids.length) lines.push(`${self} masih kosong.`)
    if (folderKids.length) {
      lines.push(parent
        ? `${self} adalah folder induk dari subfolder ${names(folderKids)}.`
        : `${self} berisi folder ${names(folderKids)}.`)
    }
    if (fileKids.length) lines.push(`${self} ${parent ? 'menyimpan' : 'berisi'} file ${names(fileKids)}.`)
  }

  return { lines, path: pathOf(nodes, id), depth: depthOf(nodes, id), kind: !parent ? 'root' : n.type }
}

// Ubah event dari mini File Explorer menjadi catatan untuk diagram pohon.
// Mengembalikan { pick, title, lines, face } atau null kalau event tidak perlu ditampilkan.
// `nodes` = isi file system TERBARU (setelah operasi).
export function describeEvent(ev, nodes) {
  if (!ev) return null
  const d = ev.detail || {}

  switch (ev.type) {
    case 'create': {
      const n = nodes[d.id]
      if (!n) return null
      return {
        pick: d.id, face: 'semangat', title: 'Cabang baru tumbuh di pohon',
        lines: [`Folder baru berada di: ${pathOf(nodes, d.id)}`],
      }
    }
    case 'rename': {
      const n = nodes[d.id]
      if (!n) return null
      const now = pathOf(nodes, d.id)
      const before = now.slice(0, now.length - d.to.length) + d.from
      const lines = [`Sebelum: ${before}`, `Sesudah: ${now}`]
      if (n.type === 'folder' && listIn(nodes, d.id).length) lines.push('Path semua isinya ikut berubah, karena nama folder induknya berubah.')
      return { pick: d.id, face: 'bangga', title: 'Nama berubah, path ikut berubah', lines }
    }
    case 'move': {
      const n = nodes[d.id]
      if (!n) return null
      const before = joinPath(pathOf(nodes, d.from), d.name)
      const lines = [`Sebelum: ${before}`, `Sesudah: ${pathOf(nodes, d.id)}`]
      if (n.type === 'folder' && listIn(nodes, d.id).length) lines.push('Seluruh isinya ikut pindah bersama folder ini.')
      return { pick: d.id, face: 'semangat', title: 'Cabang pindah tempat', lines }
    }
    case 'copy': {
      if (!d.newId) return null // "copy" tanpa detail = baru disalin ke clipboard
      const n = nodes[d.newId]
      if (!n) return null
      return {
        pick: d.newId, face: 'senang', title: 'Salinan punya cabang sendiri',
        lines: [`Salinan: ${pathOf(nodes, d.newId)}`, `Asli tetap di: ${nodes[d.srcId] ? pathOf(nodes, d.srcId) : '-'}`],
      }
    }
    case 'delete':
      return {
        pick: null, face: 'mikir', title: 'Cabang hilang dari pohon',
        lines: [`${(d.names || []).join(', ')} tidak tampil lagi, karena ada di Recycle Bin. Lokasi aslinya masih diingat, jadi bisa dipulihkan.`],
      }
    case 'restore': {
      const back = Object.values(nodes).find((n) => !n.deleted && n.parent === d.to && (d.names || []).includes(n.name))
      return {
        pick: back ? back.id : null, face: 'senang', title: 'Cabang kembali ke pohon',
        lines: [`Dipulihkan ke ${pathOf(nodes, d.to)}`],
      }
    }
    default:
      return null
  }
}
