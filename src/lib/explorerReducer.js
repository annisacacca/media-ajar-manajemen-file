// src/lib/explorerReducer.js  (BARU)
// "Otak" mini File Explorer: satu reducer yang menangani semua operasi
// (buat, salin, pindah, ganti nama, hapus, pulihkan). Murni (tanpa React) supaya mudah diuji.
//
// Setiap operasi menghasilkan "event" { n, type, detail } agar misi (Tahap 7) bisa memeriksa hasilnya.
import {
  ROOT_ID, toNodes, listIn, pathOf, isInside, extOf, validateName, uniqueName, copyName, removeSubtree, cloneSubtree,
} from './fsModel.js'

export function init({ initialNodes, startFolder = ROOT_ID }) {
  return {
    nodes: toNodes(initialNodes),
    counter: 1000, // nomor untuk id file/folder baru
    cwd: startFolder, // folder yang sedang dibuka
    view: 'folder', // 'folder' | 'trash'
    selected: [],
    clipboard: null, // { mode: 'copy' | 'cut', ids: [] }
    renaming: null, // id yang sedang diganti namanya
    renameError: '',
    dialog: null, // kotak dialog yang sedang tampil
    menu: null, // menu klik kanan { x, y, target }
    pasteQueue: null, // antrean paste yang menunggu keputusan konflik nama
    msg: 'Klik kanan, pakai tombol toolbar, atau pintasan papan ketik.',
    face: 'senang',
    event: { n: 0, type: '', detail: {} },
  }
}

// Catat pesan + ekspresi Dika + event
const say = (s, type, msg, face, detail = {}) => ({ ...s, msg, face, event: { n: s.event.n + 1, type, detail } })

// ---------- Paste (salin / pindah) ----------
function applyPaste(s, id, mode, dest) {
  const src = s.nodes[id]
  if (mode === 'copy') {
    const name = src.parent === dest ? copyName(s.nodes, dest, src.name) : src.name
    const { added, counter, rootId } = cloneSubtree(s.nodes, id, dest, name, s.counter)
    return say({ ...s, nodes: { ...s.nodes, ...added }, counter }, 'copy', `"${name}" disalin ke ${pathOf(s.nodes, dest)}. File asal tetap ada.`, 'senang',
      { name, srcId: id, newId: rootId, from: src.parent, to: dest })
  }
  return say({ ...s, nodes: { ...s.nodes, [id]: { ...src, parent: dest } } }, 'move', `"${src.name}" dipindah ke ${pathOf(s.nodes, dest)}. Di lokasi asal sudah tidak ada.`, 'semangat',
    { name: src.name, id, from: src.parent, to: dest })
}

// Jalankan antrean paste satu per satu; berhenti kalau ada konflik nama (tanya pengguna dulu)
function runPaste(state) {
  let s = state
  const q = s.pasteQueue
  const items = [...q.items]
  while (items.length) {
    const id = items[0]
    const src = s.nodes[id]
    if (!src || src.deleted) { items.shift(); continue }
    const into = id === q.dest || isInside(s.nodes, q.dest, id)
    if (into) {
      s = say(s, 'error', `Folder "${src.name}" tidak bisa ${q.mode === 'cut' ? 'dipindah' : 'disalin'} ke dalam dirinya sendiri.`, 'bingung')
      items.shift(); continue
    }
    if (q.mode === 'cut' && src.parent === q.dest) { items.shift(); continue } // sudah di folder itu
    const clash = Object.values(s.nodes).find((n) => n.parent === q.dest && !n.deleted && n.id !== id && n.name.toLowerCase() === src.name.toLowerCase())
    if (clash) {
      return { ...s, pasteQueue: { ...q, items }, dialog: { type: 'conflict', itemId: id, clashId: clash.id, name: src.name } }
    }
    s = applyPaste(s, id, q.mode, q.dest)
    items.shift()
  }
  return { ...s, pasteQueue: null, dialog: null }
}

const startPaste = (s, items, mode, dest) => runPaste({ ...s, pasteQueue: { items, mode, dest } })

// ---------- Hapus ----------
function moveToTrash(s, ids) {
  const names = ids.map((i) => s.nodes[i]?.name).filter(Boolean)
  const nodes = { ...s.nodes }
  ids.forEach((i) => { if (nodes[i]) nodes[i] = { ...nodes[i], deleted: true } })
  return say({ ...s, nodes, selected: [], renaming: null }, 'delete',
    `${names.join(', ')} dipindah ke Recycle Bin. Masih bisa dipulihkan.`, 'mikir', { names, ids })
}

function purge(s, ids) {
  let nodes = s.nodes
  const names = ids.map((i) => nodes[i]?.name).filter(Boolean)
  ids.forEach((i) => { if (nodes[i]) nodes = removeSubtree(nodes, i) })
  return say({ ...s, nodes, selected: [], dialog: null }, 'purge', `${names.join(', ')} dihapus permanen. Tidak bisa dikembalikan dengan cara biasa.`, 'sedih', { names })
}

// ---------- Ganti nama ----------
function applyRename(s, id, name) {
  const old = s.nodes[id].name
  return say({ ...s, nodes: { ...s.nodes, [id]: { ...s.nodes[id], name } }, renaming: null, renameError: '', dialog: null },
    'rename', `Nama berubah: "${old}" menjadi "${name}".`, 'bangga', { id, from: old, to: name })
}

export function reducer(state, action) {
  // Menu klik kanan menutup sendiri pada aksi apa pun, kecuali saat dibuka
  const s = action.type === 'MENU_OPEN' ? state : { ...state, menu: null }
  switch (action.type) {
    case 'RESET':
      return init(action)

    case 'OPEN':
      return { ...s, cwd: action.id, view: 'folder', selected: [], renaming: null, renameError: '' }
    case 'UP': {
      const parent = s.nodes[s.cwd]?.parent
      return parent ? { ...s, cwd: parent, selected: [], renaming: null } : s
    }
    case 'SHOW_TRASH':
      return { ...s, view: 'trash', selected: [], renaming: null, renameError: '' }

    case 'SELECT': {
      if (s.renaming && s.renaming !== action.id) return { ...s, renaming: null, selected: [action.id] }
      if (action.additive) {
        const on = s.selected.includes(action.id)
        return { ...s, selected: on ? s.selected.filter((x) => x !== action.id) : [...s.selected, action.id] }
      }
      return { ...s, selected: [action.id] }
    }
    case 'CLEAR_SELECT':
      return { ...s, selected: [], renaming: null, renameError: '' }

    case 'NEW_FOLDER': {
      if (s.view !== 'folder') return s
      const id = `n${s.counter}`
      const name = uniqueName(s.nodes, s.cwd, 'New folder')
      const nodes = { ...s.nodes, [id]: { id, name, parent: s.cwd, type: 'folder', deleted: false } }
      return say({ ...s, nodes, counter: s.counter + 1, selected: [id], renaming: id, renameError: '' },
        'create', 'Folder baru dibuat. Ketik nama yang diinginkan, lalu tekan Enter.', 'semangat', { id, name, parent: s.cwd })
    }

    case 'COPY':
    case 'CUT': {
      if (!s.selected.length || s.view !== 'folder') return s
      const mode = action.type === 'COPY' ? 'copy' : 'cut'
      return say({ ...s, clipboard: { mode, ids: s.selected } }, mode, mode === 'copy'
        ? 'Disalin ke clipboard. Buka folder tujuan, lalu Paste.' : 'Dipotong ke clipboard. Buka folder tujuan, lalu Paste.', 'mikir')
    }
    case 'PASTE': {
      if (!s.clipboard || s.view !== 'folder') return s
      const { mode, ids } = s.clipboard
      return startPaste({ ...s, clipboard: mode === 'cut' ? null : s.clipboard }, ids, mode, s.cwd)
    }
    case 'MOVE_TO': // seret dan lepas (drag and drop) di dalam satu drive = memindahkan
      return startPaste(s, action.ids, 'cut', action.dest)
    case 'RESOLVE_CONFLICT': {
      const { itemId, clashId } = s.dialog
      const q = s.pasteQueue
      let next = { ...s, dialog: null }
      const items = q.items.slice(1)
      if (action.choice === 'replace') {
        next = { ...next, nodes: removeSubtree(next.nodes, clashId) }
        next = applyPaste(next, itemId, q.mode, q.dest)
      } else {
        next = say(next, 'skip', `"${s.dialog.name}" dilewati. Tidak ada yang berubah.`, 'mikir')
      }
      return runPaste({ ...next, pasteQueue: { ...q, items } })
    }

    case 'RENAME_START':
      return s.selected.length === 1 && s.view === 'folder' ? { ...s, renaming: s.selected[0], renameError: '' } : s
    case 'RENAME_CANCEL':
      return { ...s, renaming: null, renameError: '', dialog: null }
    case 'RENAME_COMMIT': {
      const node = s.nodes[action.id]
      if (action.name === node.name) return { ...s, renaming: null, renameError: '' }
      const siblings = Object.values(s.nodes).filter((n) => n.parent === node.parent && !n.deleted && n.id !== node.id)
      const err = validateName(action.name, siblings)
      if (err) return say({ ...s, renameError: err }, 'error', err, 'kaget')
      // Mengubah ekstensi file memicu peringatan (di Windows: pilih No lalu ulangi dengan benar)
      if (node.type === 'file' && extOf(action.name).toLowerCase() !== extOf(node.name).toLowerCase()) {
        return { ...s, dialog: { type: 'ext', id: node.id, name: action.name, oldExt: extOf(node.name), newExt: extOf(action.name) } }
      }
      return applyRename(s, node.id, action.name)
    }
    case 'EXT_YES':
      return applyRename(s, s.dialog.id, s.dialog.name)
    case 'EXT_NO':
      return say({ ...s, dialog: null, renameError: 'Ekstensi tidak diubah. Ketik nama baru dengan ekstensi yang sama.' }, 'error',
        'Perubahan ekstensi dibatalkan. Ulangi dengan ekstensi yang benar.', 'mikir')

    case 'DELETE': {
      if (!s.selected.length || s.view !== 'folder') return s
      return action.permanent ? { ...s, dialog: { type: 'permanent', ids: s.selected } } : moveToTrash(s, s.selected)
    }
    case 'TRASH_DROP':
      return moveToTrash(s, action.ids)
    case 'PURGE_SELECTED': // Delete di dalam Recycle Bin
      return s.selected.length && s.view === 'trash' ? { ...s, dialog: { type: 'permanent', ids: s.selected } } : s
    case 'PURGE_CONFIRM':
      return purge(s, s.dialog.ids)
    case 'EMPTY_TRASH':
      return { ...s, dialog: { type: 'empty' } }
    case 'EMPTY_CONFIRM': {
      const ids = Object.values(s.nodes).filter((n) => n.deleted).map((n) => n.id)
      return purge(s, ids)
    }
    case 'RESTORE': {
      if (!s.selected.length || s.view !== 'trash') return s
      let nodes = s.nodes
      const names = []
      let to = ROOT_ID
      s.selected.forEach((id) => {
        const n = nodes[id]
        if (!n) return
        const dest = nodes[n.parent] && !nodes[n.parent].deleted ? n.parent : ROOT_ID
        const name = uniqueName(nodes, dest, n.name)
        nodes = { ...nodes, [id]: { ...n, parent: dest, name, deleted: false } }
        names.push(name); to = dest
      })
      return say({ ...s, nodes, selected: [] }, 'restore', `${names.join(', ')} dipulihkan ke ${pathOf(nodes, to)}.`, 'senang', { names, to })
    }

    case 'MENU_OPEN': {
      const selected = action.target && !s.selected.includes(action.target) ? [action.target] : s.selected
      return { ...s, selected: action.target ? selected : [], menu: { x: action.x, y: action.y, target: action.target } }
    }
    case 'MENU_CLOSE':
      return { ...s, menu: null }
    case 'DIALOG_CLOSE':
      return { ...s, dialog: null, pasteQueue: null }
    default:
      return s
  }
}

export { listIn }
